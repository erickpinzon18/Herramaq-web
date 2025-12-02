'use client';

import React from 'react';
import Link from 'next/link';
import { Header, Footer, RBButton, RBBadge, RBStatCard, RBGlassCard, RBAnimatedText } from '../components';
import { ACHero } from '../components/aceternity/Hero';
import { ACFeature } from '../components/aceternity/FeatureCard';
import { ACSpotlight } from '../components/aceternity/Spotlight';
import { ACBackgroundBeams } from '../components/aceternity/BackgroundBeams';
import { ACMeteors } from '../components/aceternity/Meteors';
import { ACHoverBorderGradient } from '../components/aceternity/HoverBorderGradient';
import { ACBentoGrid, ACBentoGridItem } from '../components/aceternity/BentoGrid';
import { ACInfiniteMovingCards } from '../components/aceternity/InfiniteMovingCards';
import { ACInfiniteLogoScroll } from '../components/aceternity/InfiniteLogoScroll';

// --- Iconos SVG como componentes de React ---
const IconExperience = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconBrands = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v5c0 .512.195 1.024.586 1.414l7 7a2 2 0 002.828 0l7-7a2 2 0 000-2.828l-7-7A2 2 0 0012 3H7z" />
  </svg>
);

const IconClients = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-2 5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);


// --- Componente principal de la aplicación ---
export default function App() {
  // Datos de testimonios para el carrusel infinito
  const testimonials = [
    {
      quote: "Herramaq ha sido nuestro proveedor de confianza por más de 5 años. Su calidad y servicio son excepcionales.",
      name: "Carlos Méndez",
      title: "Jefe de Producción, BOSCH México"
    },
    {
      quote: "La precisión de sus herramientas CNC ha mejorado significativamente nuestra eficiencia en producción.",
      name: "Ana Rodríguez",
      title: "Gerente de Manufactura, TREMEC"
    },
    {
      quote: "Excelente asesoría técnica y soporte post-venta. Altamente recomendados para la industria aeroespacial.",
      name: "Miguel Ángel Santos",
      title: "Ingeniero de Procesos, SAFRAN"
    },
    {
      quote: "Sus soluciones de maquinado han reducido nuestros tiempos de ciclo en un 30%. Increíble calidad.",
      name: "Laura Fernández",
      title: "Directora de Operaciones, VALEO"
    },
    {
      quote: "La mejor inversión que hemos hecho. Maquinaria confiable y herramientas de primera calidad.",
      name: "Roberto Gómez",
      title: "Supervisor de Mantenimiento, SIEMENS"
    }
  ];

  // Datos para los logos en carrusel
  const brandLogos = [
    { name: 'INDUMAC', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=INDUMAC' },
    { name: 'PRECITOOLS', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=PRECITOOLS' },
    { name: 'FERROTEC', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=FERROTEC' },
    { name: 'SANDVIK', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=SANDVIK' },
    { name: 'MITUTOYO', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=MITUTOYO' },
    { name: 'NORTON', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=NORTON' },
  ];

  const clientLogos = [
    { name: 'BOSCH', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=BOSCH' },
    { name: 'TREMEC', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=TREMEC' },
    { name: 'SAFRAN', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=SAFRAN' },
    { name: 'VALEO', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=VALEO' },
    { name: 'SIEMENS', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=SIEMENS' },
    { name: 'BROSE', logo: 'https://placehold.co/150x60/e2e8f0/1e3a8a?text=BROSE' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 text-slate-800 w-full min-h-screen relative overflow-hidden">
      {/* Spotlight Effect */}
      <ACSpotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(0, 102, 230, 0.3)" />
      
      {/* Meteors Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ACMeteors number={30} />
      </div>

      <div className="w-full px-4 md:px-8 relative z-10">

        <Header activeTab="Inicio" />

        <main className="space-y-16 md:space-y-24 max-w-none py-4 md:py-8" role="main" aria-label="Contenido principal">
          {/* Hero mejorado con Aceternity */}
          <section aria-labelledby="hero-heading" className="px-2">
            <h1 id="hero-heading" className="sr-only">Herramaq - Soluciones Industriales de Precisión en Querétaro</h1>
            <ACHero
              title={"Soluciones Industriales, Precisión en cada Herramienta."}
              subtitle={"En Herramaq somos líderes en San Juan del Río, Querétaro. Ofrecemos maquinaria, herramientas y accesorios industriales para la industrial metal-mecánica."}
              cta={{ label: 'Ver Nuestro Catálogo', href: '/products' }}
            />
          </section>

          {/* Sección de Estadísticas con RBStatCard */}
          <section className="relative py-8 md:py-12 overflow-hidden" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">Estadísticas de Herramaq</h2>
            {/* Background Beams Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <ACBackgroundBeams />
            </div>
            
            {/* Fondo decorativo */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5 rounded-3xl"></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 md:px-6 z-10">
              <RBStatCard 
                icon={<IconExperience />} 
                value="27+" 
                label="Años de Experiencia"
                trend={{ value: "+2 años este 2025", isPositive: true }}
                gradient="from-blue-500 to-blue-700"
              />
              <RBStatCard 
                icon={<IconBrands />} 
                value="50+" 
                label="Marcas de Prestigio"
                trend={{ value: "+10 nuevas marcas", isPositive: true }}
                gradient="from-blue-600 to-indigo-700"
              />
              <RBStatCard 
                icon={<IconClients />} 
                value="200+" 
                label="Clientes Satisfechos"
                trend={{ value: "98% satisfacción", isPositive: true }}
                gradient="from-indigo-600 to-blue-700"
              />
            </div>
          </section>

          {/* Sección de BentoGrid - Características Visuales */}
          <section className="relative px-2" aria-labelledby="capabilities-heading">
            <RBAnimatedText animation="fadeInUp" className="text-center mb-8 md:mb-12">
              <RBBadge variant="primary" className="mb-4">Nuestras Capacidades</RBBadge>
              <h2 id="capabilities-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 to-slate-700 bg-clip-text text-transparent mb-4 px-4">
                Todo lo que Necesitas en un Solo Lugar
              </h2>
            </RBAnimatedText>
            
            <ACBentoGrid className="px-2 md:px-6">
              <ACBentoGridItem
                title="Maquinaria CNC de Última Generación"
                description="Tornos y fresadoras con tecnología de punta para fabricación de alta precisión"
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden" />
                }
                className="md:col-span-2"
              />
              <ACBentoGridItem
                title="Herramientas de Corte Especializadas"
                description="Fresas, insertos y brocas de carburo con recubrimientos PVD"
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200"></div>
                }
              />
              <ACBentoGridItem
                title="Sistemas de Medición Precisos"
                description="Calibradores digitales, micrómetros y equipos CMM certificados"
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200"></div>
                }
              />
              <ACBentoGridItem
                title="Accesorios de Sujeción"
                description="Prensas, chucks hidráulicos y portaherramientas de alta fuerza"
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-50 to-blue-150"></div>
                }
                className="md:col-span-2"
              />
              <ACBentoGridItem
                title="Asistencia en Maquinado"
                description="Optimización de procesos y selección de herramientas"
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden" />
                }
                className="md:col-span-2"
              />
              <ACBentoGridItem
                title="Servicio Técnico 24/7"
                description="Soporte especializado y mantenimiento preventivo incluido"
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-50 to-slate-150"></div>
                }
              />
            </ACBentoGrid>
          </section>

          {/* Testimonios con Carrusel Infinito */}
          <section className="relative py-8 md:py-12 px-2" aria-labelledby="testimonials-heading">
            <RBAnimatedText animation="fadeInUp" className="text-center mb-8 md:mb-12">
              <RBBadge variant="success" className="mb-4">Testimonios</RBBadge>
              <h2 id="testimonials-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 to-slate-700 bg-clip-text text-transparent mb-4 px-4">
                Lo que Dicen Nuestros Clientes
              </h2>
              <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto px-4">
                Empresas líderes confían en nosotros día a día
              </p>
            </RBAnimatedText>
            
            <div className="relative flex justify-center items-center">
              <ACInfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
                className="mx-auto"
              />
            </div>
          </section>

          {/* Sección de Features mejorada */}
          <section className="relative px-2" aria-labelledby="features-heading">
            <RBAnimatedText animation="fadeInUp" className="text-center mb-8 md:mb-12">
              <RBBadge variant="info" className="mb-4">¿Por qué elegirnos?</RBBadge>
              <h2 id="features-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 to-slate-700 bg-clip-text text-transparent mb-4 px-4">
                Compromiso con la Excelencia
              </h2>
              <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto px-4">
                Nuestra trayectoria nos respalda como el socio ideal para tus necesidades industriales
              </p>
            </RBAnimatedText>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 md:px-6">
              <ACFeature 
                icon={<IconExperience />} 
                title="Experiencia Consolidada" 
                description="Más de 27 años en el sector con soporte técnico especializado y garantía en todos nuestros productos y servicios." 
              />
              <ACFeature 
                icon={<IconBrands />} 
                title="Marcas Reconocidas" 
                description="Alianzas estratégicas con más de 50 marcas líderes para ofrecer lo mejor en maquinaria y herramientas industriales." 
              />
              <ACFeature 
                icon={<IconClients />} 
                title="Confianza Comprobada" 
                description="Red de más de 200 clientes satisfechos en sectores automotriz, aeroespacial, manufactura y más." 
              />
            </div>
          </section>

          {/* Llamado a la acción con animación */}
          <section className="relative overflow-hidden rounded-2xl md:rounded-3xl mx-2" aria-labelledby="cta-heading">
            <h2 id="cta-heading" className="sr-only">Llamado a la acción</h2>
            {/* Meteors dentro del CTA */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <ACMeteors number={15} className="bg-white" />
            </div>
            
            <RBGlassCard className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none shadow-2xl">
              <RBAnimatedText animation="fadeInUp" className="relative z-10 text-center py-8 md:py-12 px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-gradient-x bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  ¿Listo para impulsar tu producción?
                </h2>
                <p className="text-blue-100 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                  Descubre cómo nuestras soluciones pueden optimizar tus procesos industriales con tecnología de vanguardia
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <Link href="/products">
                    <ACHoverBorderGradient
                      containerClassName="rounded-lg w-full sm:w-auto"
                      className="bg-white text-blue-800 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg shadow-xl font-semibold w-full sm:w-auto"
                    >
                      Explorar Productos ✨
                    </ACHoverBorderGradient>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <RBButton variant="outline" className="border-white text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full">
                      Contactar Ahora
                    </RBButton>
                  </Link>
                </div>
              </RBAnimatedText>
              
              {/* Partículas de fondo */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </RBGlassCard>
          </section>

          {/* Sliders de Logos - Sección Mejorada con Aceternity */}
          <section className="relative py-12 md:py-16 overflow-hidden px-2" aria-labelledby="partners-heading">
            {/* Fondo decorativo con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50 rounded-2xl md:rounded-3xl"></div>
            
            {/* Spotlight efecto */}
            <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-12 md:space-y-16">
              {/* Header de la sección */}
              <RBAnimatedText animation="fadeInUp" className="text-center">
                <RBBadge variant="primary" className="mb-4 md:mb-6 animate-float">Nuestros Socios</RBBadge>
                <h2 id="partners-heading" className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4 px-4">
                  Trabajamos con las Mejores Marcas
                </h2>
                <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto px-4">
                  Alianzas estratégicas con líderes de la industria para ofrecerte soluciones de clase mundial
                </p>
              </RBAnimatedText>

              {/* Marcas - Carrusel infinito */}
              <div className="space-y-4 md:space-y-6">
                <RBAnimatedText animation="fadeInLeft" delay={200}>
                  <div className="flex items-center gap-3 md:gap-4 mb-4 px-2 md:px-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v5c0 .512.195 1.024.586 1.414l7 7a2 2 0 002.828 0l7-7a2 2 0 000-2.828l-7-7A2 2 0 0012 3H7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800">Marcas de Prestigio</h3>
                      <p className="text-sm md:text-base text-slate-600">Proveedores de maquinaria y herramientas industriales</p>
                    </div>
                  </div>
                </RBAnimatedText>
                <ACInfiniteLogoScroll items={brandLogos} direction="left" speed="slow" />
              </div>

              {/* Clientes - Carrusel infinito en dirección opuesta */}
              <div className="space-y-4 md:space-y-6">
                <RBAnimatedText animation="fadeInRight" delay={300}>
                  <div className="flex items-center gap-3 md:gap-4 mb-4 px-2 md:px-4 justify-start md:justify-end flex-row-reverse md:flex-row">
                    <div className="text-left md:text-right">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800">Clientes que Confían en Nosotros</h3>
                      <p className="text-sm md:text-base text-slate-600">Empresas líderes en manufactura e industria</p>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-2 5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </RBAnimatedText>
                <ACInfiniteLogoScroll items={clientLogos} direction="right" speed="slow" />
              </div>

              {/* CTA para ver más */}
              <RBAnimatedText animation="scaleIn" delay={400} className="flex justify-center pt-8 md:pt-12 px-2">
                <Link href="/products" className="w-full sm:w-auto">
                  <ACHoverBorderGradient
                    containerClassName="rounded-xl shadow-xl hover:shadow-2xl transition-shadow w-full sm:w-auto"
                    className="px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all w-full sm:w-auto"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Ver Nuestro Catálogo
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </ACHoverBorderGradient>
                </Link>
              </RBAnimatedText>
            </div>
          </section>

        </main>
        
        <Footer />
      </div>
    </div>
  );
}

