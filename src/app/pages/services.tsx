'use client';

import React from 'react';
import Image from 'next/image';
import { Header, Footer, RBButton, RBBadge } from '../components';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Timeline } from '@/components/ui/timeline';
import { WobbleCard } from '@/components/ui/wobble-card';
import { ACSpotlight } from '../components/aceternity/Spotlight';
import { ACMeteors } from '../components/aceternity/Meteors';
import { ACBackgroundBeams } from '../components/aceternity/BackgroundBeams';
import { ACHoverBorderGradient } from '../components/aceternity/HoverBorderGradient';

// --- Iconos SVG ---
const CheckCircleIcon = () => (
    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CogIcon = () => (
    <svg className="w-8 h-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const SparklesIcon = () => (
    <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

// --- Datos para Apple Cards Carousel (Servicios Principales) ---
const servicesCards = [
    {
        category: "Maquinado CNC",
        title: "Torno CNC de Alta Precisión",
        src: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800",
        content: (
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-8 md:p-14 rounded-3xl mb-4">
                <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
                    <span className="font-bold text-blue-400">Precisión micrométrica</span> en cada pieza. 
                    Nuestros tornos CNC de última generación procesan materiales desde aluminio hasta aceros templados, 
                    garantizando tolerancias de ±0.005mm en diámetros desde 1mm hasta 300mm.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                        <p className="text-blue-300 text-sm">Capacidad</p>
                        <p className="text-white text-2xl font-bold">Ø 300mm</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                        <p className="text-blue-300 text-sm">Tolerancia</p>
                        <p className="text-white text-2xl font-bold">±0.005mm</p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        category: "Maquinado CNC",
        title: "Centro de Maquinado 5 Ejes",
        src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
        content: (
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-8 md:p-14 rounded-3xl mb-4">
                <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
                    <span className="font-bold text-yellow-400">Geometrías complejas</span> sin límites. 
                    Nuestros centros de maquinado 5 ejes simultáneos fabrican moldes, troqueles y componentes aeroespaciales 
                    con acabados superficiales de espejo en una sola configuración.
                </p>
                <div className="mt-8 flex gap-4 flex-wrap">
                    <RBBadge variant="primary">5 Ejes Simultáneos</RBBadge>
                    <RBBadge variant="success">Moldes de Inyección</RBBadge>
                    <RBBadge variant="info">Aeroespacial</RBBadge>
                </div>
            </div>
        ),
    },
    {
        category: "Tratamientos",
        title: "Tratamientos Térmicos",
        src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
        content: (
            <div className="bg-gradient-to-br from-orange-900 to-red-900 p-8 md:p-14 rounded-3xl mb-4">
                <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
                    <span className="font-bold text-orange-300">Temple, revenido y nitrurado</span> para máxima durabilidad. 
                    Aumentamos la vida útil de tus herramientas y componentes con procesos controlados de tratamiento térmico 
                    hasta 1200°C con atmósfera controlada.
                </p>
            </div>
        ),
    },
    {
        category: "Metrología",
        title: "Control de Calidad Dimensional",
        src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800",
        content: (
            <div className="bg-gradient-to-br from-green-900 to-teal-900 p-8 md:p-14 rounded-3xl mb-4">
                <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
                    <span className="font-bold text-green-300">Certificación completa</span> con equipos de medición tridimensional (CMM). 
                    Reportes dimensionales detallados según normas ISO 9001 para garantizar la conformidad de cada pieza.
                </p>
            </div>
        ),
    },
    {
        category: "Ingeniería",
        title: "Diseño y Desarrollo de Herramentales",
        src: "https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?w=800",
        content: (
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 md:p-14 rounded-3xl mb-4">
                <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
                    <span className="font-bold text-purple-300">De la idea al producto final</span>. 
                    Nuestro equipo de ingenieros diseña y fabrica herramentales personalizados, 
                    desde el modelado CAD/CAM hasta la puesta en marcha en tu línea de producción.
                </p>
            </div>
        ),
    },
];

// --- Datos para Testimonios Animados ---
const testimonials = [
    {
        quote: "Herramaq transformó nuestra línea de producción. La precisión de sus tornos CNC es excepcional y nos ha permitido reducir desperdicios en un 40%.",
        name: "Javier Mendoza",
        designation: "Director de Manufactura, BOSCH México",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
        quote: "El servicio de maquinado 5 ejes de Herramaq superó nuestras expectativas. Lograron geometrías que otros talleres consideraban imposibles.",
        name: "Sofia Rostro",
        designation: "Jefa de Ingeniería, TREMEC",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
        quote: "Confiamos en Herramaq para nuestros componentes críticos aeroespaciales. Su control de calidad y trazabilidad son de clase mundial.",
        name: "Carlos Ramírez",
        designation: "Gerente de Compras, Safran México",
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
        quote: "Los tratamientos térmicos de Herramaq duplicaron la vida útil de nuestras herramientas de corte. Un partner estratégico invaluable.",
        name: "Ana Gutiérrez",
        designation: "Gerente de Producción, VALEO",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
];

// --- Datos para Timeline (Historia de la Empresa) ---
const timelineData = [
    {
        title: "1995",
        content: (
            <div>
                <p className="text-slate-700 text-base md:text-lg font-normal mb-4">
                    Fundación de Herramaq en San Juan del Río, Querétaro. Iniciamos con un taller de 200m² y 2 tornos convencionales, 
                    enfocados en la reparación de maquinaria agrícola.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <Image
                        src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400"
                        alt="Fundación 1995"
                        width={400}
                        height={300}
                        className="rounded-lg object-cover h-40 w-full shadow-lg"
                    />
                    <Image
                        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400"
                        alt="Primer taller"
                        width={400}
                        height={300}
                        className="rounded-lg object-cover h-40 w-full shadow-lg"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "2003",
        content: (
            <div>
                <p className="text-slate-700 text-base md:text-lg font-normal mb-4">
                    Adquisición del primer torno CNC HAAS ST-20. Este hito nos permitió incursionar en la industria automotriz 
                    como proveedor Tier 2, fabricando componentes para transmisiones.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                    <RBBadge variant="success">Certificación ISO 9001</RBBadge>
                    <RBBadge variant="info">Primer Cliente Automotriz</RBBadge>
                </div>
                <Image
                    src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=600"
                    alt="Primer CNC 2003"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full shadow-lg"
                />
            </div>
        ),
    },
    {
        title: "2010",
        content: (
            <div>
                <p className="text-slate-700 text-base md:text-lg font-normal mb-4">
                    Expansión de instalaciones a 2,000m² e incorporación de centros de maquinado vertical de 3 y 5 ejes. 
                    Inicio de operaciones con clientes aeroespaciales certificados AS9100.
                </p>
                <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircleIcon />
                        Centro de Maquinado 5 ejes DMG MORI
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircleIcon />
                        Laboratorio de Metrología CMM
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircleIcon />
                        Certificación AS9100 Rev C
                    </li>
                </ul>
            </div>
        ),
    },
    {
        title: "2018",
        content: (
            <div>
                <p className="text-slate-700 text-base md:text-lg font-normal mb-4">
                    Implementación de manufactura digital con software CAD/CAM Mastercam y sistema ERP para trazabilidad completa. 
                    Reconocimiento como Proveedor del Año por TREMEC.
                </p>
                <Image
                    src="https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?w=600"
                    alt="Manufactura Digital 2018"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full shadow-lg"
                />
            </div>
        ),
    },
    {
        title: "2025",
        content: (
            <div>
                <p className="text-slate-700 text-base md:text-lg font-normal mb-4">
                    Hoy contamos con 45 colaboradores, 18 máquinas CNC de última generación y servimos a más de 80 clientes 
                    en los sectores automotriz, aeroespacial, médico y energético. Nuestra visión: ser el referente de calidad 
                    en maquinado de precisión en el Bajío mexicano.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-3xl font-bold text-slate-700">45</p>
                        <p className="text-slate-600 text-sm">Colaboradores</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                        <p className="text-3xl font-bold text-green-600">18</p>
                        <p className="text-slate-600 text-sm">Máquinas CNC</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <p className="text-3xl font-bold text-purple-600">80+</p>
                        <p className="text-slate-600 text-sm">Clientes</p>
                    </div>
                </div>
            </div>
        ),
    },
];

// --- Datos para Bento Grid (Capacidades) ---
const capabilities = [
    {
        title: "Maquinado de Alta Velocidad",
        description: "Centros de maquinado con velocidades de husillo hasta 24,000 RPM para acabados superficiales de espejo.",
        header: <CogIcon />,
        className: "md:col-span-2",
    },
    {
        title: "Materiales Especiales",
        description: "Experiencia en titanio, Inconel, aluminio aeroespacial y aceros endurecidos hasta 62 HRC.",
        header: <SparklesIcon />,
        className: "md:col-span-1",
    },
    {
        title: "Ingeniería Concurrente",
        description: "Colaboramos desde la etapa de diseño para optimizar manufacturabilidad y reducir costos.",
        header: <CogIcon />,
        className: "md:col-span-1",
    },
    {
        title: "Entregas JIT",
        description: "Sistema de producción flexible con entregas just-in-time y kanban para tus líneas de ensamble.",
        header: <CheckCircleIcon />,
        className: "md:col-span-2",
    },
];

// --- Componente Principal ---
export default function ServicesPage() {
    const cards = servicesCards.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="min-h-screen bg-slate-50">
            <Header activeTab="Servicios" />

            {/* Hero Section con Spotlight y Meteors */}
            <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950">
                <ACSpotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#94a3b8" />
                <ACMeteors number={30} />

                <div className="relative z-10 w-full px-4 md:px-8 lg:px-16">
                    <div className="max-w-5xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                            Servicios de Maquinado de Precisión
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Transformamos metal en soluciones. Desde prototipos únicos hasta producción en serie, 
                            con tecnología CNC de última generación y más de 30 años de experiencia.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <ACHoverBorderGradient>
                                <span className="inline-flex items-center justify-center font-semibold bg-slate-800 text-white hover:bg-slate-100 hover:text-slate-900 px-8 py-4 text-lg rounded-lg transition-colors duration-300">
                                    Solicitar Cotización
                                </span>
                            </ACHoverBorderGradient>
                            <RBButton variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold">
                                Ver Capacidades
                            </RBButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apple Cards Carousel - Servicios Principales */}
            <section className="w-full py-12 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
                            Nuestros Servicios
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                            Descubre nuestra gama completa de soluciones de maquinado y manufactura especializada
                        </p>
                    </div>
                    <Carousel items={cards} />
                </div>
            </section>

            Wobble Cards - Beneficios Clave
            <section className="w-full py-12 md:py-16 lg:py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
                            ¿Por Qué Elegir Herramaq?
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                            Más de 27 años de experiencia en comercialización de herramienta industrial
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                        {/* TODO: CAMBIAR POR  pagina antigua */}
                        <WobbleCard
                            containerClassName="col-span-1 bg-blue-900 h-auto md:h-[300px] lg:h-[320px]"
                            className=""
                        >
                            <div className="max-w-sm">
                                <h2 className="text-left text-balance text-xl md:text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mb-3 md:mb-4">
                                    Certificación ISO 9001:2015
                                </h2>
                                <p className="mt-2 md:mt-4 text-left text-sm md:text-base text-white/90">
                                    Garantizamos procesos estandarizados y control de calidad riguroso en cada proyecto, 
                                    cumpliendo con los más altos estándares internacionales.
                                </p>
                            </div>
                        </WobbleCard>
                        <WobbleCard
                            containerClassName="col-span-1 bg-slate-800 h-auto md:h-[300px] lg:h-[320px]"
                            className=""
                        >
                            <div className="max-w-sm">
                                <h2 className="text-left text-balance text-xl md:text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mb-3 md:mb-4">
                                    Tecnología CNC de Última Generación
                                </h2>
                                <p className="mt-2 md:mt-4 text-left text-sm md:text-base text-white/90">
                                    Equipamiento de precisión con capacidad multieje para proyectos complejos, 
                                    garantizando tolerancias mínimas y acabados superiores.
                                </p>
                            </div>
                        </WobbleCard>
                        <WobbleCard
                            containerClassName="col-span-1 md:col-span-2 lg:col-span-1 bg-blue-800 h-auto md:h-[300px] lg:h-[320px]"
                            className=""
                        >
                            <div className="max-w-sm">
                                <h2 className="text-left text-balance text-xl md:text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mb-3 md:mb-4">
                                    Confianza de Líderes Industriales
                                </h2>
                                <p className="mt-2 md:mt-4 text-left text-sm md:text-base text-white/90">
                                    Socios estratégicos de empresas como Volkswagen, General Motors, Mabe y otras 
                                    corporaciones que confían en nuestra capacidad de manufactura.
                                </p>
                            </div>
                        </WobbleCard>
                    </div>
                </div>
            </section>

            {/* Bento Grid - Capacidades Técnicas */}
            {/* <section className="w-full py-12 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
                            Capacidades Técnicas
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                            Equipamiento y experiencia para los proyectos más exigentes
                        </p>
                    </div>
                    <BentoGrid className="max-w-6xl mx-auto">
                        {capabilities.map((item, i) => (
                            <BentoGridItem
                                key={i}
                                title={item.title}
                                description={item.description}
                                header={item.header}
                                className={item.className}
                            />
                        ))}
                    </BentoGrid>
                </div>
            </section> */}

            {/* Timeline - Historia de la Empresa */}
            <section className="w-full py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Nuestra Historia
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            30 años de evolución, innovación y compromiso con la excelencia
                        </p>
                    </div>
                    <Timeline data={timelineData} />
                </div>
            </section>

            {/* Animated Testimonials */}
            {/* sacar de google */}
            <section className="w-full py-12 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
                            Lo Que Dicen Nuestros Clientes
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                            La confianza de líderes industriales nos respalda
                        </p>
                    </div>
                    <AnimatedTestimonials testimonials={testimonials} />
                </div>
            </section>

            {/* CTA Final con Background Beams */}
            <section className="relative w-full py-16 md:py-20 bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
                <ACBackgroundBeams className="opacity-30" />
                
                <div className="relative z-10 w-full px-4 md:px-8 text-center">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                        ¿Listo para Llevar tu Proyecto al Siguiente Nivel?
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto">
                        Contáctanos hoy y descubre cómo podemos ayudarte a fabricar componentes 
                        de la más alta calidad con los tiempos de entrega más competitivos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <ACHoverBorderGradient>
                            <span className="inline-flex items-center justify-center font-semibold bg-slate-800 text-white hover:bg-slate-100 hover:text-slate-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-lg transition-colors duration-300">
                                Solicitar Cotización Ahora
                            </span>
                        </ACHoverBorderGradient>
                        <RBButton variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold">
                            Agendar Visita a Planta
                        </RBButton>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
