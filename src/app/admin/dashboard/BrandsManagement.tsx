"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Brand {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  productCount: number;
  createdAt?: { seconds: number };
  updatedAt?: { seconds: number };
}

interface BrandsManagementProps {
  onBack: () => void;
}

export default function BrandsManagement({ onBack }: BrandsManagementProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/brands");
      const data = await response.json();
      if (data.success) {
        setBrands(data.brands);
      }
    } catch (error) {
      console.error("Error cargando marcas:", error);
    } finally {
      setLoading(false);
    }
  };

  const runMigration = async () => {
    if (
      !confirm(
        "¿Ejecutar migración de marcas? Esto creará/actualizará la colección brands en Firestore."
      )
    )
      return;

    setMigrating(true);
    try {
      const response = await fetch("/api/migrate-brands");
      const data = await response.json();
      if (data.success) {
        alert(`✅ ${data.message}`);
        loadBrands();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error en migración:", error);
      alert("❌ Error durante la migración");
    } finally {
      setMigrating(false);
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-600">Cargando marcas...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition-colors"
          >
            ← Volver
          </button>
          <h2 className="text-2xl font-bold text-slate-900">
            Gestión de Marcas
          </h2>
        </div>
        <button
          onClick={runMigration}
          disabled={migrating}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          {migrating ? "Migrando..." : "🔄 Ejecutar Migración"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-slate-600 text-sm mb-1">Total Marcas</p>
          <p className="text-3xl font-bold text-slate-700">{brands.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-slate-600 text-sm mb-1">Con Logo</p>
          <p className="text-3xl font-bold text-green-600">
            {brands.filter((b) => b.logoUrl).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-slate-600 text-sm mb-1">Sin Logo</p>
          <p className="text-3xl font-bold text-red-500">
            {brands.filter((b) => !b.logoUrl).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar marca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Brands Grid */}
      {brands.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <p className="text-amber-800 mb-4">
            No hay marcas en la base de datos. Ejecuta la migración para
            importar las marcas desde brandLogos.ts
          </p>
          <button
            onClick={runMigration}
            disabled={migrating}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-colors"
          >
            {migrating ? "Migrando..." : "Ejecutar Migración Ahora"}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Logo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Marca
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase">
                    Productos
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="w-24 h-12 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {brand.logoUrl ? (
                          <Image
                            src={brand.logoUrl}
                            alt={brand.name}
                            width={96}
                            height={48}
                            className="object-contain max-h-10"
                          />
                        ) : (
                          <span className="text-slate-400 text-xs">
                            Sin logo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {brand.name}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold">
                        {brand.productCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {brand.logoUrl ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          ✓ Logo
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                          Sin Logo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setEditingBrand(brand)}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-semibold"
                      >
                        Editar Logo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingBrand && (
        <EditBrandLogoModal
          brand={editingBrand}
          onClose={() => setEditingBrand(null)}
          onSave={(updatedBrand) => {
            setBrands((prev) =>
              prev.map((b) => (b.id === updatedBrand.id ? updatedBrand : b))
            );
            setEditingBrand(null);
          }}
        />
      )}
    </div>
  );
}

// Modal para editar logo de marca
function EditBrandLogoModal({
  brand,
  onClose,
  onSave,
}: {
  brand: Brand;
  onClose: () => void;
  onSave: (brand: Brand) => void;
}) {
  const [logoUrl, setLogoUrl] = useState(brand.logoUrl || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fileName = `logos/${brand.id}_${Date.now()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setLogoUrl(downloadURL);
      alert("✅ Imagen subida exitosamente");
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("❌ Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandId: brand.id,
          logoUrl: logoUrl,
        }),
      });

      const data = await response.json();
      if (data.success) {
        onSave({ ...brand, logoUrl });
        alert("✅ Logo actualizado exitosamente");
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error guardando:", error);
      alert("❌ Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Editar Logo: {brand.name}
        </h2>

        {/* Preview */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-2">
            Preview del Logo
          </p>
          <div className="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={brand.name}
                width={200}
                height={100}
                className="object-contain max-h-24"
              />
            ) : (
              <span className="text-slate-400">Sin logo</span>
            )}
          </div>
        </div>

        {/* Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Subir imagen
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
            disabled={uploading}
            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg"
          />
          {uploading && (
            <p className="text-sm text-blue-600 mt-1">Subiendo...</p>
          )}
        </div>

        {/* URL Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            O pegar URL pública
          </label>
          <input
            type="url"
            placeholder="https://ejemplo.com/logo.png"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
