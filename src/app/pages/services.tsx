'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header, Footer } from '../components/shared';

// --- Tipos ---
interface Client {
    name: string;
    logoUrl: string;
}

interface Testimonial {
    quote: string;
    author: string;
    company: string;
}

interface Service {
    id: number;
    name: string;
    description: string;
    images: string[];
    clients: Client[];
    testimonial: Testimonial;
}

interface HeaderProps {
    activeTab: string;
}

interface ServiceCardProps {
    service: Service;
}

// --- Iconos SVG ---
const QuoteIcon = () => (
    <svg className="w-8 h-8 text-blue-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
);

// --- Datos de ejemplo para los servicios ---
const mockServiceData: Service[] = [
    {
        id: 1,
        name: "Servicio de Torno CNC",
        description: "Ofrecemos maquinado de alta precisión en tornos CNC para la fabricación de piezas cilíndricas complejas. Desde prototipos únicos hasta producción en serie, garantizamos tolerancias exactas y acabados superficiales de primera calidad para una amplia gama de materiales.",
        images: [
            'https://placehold.co/800x600/1e3a8a/ffffff?text=Torno+en+Operación',
            'https://placehold.co/800x600/334155/ffffff?text=Pieza+Terminada',
            'https://placehold.co/800x600/64748b/ffffff?text=Detalle+de+Corte',
            'https://placehold.co/800x600/94a3b8/ffffff?text=Control+Numérico'
        ],
        clients: [
            { name: "BOSCH", logoUrl: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=BOSCH' },
            { name: "SIEMENS", logoUrl: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=SIEMENS' },
            { name: "VALEO", logoUrl: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=VALEO' }
        ],
        testimonial: {
            quote: "La precisión y la repetibilidad que Herramaq nos ofrece en sus servicios de torno son inigualables. Han sido clave para nuestra línea de producción.",
            author: "Javier Mendoza",
            company: "Jefe de Producción, BOSCH"
        }
    },
    {
        id: 2,
        name: "Centro de Maquinado (Fresado)",
        description: "Nuestros centros de maquinado vertical y horizontal de 3 y 5 ejes nos permiten fabricar componentes prismáticos con geometrías complejas. Especializados en moldes, troqueles y piezas para la industria aeroespacial y automotriz.",
        images: [
            'https://placehold.co/800x600/1e3a8a/ffffff?text=Fresadora+CNC',
            'https://placehold.co/800x600/334155/ffffff?text=Molde+de+Inyección',
            'https://placehold.co/800x600/64748b/ffffff?text=Maquinado+5-ejes',
            'https://placehold.co/800x600/94a3b8/ffffff?text=Verificación+CMM'
        ],
        clients: [
            { name: "AEROMEXICO", logoUrl: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=AEROMEXICO' },
            { name: "TREMEC", logoUrl: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=TREMEC' },
            { name: "BROSE", logoUrl: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=BROSE' }
        ],
        testimonial: {
            quote: "La capacidad de Herramaq para manejar geometrías complejas en sus fresadoras ha reducido nuestros tiempos de entrega y mejorado la calidad de nuestros herramentales.",
            author: "Sofia Rostro",
            company: "Ingeniera de Diseño, TREMEC"
        }
    },
];

// --- Componente de Tarjeta de Servicio ---
const ServiceCard = ({ service }: ServiceCardProps) => {
    const [activeImage, setActiveImage] = useState<string>(service.images[0]);

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16 transition-all duration-300 hover:shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Columna de Galería */}
                <div className="p-8 bg-slate-50">
                    <div className="space-y-4">
                        <div className="bg-slate-200 rounded-lg overflow-hidden shadow-inner relative h-96">
                            <Image 
                                src={activeImage} 
                                alt={`${service.name} main view`} 
                                fill
                                className="object-cover transition-all duration-300"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {service.images.map((imgSrc: string, imgIndex: number) => (
                                <div key={imgIndex} className="h-20 bg-slate-200 rounded-md overflow-hidden cursor-pointer relative" onClick={() => setActiveImage(imgSrc)}>
                                    <Image 
                                        src={imgSrc} 
                                        alt={`${service.name} thumb ${imgIndex + 1}`} 
                                        fill
                                        className={`object-cover transition-all duration-200 ${activeImage === imgSrc ? 'ring-4 ring-blue-800 scale-95' : 'opacity-60 hover:opacity-100'}`}
                                        sizes="120px"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Columna de Información */}
                <div className="p-10 flex flex-col">
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{service.name}</h3>
                    <p className="text-slate-600 text-lg mb-8 flex-grow">{service.description}</p>
                    
                    {/* Testimonio */}
                    <div className="bg-blue-800 rounded-lg p-6 text-white relative mb-8 shadow-lg">
                        <div className="absolute top-4 left-4 opacity-50">
                            <QuoteIcon />
                        </div>
                        <p className="italic text-lg mb-4 z-10 relative">"{service.testimonial.quote}"</p>
                        <div className="text-right font-semibold text-blue-200">
                            <p>{service.testimonial.author}</p>
                            <p className="text-sm">{service.testimonial.company}</p>
                        </div>
                    </div>

                    {/* Marcas Atendidas */}
                    <div>
                        <h4 className="text-lg font-bold text-slate-800 mb-4 text-center">Marcas que Confían en este Servicio</h4>
                        <div className="flex justify-around items-center gap-4">
                            {service.clients.map((client: Client) => (
                                <div key={client.name} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 relative w-[150px] h-[60px]">
                                    <Image src={client.logoUrl} alt={client.name} fill className="object-contain" sizes="150px" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Componente principal de la página de servicios ---
export default function ServicesPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="w-full px-4 md:px-8">
                
                <Header activeTab="Servicios" />

                {/* Encabezado de la página */}
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">Nuestros Servicios Industriales</h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">Soluciones de maquinado a la medida de tus necesidades, con la tecnología y experiencia que tu empresa requiere.</p>
                </header>

                {/* Lista de Servicios */}
                <main>
                    {mockServiceData.map((service: Service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </main>

                <Footer />
            </div>
        </div>
    );
}
