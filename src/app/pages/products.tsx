'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Header, Footer } from '../components';
import { ACSpotlight } from '../components/aceternity/Spotlight';
import { ACMeteors } from '../components/aceternity/Meteors';
import { ACHoverBorderGradient } from '../components/aceternity/HoverBorderGradient';
import { ACBackgroundBeams } from '../components/aceternity/BackgroundBeams';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs, startAfter, QueryDocumentSnapshot, getCountFromServer, where, Query, DocumentData } from 'firebase/firestore';
import { Product } from '@/types/product';
import { convertFirebaseProduct } from './products/utils';
import { ProductModal } from './products/ProductModal';
import { ProductCard } from './products/ProductCard';
import { SearchIcon } from './products/icons';
import { getBrandLogo } from '@/data/brandLogos';

gsap.registerPlugin(ScrollTrigger);

// Interfaz para marca con conteo
interface BrandInfo {
    name: string;
    count: number;
    logoUrl: string;
}

// Componente de Card de Marca
const BrandCard: React.FC<{ brand: BrandInfo; onClick: () => void; isSelected: boolean }> = ({ brand, onClick, isSelected }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            const card = cardRef.current;
            const onMouseEnter = () => {
                gsap.to(card, { y: -8, scale: 1.02, duration: 0.3, ease: 'power2.out' });
            };
            const onMouseLeave = () => {
                gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
            };
            card.addEventListener('mouseenter', onMouseEnter);
            card.addEventListener('mouseleave', onMouseLeave);
            return () => {
                card.removeEventListener('mouseenter', onMouseEnter);
                card.removeEventListener('mouseleave', onMouseLeave);
            };
        }
    }, []);

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            className={`brand-card cursor-pointer group relative bg-white rounded-2xl overflow-hidden border-2 shadow-lg transition-all duration-300 hover:shadow-2xl ${
                isSelected ? 'border-blue-600 ring-4 ring-blue-200' : 'border-slate-200'
            }`}
        >
            <div className="relative h-40 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
                {brand.logoUrl ? (
                    <Image
                        src={brand.logoUrl}
                        alt={brand.name}
                        width={120}
                        height={80}
                        className="object-contain max-h-20"
                    />
                ) : (
                    <div className="text-3xl font-bold text-slate-400 text-center">
                        {brand.name}
                    </div>
                )}
            </div>
            <div className="p-4 bg-white">
                <h3 className="text-lg font-bold text-slate-900 mb-1 truncate">{brand.name}</h3>
                <p className="text-sm text-slate-500">
                    <span className="font-semibold text-blue-600">{brand.count}</span> productos
                </p>
            </div>
            {isSelected && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Estados para marcas
    const [brands, setBrands] = useState<BrandInfo[]>([]);
    const [loadingBrands, setLoadingBrands] = useState(true);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    
    // Estados para productos de una marca
    const [brandProducts, setBrandProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [lastProductDoc, setLastProductDoc] = useState<QueryDocumentSnapshot | null>(null);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [loadingMoreProducts, setLoadingMoreProducts] = useState(false);
    
    // Estados para búsqueda de productos
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearchingProducts, setIsSearchingProducts] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const heroRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const brandsGridRef = useRef<HTMLDivElement>(null);
    const productsGridRef = useRef<HTMLDivElement>(null);

    // Cargar marcas al inicio
    useEffect(() => {
        loadBrands();
        loadTotalCount();
    }, []);

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

    // Cargar todas las marcas con sus conteos
    const loadBrands = async () => {
        setLoadingBrands(true);
        console.log('🔄 Cargando marcas...');
        
        try {
            const productsRef = collection(db, 'products');
            const brandCounts = new Map<string, number>();
            let lastDoc: QueryDocumentSnapshot | null = null;
            let hasMore = true;

            // Iterar por todos los productos para contar marcas
            while (hasMore) {
                const baseQuery: Query<DocumentData> = lastDoc
                    ? query(productsRef, orderBy('marca', 'asc'), startAfter(lastDoc), limit(1000))
                    : query(productsRef, orderBy('marca', 'asc'), limit(1000));

                const snapshot = await getDocs(baseQuery);
                
                snapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
                    const data = doc.data();
                    const brand = data.marca || 'Sin marca';
                    if (brand && brand !== 'GENÉRICA' && brand !== 'Sin marca') {
                        brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
                    }
                });

                lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
                hasMore = snapshot.docs.length === 1000;
            }

            // Convertir a array y ordenar por cantidad de productos
            const brandsArray: BrandInfo[] = Array.from(brandCounts.entries())
                .map(([name, count]) => ({
                    name,
                    count,
                    logoUrl: getBrandLogo(name)
                }))
                .sort((a, b) => b.count - a.count);

            console.log(`✅ Marcas cargadas: ${brandsArray.length}`);
            setBrands(brandsArray);
        } catch (error) {
            console.error('❌ Error cargando marcas:', error);
        } finally {
            setLoadingBrands(false);
        }
    };

    // Cargar productos de una marca específica
    const loadBrandProducts = async (brandName: string) => {
        setLoadingProducts(true);
        setBrandProducts([]);
        setLastProductDoc(null);
        setHasMoreProducts(true);
        console.log(`🔄 Cargando productos de ${brandName}...`);

        try {
            const productsRef = collection(db, 'products');
            const q = query(
                productsRef,
                where('marca', '==', brandName),
                orderBy('createdAt', 'asc'),
                limit(50)
            );

            const snapshot = await getDocs(q);
            const products = snapshot.docs.map(doc => convertFirebaseProduct(doc));

            console.log(`✅ Productos cargados: ${products.length}`);
            setBrandProducts(products);
            setLastProductDoc(snapshot.docs[snapshot.docs.length - 1] || null);
            setHasMoreProducts(snapshot.docs.length === 50);

            // Scroll a productos
            setTimeout(() => {
                productsGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (error) {
            console.error('❌ Error cargando productos:', error);
        } finally {
            setLoadingProducts(false);
        }
    };

    // Cargar más productos de la marca seleccionada
    const loadMoreBrandProducts = async () => {
        if (!selectedBrand || !lastProductDoc || loadingMoreProducts) return;

        setLoadingMoreProducts(true);
        try {
            const productsRef = collection(db, 'products');
            const q = query(
                productsRef,
                where('marca', '==', selectedBrand),
                orderBy('createdAt', 'asc'),
                startAfter(lastProductDoc),
                limit(50)
            );

            const snapshot = await getDocs(q);
            const newProducts = snapshot.docs.map(doc => convertFirebaseProduct(doc));

            const previousLength = brandProducts.length;
            setBrandProducts(prev => [...prev, ...newProducts]);
            setLastProductDoc(snapshot.docs[snapshot.docs.length - 1] || null);
            setHasMoreProducts(snapshot.docs.length === 50);

            // Animar nuevos productos
            setTimeout(() => {
                const newCards = document.querySelectorAll('.product-card');
                const newCardsArray = Array.from(newCards).slice(previousLength);
                gsap.fromTo(newCardsArray,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: 'power3.out' }
                );
            }, 100);
        } catch (error) {
            console.error('Error cargando más productos:', error);
        } finally {
            setLoadingMoreProducts(false);
        }
    };

    // Manejar selección de marca
    const handleBrandSelect = (brandName: string) => {
        if (selectedBrand === brandName) {
            // Deseleccionar
            setSelectedBrand(null);
            setBrandProducts([]);
        } else {
            setSelectedBrand(brandName);
            loadBrandProducts(brandName);
        }
    };

    // Buscar marcas
    const filteredBrands = useMemo(() => {
        if (!searchTerm.trim()) return brands;
        return brands.filter(brand =>
            brand.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [brands, searchTerm]);

    // Buscar productos en toda la base de datos
    const handleSearch = async () => {
        const term = searchTerm.trim();
        if (!term) {
            setSearchResults([]);
            setHasSearched(false);
            return;
        }

        setIsSearchingProducts(true);
        setHasSearched(true);
        setSelectedBrand(null);
        setBrandProducts([]);
        console.log('🔍 Buscando productos:', term);

        try {
            const productsRef = collection(db, 'products');
            let allFiltered: Product[] = [];
            let currentLastDoc: QueryDocumentSnapshot | null = null;
            let hasMoreToSearch = true;

            // Buscar en lotes de 1000
            while (hasMoreToSearch && allFiltered.length < 100) {
                const baseQuery: Query<DocumentData> = currentLastDoc
                    ? query(productsRef, orderBy('createdAt', 'asc'), startAfter(currentLastDoc), limit(1000))
                    : query(productsRef, orderBy('createdAt', 'asc'), limit(1000));

                const snapshot = await getDocs(baseQuery);
                
                if (snapshot.docs.length === 0) {
                    hasMoreToSearch = false;
                    break;
                }

                const products = snapshot.docs.map((doc: QueryDocumentSnapshot) => convertFirebaseProduct(doc));
                
                // Filtrar por término de búsqueda
                const filtered = products.filter((product: Product) =>
                    product.name.toLowerCase().includes(term.toLowerCase()) ||
                    product.brand.toLowerCase().includes(term.toLowerCase()) ||
                    product.category.toLowerCase().includes(term.toLowerCase()) ||
                    (product.modelo && product.modelo.toLowerCase().includes(term.toLowerCase()))
                );

                allFiltered = [...allFiltered, ...filtered];
                currentLastDoc = snapshot.docs[snapshot.docs.length - 1];
                hasMoreToSearch = snapshot.docs.length === 1000;
            }

            console.log(`✅ Productos encontrados: ${allFiltered.length}`);
            setSearchResults(allFiltered.slice(0, 100)); // Limitar a 100 resultados

            // Scroll a resultados
            setTimeout(() => {
                brandsGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (error) {
            console.error('❌ Error buscando productos:', error);
        } finally {
            setIsSearchingProducts(false);
        }
    };

    // Limpiar búsqueda
    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setHasSearched(false);
        setSelectedBrand(null);
        setBrandProducts([]);
    };

    // Animaciones GSAP
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (heroRef.current) {
                gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' });
                gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 1, delay: 0.2, ease: 'power3.out' });
                gsap.from('.search-bar', { opacity: 0, y: 20, duration: 0.8, delay: 0.4, ease: 'power3.out' });
            }

            if (statsRef.current) {
                gsap.from('.stat-item', {
                    scrollTrigger: { trigger: statsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
                    opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out'
                });
            }
        });

        return () => ctx.revert();
    }, []);

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header activeTab="Productos" />

            {/* Hero Section */}
            <section ref={heroRef} className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
                <ACSpotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#60a5fa" />
                <ACMeteors number={30} />

                <div className="relative z-10 w-full px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                            Catálogo por Marcas
                        </h1>
                        <p className="hero-subtitle text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Explora nuestras {brands.length} marcas de herramientas y maquinaria industrial
                        </p>

                        {/* Barra de Búsqueda de Marcas y Productos */}
                        <div className="search-bar max-w-2xl mx-auto">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <SearchIcon />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar marca o producto..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        if (!e.target.value.trim()) {
                                            setSearchResults([]);
                                            setHasSearched(false);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                    className="w-full pl-12 pr-32 py-4 text-lg bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-white transition-all duration-300 shadow-xl"
                                />
                                <button
                                    onClick={handleSearch}
                                    disabled={isSearchingProducts}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300 disabled:opacity-50"
                                >
                                    {isSearchingProducts ? 'Buscando...' : 'Buscar'}
                                </button>
                            </div>
                            {!hasSearched && (
                                <p className="mt-3 text-blue-200 text-sm">
                                    💡 Las marcas se filtran automáticamente. Para buscar productos, presiona <strong>Buscar</strong> o <strong>Enter</strong>.
                                </p>
                            )}
                            {hasSearched && (
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={clearSearch}
                                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-300 text-sm"
                                    >
                                        ✕ Limpiar búsqueda
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section ref={statsRef} className="relative w-full py-16 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
                <ACBackgroundBeams className="opacity-30" />
                
                <div className="relative z-10 w-full px-4 md:px-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="stat-item text-center">
                            <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">{totalProducts.toLocaleString()}</div>
                            <p className="text-xl text-slate-300">Productos Totales</p>
                        </div>
                        <div className="stat-item text-center">
                            <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">{brands.length}</div>
                            <p className="text-xl text-slate-300">Marcas</p>
                        </div>
                        <div className="stat-item text-center">
                            <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">
                                {brands.length > 0 ? Math.round(totalProducts / brands.length) : 0}
                            </div>
                            <p className="text-xl text-slate-300">Promedio por Marca</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid de Marcas o Resultados de Búsqueda */}
            <section ref={brandsGridRef} className="w-full py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">
                            {hasSearched && searchResults.length > 0 
                                ? `Resultados para "${searchTerm}"`
                                : selectedBrand 
                                    ? `Productos de ${selectedBrand}` 
                                    : 'Selecciona una Marca'}
                        </h2>
                        {(selectedBrand || hasSearched) && (
                            <button
                                onClick={() => {
                                    setSelectedBrand(null);
                                    setBrandProducts([]);
                                    if (hasSearched) clearSearch();
                                }}
                                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-colors duration-300"
                            >
                                ← Ver Todas las Marcas
                            </button>
                        )}
                    </div>

                    {loadingBrands || isSearchingProducts ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-slate-600">
                                {isSearchingProducts ? 'Buscando productos...' : 'Cargando marcas...'}
                            </p>
                        </div>
                    ) : hasSearched ? (
                        // Mostrar resultados de búsqueda de productos
                        <>
                            {searchResults.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No se encontraron productos</h3>
                                    <p className="text-slate-600 mb-4">No hay productos que coincidan con &quot;{searchTerm}&quot;</p>
                                    {filteredBrands.length > 0 && (
                                        <div className="mt-8">
                                            <p className="text-slate-600 mb-4">Pero encontramos <span className="font-bold text-blue-600">{filteredBrands.length}</span> marcas similares:</p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                                {filteredBrands.slice(0, 6).map((brand) => (
                                                    <BrandCard
                                                        key={brand.name}
                                                        brand={brand}
                                                        onClick={() => {
                                                            clearSearch();
                                                            handleBrandSelect(brand.name);
                                                        }}
                                                        isSelected={false}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <p className="text-slate-600 mb-6">
                                        Mostrando <span className="font-bold text-blue-600">{searchResults.length}</span> productos encontrados
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {searchResults.map((product) => (
                                            <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : !selectedBrand ? (
                        // Mostrar grid de marcas
                        <>
                            {filteredBrands.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No se encontraron marcas</h3>
                                    <p className="text-slate-600">Intenta con otro término de búsqueda</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-slate-600 mb-6">
                                        Mostrando <span className="font-bold text-blue-600">{filteredBrands.length}</span> marcas
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                        {filteredBrands.map((brand) => (
                                            <BrandCard
                                                key={brand.name}
                                                brand={brand}
                                                onClick={() => handleBrandSelect(brand.name)}
                                                isSelected={selectedBrand === brand.name}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        // Mostrar productos de la marca seleccionada
                        <div ref={productsGridRef}>
                            {loadingProducts ? (
                                <div className="text-center py-20">
                                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
                                    <p className="mt-4 text-slate-600">Cargando productos de {selectedBrand}...</p>
                                </div>
                            ) : brandProducts.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="text-6xl mb-4">📦</div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No hay productos</h3>
                                    <p className="text-slate-600">Esta marca no tiene productos disponibles</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-slate-600 mb-6">
                                        Mostrando <span className="font-bold text-blue-600">{brandProducts.length}</span> productos de <span className="font-bold">{selectedBrand}</span>
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {brandProducts.map((product) => (
                                            <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
                                        ))}
                                    </div>

                                    {/* Botón Cargar Más Productos */}
                                    {hasMoreProducts ? (
                                        <div className="text-center mt-12">
                                            <button
                                                onClick={loadMoreBrandProducts}
                                                disabled={loadingMoreProducts}
                                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loadingMoreProducts ? 'Cargando...' : 'Cargar Más Productos'}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center mt-12 py-8 border-t-2 border-slate-200">
                                            <div className="text-5xl mb-4">✅</div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                                ¡Has visto todos los productos de {selectedBrand}!
                                            </h3>
                                            <p className="text-slate-600">
                                                Mostrando {brandProducts.length} productos
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative w-full py-20 bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
                <ACSpotlight className="-top-40 right-0" fill="#60a5fa" />
                
                <div className="relative z-10 w-full px-4 md:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        ¿No encuentras lo que buscas?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Contáctanos y te ayudaremos a encontrar la herramienta perfecta para tu proyecto
                    </p>
                    <ACHoverBorderGradient className="inline-block">
                        <span className="inline-flex items-center justify-center font-semibold bg-blue-600 text-white hover:bg-blue-50 hover:text-blue-600 px-8 py-4 text-lg rounded-lg transition-colors duration-300">
                            Contactar Ahora
                        </span>
                    </ACHoverBorderGradient>
                </div>
            </section>

            <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />

            <Footer />
        </div>
    );
}
