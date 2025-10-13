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

gsap.registerPlugin(ScrollTrigger);

// --- Tipos ---
interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    brand: string;
    imageUrl: string;
    images: string[];
    specs: {
        material?: string;
        size?: string;
        coating?: string;
        precision?: string;
    };
    price?: string;
    inStock: boolean;
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

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

// --- Datos expandidos de productos ---
const mockProductData: Product[] = [
    { 
        id: 1, 
        name: 'Fresa de Carburo 4 Filos', 
        description: 'Alta velocidad para acabados finos en acero y aluminio.', 
        category: 'Herramientas de Corte', 
        brand: 'PRECITOOLS', 
        imageUrl: 'https://placehold.co/600x600/1e3a8a/ffffff?text=Fresa+Principal',
        images: [
            'https://placehold.co/600x600/1e3a8a/ffffff?text=Fresa+Principal',
            'https://placehold.co/600x600/334155/ffffff?text=Detalle+1',
            'https://placehold.co/600x600/64748b/ffffff?text=Detalle+2',
            'https://placehold.co/600x600/94a3b8/ffffff?text=Aplicación'
        ],
        specs: {
            material: 'Carburo de Tungsteno',
            size: '6mm - 20mm',
            coating: 'TiAlN',
            precision: '±0.005mm'
        },
        price: '$1,250 MXN',
        inStock: true
    },
    { 
        id: 2, 
        name: 'Inserto de Torneado CNMG', 
        description: 'Recubrimiento PVD para una mayor vida útil en torneado de aceros inoxidables.', 
        category: 'Herramientas de Corte', 
        brand: 'SANDVIK', 
        imageUrl: 'https://placehold.co/600x600/1e3a8a/ffffff?text=Inserto',
        images: [
            'https://placehold.co/600x600/1e3a8a/ffffff?text=Inserto',
            'https://placehold.co/600x600/334155/ffffff?text=Vista+Lateral',
            'https://placehold.co/600x600/64748b/ffffff?text=Geometría'
        ],
        specs: {
            material: 'Carburo Cementado',
            coating: 'PVD Multicapa',
            precision: 'ISO Clase M'
        },
        price: '$850 MXN',
        inStock: true
    },
    { 
        id: 3, 
        name: 'Prensa de Sujeción 6"', 
        description: 'Prensa de alta precisión para centros de maquinado CNC.', 
        category: 'Sujeción y Fijación', 
        brand: 'FERROTEC', 
        imageUrl: 'https://placehold.co/600x600/1e3a8a/ffffff?text=Prensa',
        images: [
            'https://placehold.co/600x600/1e3a8a/ffffff?text=Prensa',
            'https://placehold.co/600x600/334155/ffffff?text=Mecanismo',
            'https://placehold.co/600x600/64748b/ffffff?text=En+Uso'
        ],
        specs: {
            size: '6 pulgadas',
            material: 'Acero Templado',
            precision: '±0.01mm'
        },
        price: '$3,500 MXN',
        inStock: true
    },
    { 
        id: 4, 
        name: 'Calibrador Vernier Digital', 
        description: 'Rango de 0-150mm con precisión de 0.01mm. Salida de datos USB.', 
        category: 'Medición', 
        brand: 'MITUTOYO', 
        imageUrl: 'https://placehold.co/600x600/1e3a8a/ffffff?text=Calibrador',
        images: [
            'https://placehold.co/600x600/1e3a8a/ffffff?text=Calibrador',
            'https://placehold.co/600x600/334155/ffffff?text=Pantalla+Digital',
            'https://placehold.co/600x600/64748b/ffffff?text=Midiendo'
        ],
        specs: {
            size: '0-150mm',
            precision: '±0.01mm',
            material: 'Acero Inoxidable'
        },
        price: '$2,800 MXN',
        inStock: true
    },
    { 
        id: 5, 
        name: 'Disco de Desbaste 4 1/2"', 
        description: 'Disco abrasivo para desbaste de metal, soldadura y acero.', 
        category: 'Abrasivos', 
        brand: 'NORTON', 
        imageUrl: 'https://placehold.co/600x600/1e3a8a/ffffff?text=Disco',
        images: [
            'https://placehold.co/600x600/1e3a8a/ffffff?text=Disco',
            'https://placehold.co/600x600/334155/ffffff?text=Aplicación'
        ],
        specs: {
            size: '4.5 pulgadas',
            material: 'Óxido de Aluminio'
        },
        price: '$85 MXN',
        inStock: true
    },
    { 
        id: 6, 
        name: 'Broca de Cobalto 1/2"', 
        description: 'Para perforación en materiales duros como acero inoxidable y titanio.', 
        category: 'Herramientas de Corte', 
        brand: 'PRECITOOLS', 
        imageUrl: 'https://placehold.co/600x600/1e3a8a/ffffff?text=Broca',
        images: [
            'https://placehold.co/600x600/1e3a8a/ffffff?text=Broca',
            'https://placehold.co/600x600/334155/ffffff?text=Punta',
            'https://placehold.co/600x600/64748b/ffffff?text=Perforando'
        ],
        specs: {
            size: '1/2 pulgada',
            material: 'HSS-Co 5%',
            coating: 'TiN'
        },
        price: '$450 MXN',
        inStock: true
    },
    { 
        id: 7, 
        name: 'Chuck Hidráulico CAT40', 
        description: 'Sujeción de alta fuerza y precisión para fresado de alto rendimiento.', 
        category: 'Sujeción y Fijación', 
        brand: 'FERROTEC', 
        imageUrl: 'https://placehold.co/600x600/1e3a8a/ffffff?text=Chuck',
        images: [
            'https://placehold.co/600x600/1e3a8a/ffffff?text=Chuck',
            'https://placehold.co/600x600/334155/ffffff?text=Sistema+Hidráulico'
        ],
        specs: {
            size: 'CAT40',
            material: 'Acero Aleado',
            precision: '±0.003mm'
        },
        price: '$8,500 MXN',
        inStock: false
    },
    { 
        id: 8, 
        name: 'Micrómetro de Exteriores', 
        description: 'Rango 0-1" con resolución de 0.0001". Ideal para control de calidad.', 
        category: 'Medición', 
        brand: 'MITUTOYO', 
        imageUrl: 'https://placehold.co/600x600/1e3a8a/ffffff?text=Micrómetro',
        images: [
            'https://placehold.co/600x600/1e3a8a/ffffff?text=Micrómetro',
            'https://placehold.co/600x600/334155/ffffff?text=Escala'
        ],
        specs: {
            size: '0-25mm (0-1")',
            precision: '±0.001mm',
            material: 'Acero Inoxidable'
        },
        price: '$4,200 MXN',
        inStock: true
    },
    { 
        id: 9, 
        name: 'Rueda de Lija Flap', 
        description: 'Para lijado, pulido y acabado de superficies metálicas irregulares.', 
        category: 'Abrasivos', 
        brand: 'NORTON', 
        imageUrl: 'https://placehold.co/600x600/1e3a8a/ffffff?text=Rueda+Flap',
        images: [
            'https://placehold.co/600x600/1e3a8a/ffffff?text=Rueda+Flap',
            'https://placehold.co/600x600/334155/ffffff?text=Uso'
        ],
        specs: {
            size: '4.5 x 7/8 pulgadas',
            material: 'Óxido de Aluminio'
        },
        price: '$120 MXN',
        inStock: true
    },
    { 
        id: 10, 
        name: 'Machuelo de Corte M8x1.25', 
        description: 'Machuelo de acero de alta velocidad (HSS) para roscado preciso.', 
        category: 'Herramientas de Corte', 
        brand: 'SANDVIK', 
        imageUrl: 'https://placehold.co/600x600/1e3a8a/ffffff?text=Machuelo',
        images: [
            'https://placehold.co/600x600/1e3a8a/ffffff?text=Machuelo',
            'https://placehold.co/600x600/334155/ffffff?text=Rosca'
        ],
        specs: {
            size: 'M8 x 1.25',
            material: 'HSS',
            coating: 'TiN'
        },
        price: '$280 MXN',
        inStock: true
    },
];

// --- Modal de Producto con Galería ---
const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && modalRef.current && backdropRef.current) {
            // Animación de entrada con GSAP
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

    const nextImage = () => {
        if (!product) return;
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        if (!product) return;
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                ref={backdropRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Cerrar modal"
                >
                    <CloseIcon />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full overflow-y-auto">
                    {/* Galería de Imágenes */}
                    <div className="relative bg-slate-50 p-8">
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-inner">
                            <Image
                                src={product.images[currentImageIndex]}
                                alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Controles de Galería */}
                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-10 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                                    aria-label="Imagen anterior"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-10 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                                    aria-label="Imagen siguiente"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Miniaturas */}
                        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                        idx === currentImageIndex
                                            ? 'border-blue-600 scale-110'
                                            : 'border-slate-200 opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Miniatura ${idx + 1}`}
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Información del Producto */}
                    <div className="p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <RBBadge variant="primary">
                                    {product.category}
                                </RBBadge>
                                {product.inStock ? (
                                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                        <CheckIcon />
                                        En Stock
                                    </span>
                                ) : (
                                    <span className="text-red-500 text-sm font-medium">Agotado</span>
                                )}
                            </div>

                            <h2 className="text-4xl font-bold text-slate-900 mb-2">{product.name}</h2>
                            <p className="text-blue-600 font-semibold text-lg mb-6">{product.brand}</p>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">{product.description}</p>

                            {/* Especificaciones */}
                            {product.specs && Object.keys(product.specs).length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">Especificaciones</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(product.specs).map(([key, value]) => (
                                            <div key={key} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                                                    {key === 'material' && 'Material'}
                                                    {key === 'size' && 'Tamaño'}
                                                    {key === 'coating' && 'Recubrimiento'}
                                                    {key === 'precision' && 'Precisión'}
                                                </p>
                                                <p className="text-sm font-semibold text-slate-900">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {product.price && (
                                <div className="mb-8">
                                    <p className="text-3xl font-bold text-blue-600">{product.price}</p>
                                    <p className="text-sm text-slate-500 mt-1">Precio sujeto a disponibilidad</p>
                                </div>
                            )}
                        </div>

                        {/* Acciones */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <RBButton
                                variant="primary"
                                className="flex-1 flex items-center justify-center gap-2"
                                disabled={!product.inStock}
                            >
                                <ShoppingCartIcon />
                                Solicitar Cotización
                            </RBButton>
                            <button className="p-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                                <HeartIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Tarjeta de Producto Mejorada ---
const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            const card = cardRef.current;

            // Hover effect con GSAP
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
                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-6 py-2 rounded-full font-bold text-lg">
                            Agotado
                        </span>
                    </div>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-300">
                        <HeartIcon />
                    </button>
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
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                {product.price && (
                    <p className="text-2xl font-bold text-blue-600 mb-4">{product.price}</p>
                )}

                <div className="flex gap-2">
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

// --- Página Principal ---
export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedBrand, setSelectedBrand] = useState('Todas');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const heroRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const productsGridRef = useRef<HTMLDivElement>(null);

    // Animaciones GSAP al cargar la página
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animation
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

            // Stats animation con ScrollTrigger
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

            // Products grid con ScrollTrigger
            if (productsGridRef.current) {
                gsap.from('.product-card', {
                    scrollTrigger: {
                        trigger: productsGridRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                    opacity: 0,
                    y: 50,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power3.out',
                });
            }
        });

        return () => ctx.revert();
    }, []);

    // Re-animar productos cuando cambian los filtros
    useEffect(() => {
        if (productsGridRef.current) {
            gsap.fromTo(
                '.product-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    duration: 0.4,
                    ease: 'power2.out',
                }
            );
        }
    }, [selectedCategory, selectedBrand, searchTerm]);

    const allCategories = ['Todos', ...Array.from(new Set(mockProductData.map((p) => p.category)))];
    const allBrands = ['Todas', ...Array.from(new Set(mockProductData.map((p) => p.brand)))];

    const filteredProducts = useMemo(() => {
        return mockProductData.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
            const matchesBrand = selectedBrand === 'Todas' || product.brand === selectedBrand;
            return matchesSearch && matchesCategory && matchesBrand;
        });
    }, [searchTerm, selectedCategory, selectedBrand]);

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    const totalProducts = mockProductData.length;
    const totalCategories = allCategories.length - 1;
    const inStockCount = mockProductData.filter((p) => p.inStock).length;

    return (
        <div className="min-h-screen bg-slate-50">
            <Header activeTab="Productos" />

            {/* Hero Section con Aceternity */}
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
                                    placeholder="Buscar productos por nombre o descripción..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-white transition-all duration-300 shadow-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats con Background Beams */}
            <section ref={statsRef} className="relative w-full py-16 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
                <ACBackgroundBeams className="opacity-30" />
                
                <div className="relative z-10 w-full px-4 md:px-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="stat-item text-center">
                            <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">{totalProducts}+</div>
                            <p className="text-xl text-slate-300">Productos</p>
                        </div>
                        <div className="stat-item text-center">
                            <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">{totalCategories}</div>
                            <p className="text-xl text-slate-300">Categorías</p>
                        </div>
                        <div className="stat-item text-center">
                            <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">{inStockCount}</div>
                            <p className="text-xl text-slate-300">En Stock</p>
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
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className="category-btn"
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
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Marcas */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-700 mb-3">Marca</h3>
                                <div className="flex flex-wrap gap-3">
                                    {allBrands.map((brand) => (
                                        <button
                                            key={brand}
                                            onClick={() => setSelectedBrand(brand)}
                                            className="brand-btn"
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
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Resultados */}
                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <p className="text-slate-600">
                                Mostrando <span className="font-bold text-blue-600">{filteredProducts.length}</span> de{' '}
                                <span className="font-bold">{totalProducts}</span> productos
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid de Productos */}
            <section ref={productsGridRef} className="w-full py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">No se encontraron productos</h3>
                            <p className="text-slate-600">Intenta ajustar los filtros o la búsqueda</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
                            ))}
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
                    <ACHoverBorderGradient>
                        <RBButton variant="primary" className="bg-blue-600 text-white hover:bg-blue-50 px-8 py-4 text-lg font-bold">
                            Contactar Ahora
                        </RBButton>
                    </ACHoverBorderGradient>
                </div>
            </section>

            {/* Modal */}
            <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />

            <Footer />
        </div>
    );
}
