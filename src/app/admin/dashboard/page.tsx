"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { db, storage } from "@/lib/firebase";
import { getBrandLogo } from "@/data/brandLogos";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  QueryDocumentSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  Timestamp,
  getCountFromServer,
  where,
  setDoc,
  increment,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import BrandsManagement from "./BrandsManagement";
import BrandAutocomplete from "./BrandAutocomplete";

interface FirebaseProduct {
  id: string;
  atributos?: string[];
  createdAt?: { seconds: number; nanoseconds: number } | null;
  marca?: string;
  medidas?: string[];
  modelo?: string;
  original?: string;
  tipo?: string;
  updatedAt?: { seconds: number; nanoseconds: number } | null;
  images?: Array<{ url: string }>;
}

export default function AdminDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<FirebaseProduct | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [searchCache, setSearchCache] = useState<FirebaseProduct[]>([]);
  const [searchCacheIndex, setSearchCacheIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // 'desc' = más reciente primero
  const [activeTab, setActiveTab] = useState<"products" | "brands">("products");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadProducts();
      loadTotalCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadTotalCount = async () => {
    try {
      const productsRef = collection(db, "products");
      const snapshot = await getCountFromServer(productsRef);
      setTotalProducts(snapshot.data().count);
      console.log("📊 Total productos en BD:", snapshot.data().count);
    } catch (error) {
      console.error("Error obteniendo total de productos:", error);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    setSearchCache([]);
    setSearchCacheIndex(0);

    try {
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        orderBy("createdAt", sortOrder),
        limit(100) // Cargar 100 inicialmente
      );

      const snapshot = await getDocs(q);
      const productsData = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as FirebaseProduct)
      );

      setProducts(productsData);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === 100);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!lastDoc || !hasMore) return;

    try {
      const productsRef = collection(db, "products");

      // Si hay búsqueda activa con cache
      if (searchTerm && searchCache.length > 0) {
        // ¿Tenemos más en el cache?
        if (searchCacheIndex < searchCache.length) {
          const nextBatch = searchCache.slice(
            searchCacheIndex,
            searchCacheIndex + 100
          );
          setProducts((prev) => [...prev, ...nextBatch]);
          setSearchCacheIndex((prev) => prev + 100);

          // Si llegamos al final del cache, cargar más de Firebase
          if (searchCacheIndex + 100 >= searchCache.length) {
            const q = query(
              productsRef,
              orderBy("createdAt", sortOrder),
              startAfter(lastDoc),
              limit(1000)
            );

            const snapshot = await getDocs(q);
            if (snapshot.docs.length > 0) {
              const allProducts = snapshot.docs.map(
                (doc) =>
                  ({
                    id: doc.id,
                    ...doc.data(),
                  } as FirebaseProduct)
              );

              // Filtrar por búsqueda
              const filtered = allProducts.filter(
                (product) =>
                  product.original
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  product.marca
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  product.tipo
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  product.modelo
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
              );

              setSearchCache((prev) => [...prev, ...filtered]);
              setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
              setHasMore(snapshot.docs.length === 1000 || filtered.length > 0);
            } else {
              setHasMore(false);
            }
          }
        } else {
          setHasMore(false);
        }
      } else {
        // Sin búsqueda, cargar normal
        const q = query(
          productsRef,
          orderBy("createdAt", sortOrder),
          startAfter(lastDoc),
          limit(100)
        );

        const snapshot = await getDocs(q);
        const newProducts = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as FirebaseProduct)
        );

        setProducts((prev) => [...prev, ...newProducts]);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
        setHasMore(snapshot.docs.length === 100);
      }
    } catch (error) {
      console.error("Error cargando más productos:", error);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      alert("✅ Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("❌ Error al eliminar producto");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadProducts();
      return;
    }

    setLoading(true);

    try {
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        orderBy("createdAt", sortOrder),
        limit(1000) // Cargar 1000 de golpe
      );

      const snapshot = await getDocs(q);
      const allProducts = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as FirebaseProduct)
      );

      // Filtrar en el cliente
      const filtered = allProducts.filter(
        (product) =>
          product.original?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tipo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.modelo?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Guardar en cache
      setSearchCache(filtered);
      setSearchCacheIndex(100); // Ya mostramos los primeros 100

      // Tomar solo los primeros 100
      const firstBatch = filtered.slice(0, 100);
      setProducts(firstBatch);

      // Guardar lastDoc para cargar más si es necesario
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(filtered.length > 100 || snapshot.docs.length === 1000);
    } catch (error) {
      console.error("Error buscando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Panel de Administración
            </h1>
            <p className="text-sm text-slate-600">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Switcher */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "products"
                ? "bg-slate-800 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200"
            }`}
          >
            📦 Productos
          </button>
          <button
            onClick={() => setActiveTab("brands")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "brands"
                ? "bg-slate-800 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200"
            }`}
          >
            🏷️ Marcas
          </button>
        </div>

        {activeTab === "brands" ? (
          <BrandsManagement onBack={() => setActiveTab("products")} />
        ) : (
          <>
            {/* Actions Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 flex gap-2 w-full">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Buscar
                </button>
                <button
                  onClick={() => {
                    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
                    loadProducts();
                  }}
                  className="px-4 py-3 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  title={
                    sortOrder === "desc"
                      ? "Más recientes primero"
                      : "Más antiguos primero"
                  }
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {sortOrder === "desc" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    )}
                  </svg>
                  {sortOrder === "desc" ? "Recientes" : "Antiguos"}
                </button>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                + Agregar Producto
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-slate-600 text-sm mb-1">
                  Total en Base de Datos
                </p>
                <p className="text-3xl font-bold text-slate-700">
                  {totalProducts}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-slate-600 text-sm mb-1">
                  Productos Cargados
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {products.length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-slate-600 text-sm mb-1">Usuario</p>
                <p className="text-lg font-semibold text-slate-900 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                        Producto
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                        Marca
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                        Tipo
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                        Modelo
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase">
                        Imágenes
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase">
                        Logo
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                        Fecha
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredProducts.map((product) => {
                      const imageCount = product.images?.length || 0;
                      const hasLogo = getBrandLogo(product.marca || "") !== "";
                      const createdDate = product.createdAt
                        ? new Date(
                            product.createdAt.seconds * 1000
                          ).toLocaleDateString("es-MX", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "-";

                      return (
                        <tr
                          key={product.id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="font-semibold text-slate-900">
                              {product.original || "Sin nombre"}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-slate-700">
                            {product.marca || "-"}
                          </td>
                          <td className="px-6 py-4 text-slate-700">
                            {product.tipo || "-"}
                          </td>
                          <td className="px-6 py-4 text-slate-700">
                            {product.modelo || "-"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              {imageCount > 0 ? (
                                <>
                                  <svg
                                    className="w-5 h-5 text-green-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="text-sm font-semibold text-green-700">
                                    {imageCount}
                                  </span>
                                </>
                              ) : (
                                <svg
                                  className="w-5 h-5 text-red-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              {hasLogo ? (
                                <svg
                                  className="w-5 h-5 text-slate-700"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-5 h-5 text-amber-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600 text-sm">
                            {createdDate}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded mr-2 transition-colors"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {hasMore && (
                <div className="p-6 text-center border-t border-slate-200">
                  <button
                    onClick={loadMore}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
                  >
                    Cargar Más
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(updatedProduct) => {
            setProducts((prev) =>
              prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
            );
            setEditingProduct(null);
          }}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={(newProduct) => {
            setProducts((prev) => [newProduct, ...prev]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}

// Modal para Editar Producto
function EditProductModal({
  product,
  onClose,
  onSave,
}: {
  product: FirebaseProduct;
  onClose: () => void;
  onSave: (product: FirebaseProduct) => void;
}) {
  const [formData, setFormData] = useState({
    original: product.original || "",
    marca: product.marca || "",
    tipo: product.tipo || "",
    modelo: product.modelo || "",
    atributos: product.atributos?.join(", ") || "",
    medidas: product.medidas?.join(", ") || "",
  });
  const [saving, setSaving] = useState(false);
  const [productImages, setProductImages] = useState<string[]>(
    product.images?.map((img) => img.url) || []
  );
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [brandLogoUrl, setBrandLogoUrl] = useState(
    getBrandLogo(product.marca || "")
  );
  const [newBrandLogoUrl, setNewBrandLogoUrl] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<FirebaseProduct[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  useEffect(() => {
    loadSimilarProducts();

    // Bloquear scroll del body cuando el modal está abierto
    document.body.style.overflow = "hidden";

    return () => {
      // Restaurar scroll al cerrar el modal
      document.body.style.overflow = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSimilarProducts = async () => {
    // Solo cargar si hay marca Y tipo
    if (!product.marca || !product.tipo) {
      console.log("❌ No hay marca o tipo para buscar productos similares");
      setLoadingSimilar(false);
      return;
    }

    setLoadingSimilar(true);
    console.log(
      `🔍 Buscando productos similares: marca="${product.marca}", tipo="${product.tipo}"`
    );

    try {
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        where("marca", "==", product.marca),
        where("tipo", "==", product.tipo),
        limit(20)
      );
      const snapshot = await getDocs(q);
      console.log(
        `📦 Encontrados ${snapshot.docs.length} productos con misma marca y tipo`
      );

      const similar = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as FirebaseProduct))
        .filter((p) => p.id !== product.id && p.images && p.images.length > 0);

      console.log(`✅ ${similar.length} productos tienen imágenes para copiar`);
      setSimilarProducts(similar);
    } catch (error) {
      console.error("Error cargando productos similares:", error);
    } finally {
      setLoadingSimilar(false);
    }
  };

  const handleImageUpload = async (file: File, isLogo: boolean = false) => {
    if (isLogo) {
      setUploadingLogo(true);
    } else {
      setUploadingImage(true);
    }

    try {
      const folder = isLogo ? "logos" : "productos";
      const fileName = `${folder}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      if (isLogo) {
        setBrandLogoUrl(downloadURL);
        setNewBrandLogoUrl(downloadURL);
      } else {
        setProductImages([...productImages, downloadURL]);
      }

      alert("✅ Imagen subida exitosamente");
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("❌ Error al subir imagen");
    } finally {
      if (isLogo) {
        setUploadingLogo(false);
      } else {
        setUploadingImage(false);
      }
    }
  };

  const addImageUrl = (isLogo: boolean = false) => {
    if (isLogo) {
      if (newBrandLogoUrl.trim()) {
        setBrandLogoUrl(newBrandLogoUrl.trim());
        setNewBrandLogoUrl("");
      }
    } else {
      if (newImageUrl.trim()) {
        setProductImages([...productImages, newImageUrl.trim()]);
        setNewImageUrl("");
      }
    }
  };

  const removeImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  const copyImageFromProduct = (imageUrl: string) => {
    if (!productImages.includes(imageUrl)) {
      setProductImages([...productImages, imageUrl]);
      alert("✅ Imagen copiada");
    } else {
      alert("ℹ️ Esta imagen ya está agregada");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const productRef = doc(db, "products", product.id);
      const updateData = {
        original: formData.original,
        marca: formData.marca,
        tipo: formData.tipo,
        modelo: formData.modelo,
        atributos: formData.atributos
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        medidas: formData.medidas
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        images: productImages.map((url) => ({ url })),
        updatedAt: Timestamp.now(),
      };

      await updateDoc(productRef, updateData);
      onSave({
        ...product,
        ...updateData,
        images: productImages.map((url) => ({ url })),
      });
      alert("✅ Producto actualizado exitosamente");
    } catch (error) {
      console.error("Error actualizando producto:", error);
      alert("❌ Error al actualizar producto");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Editar Producto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={formData.original}
              onChange={(e) =>
                setFormData({ ...formData, original: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Marca
            </label>
            <BrandAutocomplete
              value={formData.marca}
              onChange={(value) => setFormData({ ...formData, marca: value })}
              onBrandSelect={(brand) => {
                if (brand) {
                  setBrandLogoUrl(brand.logoUrl || "");
                }
              }}
              placeholder="Buscar o crear marca..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Tipo
            </label>
            <input
              type="text"
              value={formData.tipo}
              onChange={(e) =>
                setFormData({ ...formData, tipo: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Modelo
            </label>
            <input
              type="text"
              value={formData.modelo}
              onChange={(e) =>
                setFormData({ ...formData, modelo: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Atributos (separados por coma)
            </label>
            <textarea
              value={formData.atributos}
              onChange={(e) =>
                setFormData({ ...formData, atributos: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Medidas (separadas por coma)
            </label>
            <textarea
              value={formData.medidas}
              onChange={(e) =>
                setFormData({ ...formData, medidas: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          {/* Gestión de Imágenes del Producto */}
          <div className="border-t-2 border-slate-200 pt-3 mt-4">
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Imágenes del Producto
            </h3>

            {/* Imágenes actuales */}
            {productImages.length > 0 && (
              <div className="mb-3">
                <p className="text-sm text-slate-600 mb-2">
                  Imágenes actuales ({productImages.length})
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <Image
                        src={url}
                        alt={`Producto ${idx + 1}`}
                        width={150}
                        height={150}
                        className="rounded-lg object-cover w-full h-24"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subir imagen */}
            <div className="mb-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Subir imagen
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, false);
                }}
                disabled={uploadingImage}
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {uploadingImage && (
                <p className="text-sm text-slate-700 mt-1">Subiendo...</p>
              )}
            </div>

            {/* Agregar por URL */}
            <div className="mb-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                O pegar URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => addImageUrl(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors"
                >
                  Agregar
                </button>
              </div>
            </div>

            {/* Productos similares */}
            <div className="border-t-2 border-slate-200 pt-3 mt-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-700">
                  💡 Copiar imágenes de productos similares
                </p>
                {loadingSimilar && (
                  <span className="text-xs text-slate-700">Buscando...</span>
                )}
              </div>

              {!product.marca || !product.tipo ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-800">
                    ℹ️ Necesitas especificar <strong>Marca</strong> y{" "}
                    <strong>Tipo</strong> para ver recomendaciones
                  </p>
                </div>
              ) : similarProducts.length > 0 ? (
                <>
                  <p className="text-xs text-slate-600 mb-2">
                    Encontrados {similarProducts.length} productos con{" "}
                    <strong>{product.marca}</strong> /{" "}
                    <strong>{product.tipo}</strong>
                  </p>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-2 bg-slate-50">
                    {similarProducts.map((similar) =>
                      similar.images?.map((img, idx) => (
                        <button
                          key={`${similar.id}-${idx}`}
                          type="button"
                          onClick={() => copyImageFromProduct(img.url)}
                          className="relative group border-2 border-slate-300 hover:border-blue-500 hover:shadow-lg rounded-lg overflow-hidden transition-all"
                          title={`${similar.original} (${
                            similar.images?.length || 0
                          } imágenes)`}
                        >
                          <Image
                            src={img.url}
                            alt={similar.original || "Producto"}
                            width={150}
                            height={100}
                            className="w-full h-20 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end pb-2">
                            <svg
                              className="w-6 h-6 text-white mb-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-white text-xs text-center px-1 line-clamp-2 font-medium">
                              {similar.original}
                            </p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </>
              ) : (
                !loadingSimilar && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <p className="text-sm text-slate-600">
                      No se encontraron productos con{" "}
                      <strong>{product.marca}</strong> /{" "}
                      <strong>{product.tipo}</strong> que tengan imágenes
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Gestión de Logo de Marca */}
          <div className="border-t-2 border-slate-200 pt-3 mt-4">
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Logo de la Marca
            </h3>

            {/* Logo actual */}
            {brandLogoUrl && (
              <div className="mb-3">
                <p className="text-sm text-slate-600 mb-2">Logo actual</p>
                <div className="relative inline-block">
                  <Image
                    src={brandLogoUrl}
                    alt={formData.marca}
                    width={200}
                    height={80}
                    className="rounded-lg object-contain bg-slate-50 p-2 max-h-16"
                  />
                </div>
              </div>
            )}

            {/* Subir logo */}
            <div className="mb-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Subir logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, true);
                }}
                disabled={uploadingLogo}
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {uploadingLogo && (
                <p className="text-sm text-slate-700 mt-1">Subiendo logo...</p>
              )}
            </div>

            {/* Agregar logo por URL */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                O pegar URL del logo
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://ejemplo.com/logo.png"
                  value={newBrandLogoUrl}
                  onChange={(e) => setNewBrandLogoUrl(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => addImageUrl(true)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors"
                >
                  Agregar
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                💡 Nota: Actualiza también /src/data/brandLogos.ts con esta URL
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-3 border-t border-slate-200">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal para Agregar Producto
function AddProductModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (product: FirebaseProduct) => void;
}) {
  const [formData, setFormData] = useState({
    original: "",
    marca: "",
    tipo: "",
    modelo: "",
    atributos: "",
    medidas: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const brandName = formData.marca.trim().toUpperCase();

      // Actualizar o crear marca en colección 'brands'
      if (brandName && brandName !== "GENÉRICA" && brandName !== "SIN MARCA") {
        const brandRef = doc(db, "brands", brandName);
        const brandDoc = await getDoc(brandRef);

        if (brandDoc.exists()) {
          // Incrementar contador de marca existente
          await updateDoc(brandRef, {
            productCount: increment(1),
            updatedAt: Timestamp.now(),
          });
        } else {
          // Crear nueva marca
          await setDoc(brandRef, {
            id: brandName,
            name: brandName,
            logoUrl: "",
            website: "",
            productCount: 1,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          });
          // Invalidar cache para que se recarguen las marcas
          localStorage.removeItem("herramaq_brands");
          localStorage.removeItem("herramaq_brands_timestamp");
        }
      }

      const newProduct = {
        original: formData.original,
        marca: brandName || formData.marca,
        tipo: formData.tipo,
        modelo: formData.modelo,
        atributos: formData.atributos
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        medidas: formData.medidas
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, "products"), newProduct);
      onAdd({ id: docRef.id, ...newProduct });
      alert("✅ Producto agregado exitosamente");
    } catch (error) {
      console.error("Error agregando producto:", error);
      alert("❌ Error al agregar producto");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Agregar Producto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={formData.original}
              onChange={(e) =>
                setFormData({ ...formData, original: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Marca
            </label>
            <BrandAutocomplete
              value={formData.marca}
              onChange={(value) => setFormData({ ...formData, marca: value })}
              placeholder="Buscar o crear marca..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tipo
            </label>
            <input
              type="text"
              value={formData.tipo}
              onChange={(e) =>
                setFormData({ ...formData, tipo: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Modelo
            </label>
            <input
              type="text"
              value={formData.modelo}
              onChange={(e) =>
                setFormData({ ...formData, modelo: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Atributos (separados por coma)
            </label>
            <textarea
              value={formData.atributos}
              onChange={(e) =>
                setFormData({ ...formData, atributos: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Ej: Resistente, Portátil, Ligero"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Medidas (separadas por coma)
            </label>
            <textarea
              value={formData.medidas}
              onChange={(e) =>
                setFormData({ ...formData, medidas: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Ej: 10cm, 20cm, 5kg"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Agregar Producto"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
