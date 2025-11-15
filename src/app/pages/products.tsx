'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Header, Footer, RBBadge, RBButton } from '../components';
import { ACSpotlight } from '../components/aceternity/Spotlight';
import { ACMeteors } from '../components/aceternity/Meteors';
import { ACHoverBorderGradient } from '../components/aceternity/HoverBorderGradient';
import { ACBackgroundBeams } from '../components/aceternity/BackgroundBeams';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs, startAfter, QueryDocumentSnapshot, getCountFromServer, Query, DocumentData } from 'firebase/firestore';

gsap.registerPlugin(ScrollTrigger);

// --- Tipos ---
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

interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    imageUrl: string;
    images: string[];
    specs: {
        atributos?: string[];
        medidas?: string[];
        tipo?: string;
    };
    inStock: boolean;
    modelo?: string;
}

interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
}

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

// --- Iconos SVG ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

// Convertir producto de Firebase al formato de la UI
const convertFirebaseProduct = (doc: QueryDocumentSnapshot): Product => {
    const data = doc.data() as FirebaseProduct;
    const brand = data.marca || 'Sin marca';
    const tipo = data.tipo || 'Herramienta';
    
    return {
        id: doc.id,
        name: data.original || 'Producto sin nombre',
        description: `${tipo}${data.modelo ? ` - Modelo: ${data.modelo}` : ''}`,
        category: tipo,
        brand: brand,
        imageUrl: `https://placehold.co/600x600/1e3a8a/ffffff?text=${encodeURIComponent(tipo)}`,
        images: [
            `https://placehold.co/600x600/1e3a8a/ffffff?text=${encodeURIComponent(tipo)}`,
        ],
        specs: {
            atributos: data.atributos,
            medidas: data.medidas,
            tipo: tipo,
        },
        inStock: true,
        modelo: data.modelo,
    };
};

// --- Modal de Producto ---
const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && modalRef.current && backdropRef.current) {
            gsap.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo(
                modalRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
            );
        }
    }, [isOpen]);

    const handleClose = () => {
        if (modalRef.current && backdropRef.current) {
            gsap.to(modalRef.current, {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 0.3,
                ease: 'power2.in',
            });
            gsap.to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: onClose,
            });
        } else {
            onClose();
        }
    };

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto pt-16 md:pt-4">
            <div
                ref={backdropRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-6xl my-4 md:my-8 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                <button
                    onClick={handleClose}
                    className="sticky top-4 left-full -ml-12 z-20 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Cerrar modal"
                >
                    <CloseIcon />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Imagen del Producto */}
                    <div className="relative bg-slate-50 p-4 md:p-8">
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-inner">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Información del Producto */}
                    <div className="p-4 md:p-8 lg:p-12 flex flex-col justify-between min-h-[400px]">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <RBBadge variant="primary">
                                    {product.category}
                                </RBBadge>
                                {product.inStock && (
                                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                        <CheckIcon />
                                        Disponible
                                    </span>
                                )}
                            </div>

                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{product.name}</h2>
                            <p className="text-blue-600 font-semibold text-base md:text-lg mb-4 md:mb-6">{product.brand}</p>
                            {product.modelo && (
                                <p className="text-slate-600 text-sm mb-2">
                                    <span className="font-semibold">Modelo:</span> {product.modelo}
                                </p>
                            )}
                            <p className="text-slate-600 text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed">{product.description}</p>

                            {/* Especificaciones */}
                            <div className="mb-6 md:mb-8">
                                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4">Especificaciones</h3>
                                
                                {product.specs.atributos && product.specs.atributos.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Atributos</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.specs.atributos.map((attr, idx) => (
                                                <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {attr}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.specs.medidas && product.specs.medidas.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Medidas</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.specs.medidas.map((medida, idx) => (
                                                <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium">
                                                    {medida}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <RBButton
                                variant="primary"
                                className="flex-1 flex items-center justify-center gap-2"
                            >
                                <ShoppingCartIcon />
                                Solicitar Cotización
                            </RBButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Tarjeta de Producto ---
const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            const card = cardRef.current;

            const onMouseEnter = () => {
                gsap.to(card, {
                    y: -8,
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                if (imageRef.current) {
                    gsap.to(imageRef.current, {
                        scale: 1.1,
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                }
            };

            const onMouseLeave = () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                if (imageRef.current) {
                    gsap.to(imageRef.current, {
                        scale: 1,
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                }
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
            className="product-card group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
        >
            <div className="relative h-64 bg-slate-50 overflow-hidden">
                <div ref={imageRef} className="w-full h-full">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                    />
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <RBBadge variant="info">
                        {product.category}
                    </RBBadge>
                    {product.inStock && (
                        <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                            <CheckIcon />
                            Stock
                        </span>
                    )}
                </div>

                <p className="text-blue-600 font-semibold text-sm mb-1">{product.brand}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
                {product.modelo && (
                    <p className="text-slate-500 text-xs mb-2">Modelo: {product.modelo}</p>
                )}

                <div className="flex gap-2 mt-4">
                    <RBButton
                        variant="primary"
                        className="flex-1"
                        onClick={() => onViewDetails(product)}
                    >
                        Ver Detalles
                    </RBButton>
                    <button
                        className="p-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300"
                        onClick={() => onViewDetails(product)}
                    >
                        <ShoppingCartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState(''); // Para saber qué está buscando actualmente
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedBrand, setSelectedBrand] = useState('Todas');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [allCategories, setAllCategories] = useState<string[]>(['Todos']);
    const [allBrands, setAllBrands] = useState<string[]>(['Todas']);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    
    // Cache de búsqueda: guarda los 1000 filtrados
    const [searchCache, setSearchCache] = useState<Product[]>([]);
    const [searchCacheIndex, setSearchCacheIndex] = useState(0); // Cuántos hemos mostrado del cache

    const heroRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const productsGridRef = useRef<HTMLDivElement>(null);

    // Cargar productos iniciales
    useEffect(() => {
        loadInitialProducts();
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

    const loadInitialProducts = async () => {
        setLoading(true);
        console.log('🔄 Iniciando carga de productos...');
        setActiveSearchTerm(''); // Limpiar búsqueda activa
        setSearchCache([]); // Limpiar cache
        setSearchCacheIndex(0);
        
        try {
            console.log('📦 Obteniendo referencia a colección productos...');
            const productsRef = collection(db, 'products');
            const q = query(
                productsRef,
                orderBy('createdAt', 'asc'), // Más viejo primero (tienen más atributos)
                limit(100)
            );

            console.log('🔍 Ejecutando query...');
            const snapshot = await getDocs(q);
            console.log(`✅ Query ejecutada. Documentos obtenidos: ${snapshot.docs.length}`);
            
            const productsData = snapshot.docs.map(doc => {
                const product = convertFirebaseProduct(doc);
                console.log('📄 Producto:', product.name);
                return product;
            });
            
            console.log('📊 Total productos convertidos:', productsData.length);
            setProducts(productsData);
            setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
            setHasMore(snapshot.docs.length === 100);

            // Extraer categorías y marcas únicas
            const categories = new Set<string>(['Todos']);
            const brands = new Set<string>(['Todas']);
            
            productsData.forEach(product => {
                if (product.category) categories.add(product.category);
                if (product.brand && product.brand !== 'GENÉRICA') brands.add(product.brand);
            });

            console.log('🏷️ Categorías encontradas:', Array.from(categories));
            console.log('🏢 Marcas encontradas:', Array.from(brands));

            setAllCategories(Array.from(categories));
            setAllBrands(Array.from(brands));
        } catch (error) {
            console.error('❌ Error cargando productos:', error);
        } finally {
            setLoading(false);
            console.log('✅ Carga finalizada');
        }
    };

    // Cargar más productos
    const loadMoreProducts = async () => {
        if (!lastDoc || loadingMore) return;

        setLoadingMore(true);
        try {
            const productsRef = collection(db, 'products');
            
            // Si hay búsqueda activa
            if (activeSearchTerm) {
                // ¿Tenemos más en el cache?
                if (searchCacheIndex < searchCache.length) {
                    console.log(`📦 Cargando desde cache: ${searchCacheIndex} a ${searchCacheIndex + 100}`);
                    const nextBatch = searchCache.slice(searchCacheIndex, searchCacheIndex + 100);
                    
                    const previousLength = products.length;
                    setProducts(prev => [...prev, ...nextBatch]);
                    setSearchCacheIndex(prev => prev + 100);
                    
                    // Si llegamos al final del cache, intentar cargar más de Firebase
                    if (searchCacheIndex + 100 >= searchCache.length) {
                        console.log('📦 Cache agotado, intentando cargar más de Firebase...');
                        // Cargar siguientes 1000
                        const q = query(
                            productsRef,
                            orderBy('createdAt', 'asc'),
                            startAfter(lastDoc),
                            limit(1000)
                        );

                        const snapshot = await getDocs(q);
                        if (snapshot.docs.length > 0) {
                            const allProducts = snapshot.docs.map(doc => convertFirebaseProduct(doc));
                            
                            // Filtrar por búsqueda
                            const filtered = allProducts.filter(product => 
                                product.name.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
                                product.brand.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
                                product.category.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
                                (product.modelo && product.modelo.toLowerCase().includes(activeSearchTerm.toLowerCase()))
                            );

                            console.log(`✅ Nuevos productos filtrados: ${filtered.length}`);
                            
                            // Agregar al cache
                            setSearchCache(prev => [...prev, ...filtered]);
                            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
                            setHasMore(snapshot.docs.length === 1000 || filtered.length > 0);
                        } else {
                            setHasMore(false);
                        }
                    }

                    // Animar nuevos productos
                    setTimeout(() => {
                        const newCards = document.querySelectorAll('.product-card');
                        const newCardsArray = Array.from(newCards).slice(previousLength);
                        
                        gsap.fromTo(newCardsArray,
                            { opacity: 0, y: 50 },
                            {
                                opacity: 1,
                                y: 0,
                                stagger: 0.05,
                                duration: 0.6,
                                ease: 'power3.out',
                            }
                        );
                    }, 100);
                } else {
                    setHasMore(false);
                }
            } else {
                // Sin búsqueda, cargar normal
                const q = query(
                    productsRef,
                    orderBy('createdAt', 'asc'),
                    startAfter(lastDoc),
                    limit(100)
                );

                const snapshot = await getDocs(q);
                const newProducts = snapshot.docs.map(doc => convertFirebaseProduct(doc));
                
                const previousLength = products.length;
                setProducts(prev => [...prev, ...newProducts]);
                setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
                setHasMore(snapshot.docs.length === 100);

                // Actualizar categorías y marcas
                const categories = new Set(allCategories);
                const brands = new Set(allBrands);
                
                newProducts.forEach(product => {
                    if (product.category) categories.add(product.category);
                    if (product.brand && product.brand !== 'GENÉRICA') brands.add(product.brand);
                });

                setAllCategories(Array.from(categories));
                setAllBrands(Array.from(brands));

                // Animar solo los nuevos productos
                setTimeout(() => {
                    const newCards = document.querySelectorAll('.product-card');
                    const newCardsArray = Array.from(newCards).slice(previousLength);
                    
                    gsap.fromTo(newCardsArray,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            stagger: 0.05,
                            duration: 0.6,
                            ease: 'power3.out',
                        }
                    );
                }, 100);
            }
        } catch (error) {
            console.error('Error cargando más productos:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    // Buscar en toda la base de datos
    const handleSearch = async (term: string) => {
        if (term.trim() === '') {
            console.log('🔍 Búsqueda vacía, restaurando productos iniciales');
            setActiveSearchTerm('');
            setSearchCache([]);
            setSearchCacheIndex(0);
            loadInitialProducts();
            return;
        }

        console.log('🔍 Buscando:', term);
        setLoading(true);
        setActiveSearchTerm(term);
        
        try {
            const productsRef = collection(db, 'products');
            let allFiltered: Product[] = [];
            let currentLastDoc: QueryDocumentSnapshot | null = null;
            let hasMoreToSearch = true;
            let searchBatch = 0;

            // Buscar en lotes de 1000 hasta encontrar resultados o llegar al final
            while (hasMoreToSearch && allFiltered.length === 0) {
                searchBatch++;
                console.log(`📦 Buscando en lote ${searchBatch}...`);

                const q: Query<DocumentData> = currentLastDoc
                    ? query(
                        productsRef,
                        orderBy('createdAt', 'asc'),
                        startAfter(currentLastDoc),
                        limit(1000)
                    )
                    : query(
                        productsRef,
                        orderBy('createdAt', 'asc'),
                        limit(1000)
                    );
                
                const snapshot = await getDocs(q);
                console.log(`📦 Lote ${searchBatch}: ${snapshot.docs.length} documentos`);
                
                if (snapshot.docs.length === 0) {
                    hasMoreToSearch = false;
                    break;
                }

                const allProducts: Product[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => convertFirebaseProduct(doc));
                
                // Filtrar en el cliente
                const filtered: Product[] = allProducts.filter((product: Product) => 
                    product.name.toLowerCase().includes(term.toLowerCase()) ||
                    product.brand.toLowerCase().includes(term.toLowerCase()) ||
                    product.category.toLowerCase().includes(term.toLowerCase()) ||
                    (product.modelo && product.modelo.toLowerCase().includes(term.toLowerCase()))
                );

                allFiltered = filtered;
                currentLastDoc = snapshot.docs[snapshot.docs.length - 1];
                
                // Si encontramos resultados o llegamos al final
                if (filtered.length > 0 || snapshot.docs.length < 1000) {
                    hasMoreToSearch = false;
                }
            }

            console.log(`✅ Productos filtrados totales: ${allFiltered.length}`);
            
            if (allFiltered.length > 0) {
                // Guardar en cache
                setSearchCache(allFiltered);
                setSearchCacheIndex(100); // Ya mostramos los primeros 100
                
                // Tomar solo los primeros 100
                const firstBatch = allFiltered.slice(0, 100);
                setProducts(firstBatch);
                
                // Guardar lastDoc para cargar más si es necesario
                setLastDoc(currentLastDoc);
                setHasMore(allFiltered.length > 100);
            } else {
                // No se encontraron resultados
                setProducts([]);
                setSearchCache([]);
                setSearchCacheIndex(0);
                setLastDoc(null);
                setHasMore(false);
            }

            // Scroll a los productos
            setTimeout(() => {
                productsGridRef.current?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);

        } catch (error) {
            console.error('❌ Error buscando productos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Animaciones GSAP
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (heroRef.current) {
                gsap.from('.hero-title', {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: 'power3.out',
                });
                gsap.from('.hero-subtitle', {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    delay: 0.2,
                    ease: 'power3.out',
                });
                gsap.from('.search-bar', {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    delay: 0.4,
                    ease: 'power3.out',
                });
            }

            if (statsRef.current) {
                gsap.from('.stat-item', {
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power3.out',
                });
            }
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (productsGridRef.current && products.length > 0 && products.length <= 30) {
            // Solo animar la primera carga
            gsap.from('.product-card', {
                scrollTrigger: {
                    trigger: productsGridRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                y: 50,
                stagger: 0.05,
                duration: 0.6,
                ease: 'power3.out',
            });
        }
    }, [products.length <= 30]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
            const matchesBrand = selectedBrand === 'Todas' || product.brand === selectedBrand;
            return matchesCategory && matchesBrand;
        });
    }, [products, selectedCategory, selectedBrand]);

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
                            Catálogo de Productos
                        </h1>
                        <p className="hero-subtitle text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Herramientas de precisión y maquinaria industrial para impulsar tu producción
                        </p>

                        {/* Barra de Búsqueda */}
                        <div className="search-bar max-w-2xl mx-auto">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <SearchIcon />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar en todos los productos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch(searchTerm);
                                        }
                                    }}
                                    className="w-full pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-white transition-all duration-300 shadow-xl"
                                />
                                <button
                                    onClick={() => handleSearch(searchTerm)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300"
                                >
                                    Buscar
                                </button>
                            </div>
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
                            <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">{products.length}</div>
                            <p className="text-xl text-slate-300">Productos Cargados</p>
                        </div>
                        <div className="stat-item text-center">
                            <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">{allCategories.length - 1}</div>
                            <p className="text-xl text-slate-300">Categorías</p>
                        </div>
                        <div className="stat-item text-center">
                            <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">{allBrands.length - 1}</div>
                            <p className="text-xl text-slate-300">Marcas</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filtros */}
            <section className="w-full py-12 bg-white border-b border-slate-200">
                <div className="w-full px-4 md:px-8 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Filtrar por:</h2>
                        
                        <div className="space-y-6">
                            {/* Categorías */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-700 mb-3">Categoría</h3>
                                <div className="flex flex-wrap gap-3">
                                    {allCategories.map((category) => (
                                        <div
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className="category-btn cursor-pointer"
                                        >
                                            <ACHoverBorderGradient
                                                containerClassName="h-full"
                                                className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                                                    selectedCategory === category
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-slate-700 hover:text-blue-600'
                                                }`}
                                            >
                                                {category}
                                            </ACHoverBorderGradient>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Marcas */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-700 mb-3">Marca</h3>
                                <div className="flex flex-wrap gap-3">
                                    {allBrands.map((brand) => (
                                        <div
                                            key={brand}
                                            onClick={() => setSelectedBrand(brand)}
                                            className="brand-btn cursor-pointer"
                                        >
                                            <ACHoverBorderGradient
                                                containerClassName="h-full"
                                                className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                                                    selectedBrand === brand
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-slate-700 hover:text-blue-600'
                                                }`}
                                            >
                                                {brand}
                                            </ACHoverBorderGradient>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <p className="text-slate-600">
                                Mostrando <span className="font-bold text-blue-600">{filteredProducts.length}</span> de <span className="font-bold">{totalProducts}</span> productos
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid de Productos */}
            <section ref={productsGridRef} className="w-full py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-slate-600">Cargando productos...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">No se encontraron productos</h3>
                            <p className="text-slate-600">Intenta ajustar los filtros o la búsqueda</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
                                ))}
                            </div>

                            {/* Botón Cargar Más */}
                            {hasMore ? (
                                <div className="text-center mt-12">
                                    <button
                                        onClick={loadMoreProducts}
                                        disabled={loadingMore}
                                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loadingMore ? 'Cargando...' : 'Cargar Más Productos'}
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center mt-12 py-8 border-t-2 border-slate-200">
                                    <div className="text-5xl mb-4">✅</div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                        ¡Has visto todos los productos!
                                    </h3>
                                    <p className="text-slate-600">
                                        Mostrando {filteredProducts.length} productos{activeSearchTerm && ` para "${activeSearchTerm}"`}
                                    </p>
                                </div>
                            )}
                        </>
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
