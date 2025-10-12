'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Header, Footer } from '../components/shared';

// --- Tipos ---
interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    brand: string;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
}

// --- Iconos SVG ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

// --- Datos de ejemplo para los productos ---
const mockProductData: Product[] = [
    { id: 1, name: 'Fresa de Carburo 4 Filos', description: 'Alta velocidad para acabados finos en acero y aluminio.', category: 'Herramientas de Corte', brand: 'PRECITOOLS', imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Fresa' },
    { id: 2, name: 'Inserto de Torneado CNMG', description: 'Recubrimiento PVD para una mayor vida útil en torneado de aceros inoxidables.', category: 'Herramientas de Corte', brand: 'SANDVIK', imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Inserto' },
    { id: 3, name: 'Prensa de Sujeción 6"', description: 'Prensa de alta precisión para centros de maquinado CNC.', category: 'Sujeción y Fijación', brand: 'FERROTEC', imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Prensa' },
    { id: 4, name: 'Calibrador Vernier Digital', description: 'Rango de 0-150mm con precisión de 0.01mm. Salida de datos USB.', category: 'Medición', brand: 'MITUTOYO', imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Calibrador' },
    { id: 5, name: 'Disco de Desbaste 4 1/2"', description: 'Disco abrasivo para desbaste de metal, soldadura y acero.', category: 'Abrasivos', brand: 'NORTON', imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Disco' },
    { id: 6, name: 'Broca de Cobalto 1/2"', description: 'Para perforación en materiales duros como acero inoxidable y titanio.', category: 'Herramientas de Corte', brand: 'PRECITOOLS', imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Broca' },
    { id: 7, name: 'Chuck Hidráulico CAT40', description: 'Sujeción de alta fuerza y precisión para fresado de alto rendimiento.', category: 'Sujeción y Fijación', brand: 'FERROTEC', imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Chuck' },
    { id: 8, name: 'Micrómetro de Exteriores', description: 'Rango 0-1" con resolución de 0.0001". Ideal para control de calidad.', category: 'Medición', brand: 'MITUTOYO', imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Micrómetro' },
    { id: 9, name: 'Rueda de Lija Flap', description: 'Para lijado, pulido y acabado de superficies metálicas irregulares.', category: 'Abrasivos', brand: 'NORTON', imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Rueda+Lija' },
    { id: 10, name: 'Machuelo de Corte M8x1.25', description: 'Machuelo de acero de alta velocidad (HSS) para roscado preciso.', category: 'Herramientas de Corte', brand: 'SANDVIK', imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Machuelo' },
];

// --- Componente de Tarjeta de Producto ---
const ProductCard = ({ product }: ProductCardProps) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
        <div className="h-48 overflow-hidden relative">
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{product.category}</span>
                <span className="text-xs font-bold text-slate-500">{product.brand}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex-grow">{product.name}</h3>
            <p className="text-slate-600 text-sm">{product.description}</p>
        </div>
    </div>
);

// --- Componente principal de la página de productos ---
export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedBrand, setSelectedBrand] = useState('Todas');

    const categories = ['Todos', ...new Set(mockProductData.map(p => p.category))];
    const brands = ['Todas', ...new Set(mockProductData.map(p => p.brand))];

    const filteredProducts = useMemo(() => {
        return mockProductData.filter(product => {
            const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
            const matchesBrand = selectedBrand === 'Todas' || product.brand === selectedBrand;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesBrand && matchesSearch;
        });
    }, [searchQuery, selectedCategory, selectedBrand]);

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="w-full px-4 md:px-8">
                
                <Header activeTab="Productos" />

                {/* Encabezado de la página */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">Nuestro Catálogo de Productos</h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">Encuentra la herramienta perfecta para tu proyecto. Utiliza nuestros filtros para una búsqueda precisa.</p>
                </header>

                {/* Controles de Filtro */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        {/* Buscador */}
                        <div className="relative col-span-1 md:col-span-1">
                            <input
                                type="text"
                                placeholder="Buscar por nombre o descripción..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                        </div>

                        {/* Filtro de Categorías */}
                        <div className="col-span-1 md:col-span-2">
                             <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold mr-2 text-slate-700 hidden sm:inline">Categorías:</span>
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedCategory === category ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                         {/* Filtro de Marcas (visible en pantallas grandes) */}
                        <div className="col-span-1 md:col-span-3 border-t border-slate-200 pt-4 mt-4 md:border-none md:pt-0 md:mt-0 flex items-center justify-center">
                             <label htmlFor="brand-select" className="font-semibold text-slate-700 mr-3">Filtrar por Marca:</label>
                             <select
                                id="brand-select"
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="border border-slate-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Cuadrícula de Productos */}
                <main>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product: Product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-bold text-slate-800">No se encontraron productos</h3>
                            <p className="text-slate-500 mt-2">Intenta ajustar tu búsqueda o filtros para encontrar lo que buscas.</p>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </div>
    );
}

