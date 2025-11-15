'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
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
    getCountFromServer
} from 'firebase/firestore';

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
}

export default function AdminDashboard() {
    const { user, loading: authLoading, logout } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState<FirebaseProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState<FirebaseProduct | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [searchCache, setSearchCache] = useState<FirebaseProduct[]>([]);
    const [searchCacheIndex, setSearchCacheIndex] = useState(0);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/admin/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            loadProducts();
            loadTotalCount();
        }
    }, [user]);

    const loadTotalCount = async () => {
        try {
            const productsRef = collection(db, 'products');
            const snapshot = await getCountFromServer(productsRef);
            setTotalProducts(snapshot.data().count);
            console.log('📊 Total productos en BD:', snapshot.data().count);
        } catch (error) {
            console.error('Error obteniendo total de productos:', error);
        }
    };

    const loadProducts = async () => {
        setLoading(true);
        setSearchCache([]);
        setSearchCacheIndex(0);
        
        try {
            const productsRef = collection(db, 'products');
            const q = query(
                productsRef,
                orderBy('createdAt', 'desc'),
                limit(100) // Cargar 100 inicialmente
            );

            const snapshot = await getDocs(q);
            const productsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as FirebaseProduct));
            
            setProducts(productsData);
            setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
            setHasMore(snapshot.docs.length === 100);
        } catch (error) {
            console.error('Error cargando productos:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        if (!lastDoc || !hasMore) return;

        try {
            const productsRef = collection(db, 'products');
            
            // Si hay búsqueda activa con cache
            if (searchTerm && searchCache.length > 0) {
                // ¿Tenemos más en el cache?
                if (searchCacheIndex < searchCache.length) {
                    const nextBatch = searchCache.slice(searchCacheIndex, searchCacheIndex + 100);
                    setProducts(prev => [...prev, ...nextBatch]);
                    setSearchCacheIndex(prev => prev + 100);
                    
                    // Si llegamos al final del cache, cargar más de Firebase
                    if (searchCacheIndex + 100 >= searchCache.length) {
                        const q = query(
                            productsRef,
                            orderBy('createdAt', 'desc'),
                            startAfter(lastDoc),
                            limit(1000)
                        );

                        const snapshot = await getDocs(q);
                        if (snapshot.docs.length > 0) {
                            const allProducts = snapshot.docs.map(doc => ({
                                id: doc.id,
                                ...doc.data()
                            } as FirebaseProduct));
                            
                            // Filtrar por búsqueda
                            const filtered = allProducts.filter(product => 
                                product.original?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.tipo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.modelo?.toLowerCase().includes(searchTerm.toLowerCase())
                            );

                            setSearchCache(prev => [...prev, ...filtered]);
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
                    orderBy('createdAt', 'desc'),
                    startAfter(lastDoc),
                    limit(100)
                );

                const snapshot = await getDocs(q);
                const newProducts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as FirebaseProduct));
                
                setProducts(prev => [...prev, ...newProducts]);
                setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
                setHasMore(snapshot.docs.length === 100);
            }
        } catch (error) {
            console.error('Error cargando más productos:', error);
        }
    };

    const handleDelete = async (productId: string) => {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;

        try {
            await deleteDoc(doc(db, 'products', productId));
            setProducts(prev => prev.filter(p => p.id !== productId));
            alert('✅ Producto eliminado exitosamente');
        } catch (error) {
            console.error('Error eliminando producto:', error);
            alert('❌ Error al eliminar producto');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/admin/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            loadProducts();
            return;
        }

        setLoading(true);
        
        try {
            const productsRef = collection(db, 'products');
            const q = query(
                productsRef,
                orderBy('createdAt', 'desc'),
                limit(1000) // Cargar 1000 de golpe
            );
            
            const snapshot = await getDocs(q);
            const allProducts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as FirebaseProduct));
            
            // Filtrar en el cliente
            const filtered = allProducts.filter(product => 
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
            console.error('Error buscando productos:', error);
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
                        <h1 className="text-2xl font-bold text-slate-900">Panel de Administración</h1>
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
                {/* Actions Bar */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 flex gap-2 w-full">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
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
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
                    >
                        + Agregar Producto
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-slate-600 text-sm mb-1">Total en Base de Datos</p>
                        <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-slate-600 text-sm mb-1">Productos Cargados</p>
                        <p className="text-3xl font-bold text-slate-900">{products.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-slate-600 text-sm mb-1">Usuario</p>
                        <p className="text-lg font-semibold text-slate-900 truncate">{user.email}</p>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Producto</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Marca</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Tipo</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Modelo</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-slate-900">{product.original || 'Sin nombre'}</p>
                                        </td>
                                        <td className="px-6 py-4 text-slate-700">{product.marca || '-'}</td>
                                        <td className="px-6 py-4 text-slate-700">{product.tipo || '-'}</td>
                                        <td className="px-6 py-4 text-slate-700">{product.modelo || '-'}</td>
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
                                ))}
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
            </div>

            {/* Edit Modal */}
            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={(updatedProduct) => {
                        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
                        setEditingProduct(null);
                    }}
                />
            )}

            {/* Add Modal */}
            {showAddModal && (
                <AddProductModal
                    onClose={() => setShowAddModal(false)}
                    onAdd={(newProduct) => {
                        setProducts(prev => [newProduct, ...prev]);
                        setShowAddModal(false);
                    }}
                />
            )}
        </div>
    );
}

// Modal para Editar Producto
function EditProductModal({ product, onClose, onSave }: { product: FirebaseProduct; onClose: () => void; onSave: (product: FirebaseProduct) => void }) {
    const [formData, setFormData] = useState({
        original: product.original || '',
        marca: product.marca || '',
        tipo: product.tipo || '',
        modelo: product.modelo || '',
        atributos: product.atributos?.join(', ') || '',
        medidas: product.medidas?.join(', ') || '',
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const productRef = doc(db, 'products', product.id);
            const updateData = {
                original: formData.original,
                marca: formData.marca,
                tipo: formData.tipo,
                modelo: formData.modelo,
                atributos: formData.atributos.split(',').map(s => s.trim()).filter(Boolean),
                medidas: formData.medidas.split(',').map(s => s.trim()).filter(Boolean),
                updatedAt: Timestamp.now(),
            };

            await updateDoc(productRef, updateData);
            onSave({ ...product, ...updateData });
            alert('✅ Producto actualizado exitosamente');
        } catch (error) {
            console.error('Error actualizando producto:', error);
            alert('❌ Error al actualizar producto');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Editar Producto</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre</label>
                        <input
                            type="text"
                            value={formData.original}
                            onChange={(e) => setFormData({ ...formData, original: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Marca</label>
                        <input
                            type="text"
                            value={formData.marca}
                            onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo</label>
                        <input
                            type="text"
                            value={formData.tipo}
                            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Modelo</label>
                        <input
                            type="text"
                            value={formData.modelo}
                            onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Atributos (separados por coma)</label>
                        <textarea
                            value={formData.atributos}
                            onChange={(e) => setFormData({ ...formData, atributos: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Medidas (separadas por coma)</label>
                        <textarea
                            value={formData.medidas}
                            onChange={(e) => setFormData({ ...formData, medidas: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
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
function AddProductModal({ onClose, onAdd }: { onClose: () => void; onAdd: (product: FirebaseProduct) => void }) {
    const [formData, setFormData] = useState({
        original: '',
        marca: '',
        tipo: '',
        modelo: '',
        atributos: '',
        medidas: '',
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const newProduct = {
                original: formData.original,
                marca: formData.marca,
                tipo: formData.tipo,
                modelo: formData.modelo,
                atributos: formData.atributos.split(',').map(s => s.trim()).filter(Boolean),
                medidas: formData.medidas.split(',').map(s => s.trim()).filter(Boolean),
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            };

            const docRef = await addDoc(collection(db, 'products'), newProduct);
            onAdd({ id: docRef.id, ...newProduct });
            alert('✅ Producto agregado exitosamente');
        } catch (error) {
            console.error('Error agregando producto:', error);
            alert('❌ Error al agregar producto');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Agregar Producto</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre *</label>
                        <input
                            type="text"
                            value={formData.original}
                            onChange={(e) => setFormData({ ...formData, original: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Marca</label>
                        <input
                            type="text"
                            value={formData.marca}
                            onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo</label>
                        <input
                            type="text"
                            value={formData.tipo}
                            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Modelo</label>
                        <input
                            type="text"
                            value={formData.modelo}
                            onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Atributos (separados por coma)</label>
                        <textarea
                            value={formData.atributos}
                            onChange={(e) => setFormData({ ...formData, atributos: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="Ej: Resistente, Portátil, Ligero"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Medidas (separadas por coma)</label>
                        <textarea
                            value={formData.medidas}
                            onChange={(e) => setFormData({ ...formData, medidas: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="Ej: 10cm, 20cm, 5kg"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Guardando...' : 'Agregar Producto'}
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
