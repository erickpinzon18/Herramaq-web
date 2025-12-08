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
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconBrands = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v5c0 .512.195 1.024.586 1.414l7 7a2 2 0 002.828 0l7-7a2 2 0 000-2.828l-7-7A2 2 0 0012 3H7z" />
  </svg>
);

const IconClients = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-2 5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);


// --- Componente principal de la aplicación ---
export default function App() {
  // Datos de testimonios para el carrusel infinito
  // tomar de google
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

  // Datos para los logos en carrusel - Marcas con logos disponibles
  const brandLogos = [
    { name: 'Cleveland', logo: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s46d81afa783674fe/image/ia532dd2ee2116af2/version/1636852387/image.png' },
    { name: 'TMX', logo: 'https://hvhindustrial.com/images/frontend_images/brands/1762146547toolmex-tmx-logo-new.png' },
    { name: 'Royco', logo: 'https://carburoycobalto.mx/wp-content/uploads/2020/04/OSGROYCO-300x300.png' },
    { name: 'Austromex', logo: 'https://todoferreteria.com.mx/wp-content/uploads/2017/06/Austromex.png' },
    { name: 'Vertex', logo: 'https://tradetoolscia.com.pe/wp-content/uploads/2025/05/LOGO-VERTEX-1024x339.png' },
    { name: 'Master-C', logo: 'https://www.cmaster.mx/wp-content/uploads/2022/12/Logo-CMaster.png' },
    { name: 'Tenazit', logo: 'https://www.austromex.com.mx/austromex/marca/tenazit.png' },
    { name: 'Bondhus', logo: 'https://hausoftools.com/cdn/shop/articles/Bondhus_logo_720x.png?v=1540413976' },
    { name: 'Bison', logo: 'https://www.bison.com.mx/assets/img/bison.png' },
    { name: 'Volkel', logo: 'https://ce8dc832c.cloudimg.io/v7/_cs_/2021/06/60b5ce3b78c3c/volkel_logo.png?ci_sign=3b55b83d1f494cee10d4d3493b8b5dc52fde0aa4' },
    { name: 'Insize', logo: 'https://www.miasa.com.mx/wp-content/uploads/2017/02/16-3-e1572547904251.jpg' },
    { name: 'Fenes', logo: 'https://comercialtmch.cl/img/qs/fenes.png' },
    { name: 'Mitutoyo', logo: 'https://fesepsa.com.pe/wp-content/uploads/2023/05/1.-Mitutoyo-Logo-en-PNG.png' },
    { name: 'Niagara', logo: 'https://honeywell.scene7.com/is/image/honeywell/powered%20by%20niagara%20framework-transparent%20logo' },
    { name: 'Urrea', logo: 'https://0201.nccdn.net/1_2/000/000/0ac/784/png_urrea.png' },
    { name: 'Greenfield', logo: 'https://www.herramientasacz.com.mx/image/cache/data/GREENFIELD-200x200.jpg' },
    { name: 'Lenox', logo: 'https://www.lenoxhr.com/wp-content/uploads/2022/03/lenox-logo.png' },
    { name: 'Nicholson', logo: 'https://sigasa.com.mx/cdn/shop/collections/Nicholson_Logo_283x142.jpg?v=1462381098' },
    { name: 'Dremel', logo: 'https://www.dremel.com/images/dremel-logo--baafa617e8f24f53ae1f4a8e3a5a9e61.png?imgWidth=800&scale=1' },
    { name: 'Nachi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Nachi-Fujikoshi_Corp._Logo.svg/2560px-Nachi-Fujikoshi_Corp._Logo.svg.png' },
    { name: 'Destaco', logo: 'https://herramientasserra.com.mx/wp-content/uploads/2018/03/DESTACO-2c-1024x258.png' },
    { name: 'Fandeli', logo: 'https://ferreteraermita.com.mx/wp-content/uploads/2016/03/fandeli-logo.jpg' },
    { name: 'Loc-Line', logo: 'https://store.tannerherramientas.com/website/image/product.brand/95/logo' },
    { name: 'Jacobs', logo: 'https://store.tannerherramientas.com/website/image/product.brand/61/logo' },
    { name: 'YG', logo: 'https://store.tannerherramientas.com/website/image/product.brand/45/logo' },
    { name: 'Fandher', logo: 'https://store.tannerherramientas.com/website/image/product.brand/111/logo' },
    { name: 'Ma-Ford', logo: 'https://hertool.com.mx/wp-content/uploads/2017/04/MAFord.png' },
    { name: 'Bosch', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Bosch_logo.png' },
    { name: 'LMT', logo: 'https://getlogovector.com/wp-content/uploads/2020/04/lmt-tools-logo-vector.png' },
    { name: 'Noga', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDo5lBasl2quKnB60Sy1d2ma8ous-W_Ed4Ow&s' },
    { name: 'Starrett', logo: 'https://hecortindustrial.com/wp-content/uploads/2024/12/logo-starret.png' },
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
    <div className="bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-50 text-slate-800 w-full min-h-screen relative overflow-hidden">
      {/* Spotlight Effect */}
      <ACSpotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(15, 23, 42, 0.25)" />
      
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
              title={"Venta de Máquinas, Herramientas y Accesorios Industriales."}
              subtitle={"Más de 20 años de experiencia en el ramo. Ofrecemos equipos, herramientas y accesorios industriales de la más alta calidad y marcas reconocidas para optimizar tus operaciones."}
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
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/5 via-transparent to-slate-800/5 rounded-3xl"></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 md:px-6 z-10">
              <RBStatCard 
                icon={<IconExperience />} 
                value="20+" 
                label="Años de Experiencia"
                trend={{ value: "Desde 2004", isPositive: true }}
                gradient="from-slate-700 to-slate-900"
              />
              <RBStatCard 
                icon={<IconBrands />} 
                value="50+" 
                label="Marcas de Prestigio"
                trend={{ value: "Cleveland, Mitutoyo, OSG...", isPositive: true }}
                gradient="from-slate-800 to-blue-950"
              />
              <RBStatCard 
                icon={<IconClients />} 
                value="100+" 
                label="Clientes Satisfechos"
                trend={{ value: "Industria metal-mecánica", isPositive: true }}
                gradient="from-blue-900 to-slate-900"
              />
            </div>
          </section>

          {/* Sección de BentoGrid - Características Visuales */}
          <section className="relative px-2" aria-labelledby="capabilities-heading">
            <RBAnimatedText animation="fadeInUp" className="text-center mb-8 md:mb-12">
              <RBBadge variant="primary" className="mb-4">Nuestras Capacidades</RBBadge>
              <h2 id="capabilities-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4 px-4">
                Todo lo que Necesitas en un Solo Lugar
              </h2>
            </RBAnimatedText>
            
            <ACBentoGrid className="px-2 md:px-6">
              <ACBentoGridItem
                title="Maquinaria CNC de Última Generación"
                description="Tornos y fresadoras con tecnología de punta para fabricación de alta precisión"
                header={
                  <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1711418235334-8895331a6cf9?q=80&w=1740&auto=format&fit=crop" 
                      alt="Maquinaria CNC" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                }
                className="md:col-span-2"
              />
              <ACBentoGridItem
                title="Herramientas de Corte Especializadas"
                description="Fresas, insertos y herramientas de carburo"
                header={
                  <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden relative bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1602223114290-ba6de2938acc?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Herramientas de Corte" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                }
              />
              <ACBentoGridItem
                title="Sistemas de Medición Precisos" 
                description="Calibradores digitales, micrómetros y equipos certificados"
                header={
                  <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden relative bg-white flex items-center justify-center p-4">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Mitutoyo_company_logo.svg/1200px-Mitutoyo_company_logo.svg.png" 
                      alt="Mitutoyo Logo" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                }
              />
              <ACBentoGridItem
                title="Accesorios de Sujeción"
                description="Prensas, chucks hidráulicos y portaherramientas"
                header={
                  <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden relative bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1662097513309-bb191405bf28?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Accesorios de Sujeción" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                }
                className="md:col-span-2"
              />
              {/* <ACBentoGridItem
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
              /> */}
            </ACBentoGrid>
          </section>

          {/* Sección de Distribuidor Autorizado */}
          <section className="relative py-8 md:py-12 px-2" aria-labelledby="distributor-heading">
            <RBAnimatedText animation="fadeInUp" className="text-center mb-8 md:mb-12">
              <RBBadge variant="warning" className="mb-4">Distribuidor Autorizado</RBBadge>
              <h2 id="distributor-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4 px-4">
                Representantes Oficiales de Marcas Líderes
              </h2>
              <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto px-4">
                Contamos con la certificación y respaldo directo de las mejores marcas del mercado
              </p>
            </RBAnimatedText>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 md:px-6 max-w-6xl mx-auto">
              {/* Royco */}
              <div className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-32 h-20 md:w-40 md:h-24 rounded-xl flex items-center justify-center">
                      <img src="https://omic.us/wp-content/uploads/logo-osg.png" alt="Royco Logo" className="max-w-full max-h-full object-contain p-2" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Distribuidor Oficial
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">ROYCO</h3>
                    <p className="text-slate-600 text-sm md:text-base">Herramientas de corte y accesorios industriales de alta calidad</p>
                  </div>
                </div>
              </div>

              {/* Austromex */}
              <div className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-32 h-20 md:w-40 md:h-24 rounded-xl flex items-center justify-center">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS6CI1UpcfF04j5ZsKcdn8Bv7pLolZhifQpw&s" alt="Austromex Logo" className="max-w-full max-h-full object-contain p-2" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Sub - Distribuidor Oficial
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">AUSTROMEX</h3>
                    <p className="text-slate-600 text-sm md:text-base">Soluciones integrales en soldadura y abrasivos industriales</p>
                  </div>
                </div>
              </div>

              {/* Fandher */}
              <div className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-32 h-20 md:w-40 md:h-24 rounded-xl flex items-center justify-center">
                      <img src="https://store.tannerherramientas.com/website/image/product.brand/111/logo" alt="Fandher Logo" className="max-w-full max-h-full object-contain p-2" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Distribuidor Oficial
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">FANDHER</h3>
                    <p className="text-slate-600 text-sm md:text-base">Herramientas de sujeción y portaherramientas de precisión</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonios con Carrusel Infinito */}
          <section className="relative py-8 md:py-12 px-2" aria-labelledby="testimonials-heading">
            <RBAnimatedText animation="fadeInUp" className="text-center mb-8 md:mb-12">
              <RBBadge variant="success" className="mb-4">Testimonios</RBBadge>
              <h2 id="testimonials-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4 px-4">
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
              <h2 id="features-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4 px-4">
                Compromiso con la Excelencia
              </h2>
              <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto px-4">
                Nuestra trayectoria nos respalda como el socio ideal para tus necesidades industriales
              </p>
            </RBAnimatedText>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 md:px-6">
              <ACFeature 
                icon={<IconExperience />} 
                title="Excelentes Tiempos de Entrega" 
                description="Nos distinguimos por trabajar con tiempos de entrega rápidos, precios accesibles y alta disponibilidad de productos." 
              />
              <ACFeature 
                icon={<IconBrands />} 
                title="Marcas de Prestigio" 
                description="Cleveland, Bison, Royco, Mitutoyo, Austromex, OSG, Pinacho, Boehlerit y muchas más marcas reconocidas." 
              />
              <ACFeature 
                icon={<IconClients />} 
                title="Atención Inmediata" 
                description="Más de 20 años de experiencia nos han convertido en los mejores en venta de máquinas y herramientas industriales." 
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
            
            <RBGlassCard className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 text-white border-none shadow-2xl">
              <RBAnimatedText animation="fadeInUp" className="relative z-10 text-center py-8 md:py-12 px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-gradient-x bg-gradient-to-r from-white via-slate-300 to-white bg-clip-text text-transparent">
                  ¿Listo para impulsar tu producción?
                </h2>
                <p className="text-slate-300 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                  Descubre cómo nuestras soluciones pueden optimizar tus procesos industriales con tecnología de vanguardia
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <Link href="/products">
                    <ACHoverBorderGradient
                      containerClassName="rounded-lg w-full sm:w-auto"
                      className="bg-white text-slate-900 hover:bg-slate-100 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg shadow-xl font-semibold w-full sm:w-auto"
                    >
                      Explorar Productos ✨
                    </ACHoverBorderGradient>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <RBButton variant="outline" className="border-slate-400 text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full">
                      Contactar Ahora
                    </RBButton>
                  </Link>
                </div>
              </RBAnimatedText>
              
              {/* Partículas de fondo */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-slate-400 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-slate-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </RBGlassCard>
          </section>

          {/* Sliders de Logos - Sección Mejorada con Aceternity */}
          <section className="relative py-12 md:py-16 overflow-hidden px-2" aria-labelledby="partners-heading">
            {/* Fondo decorativo con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-100 rounded-2xl md:rounded-3xl"></div>
            
            {/* Spotlight efecto */}
            <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-slate-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-slate-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-12 md:space-y-16">
              {/* Header de la sección */}
              <RBAnimatedText animation="fadeInUp" className="text-center">
                <RBBadge variant="primary" className="mb-4 md:mb-6 animate-float">Nuestros Socios</RBBadge>
                <h2 id="partners-heading" className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 bg-clip-text text-transparent mb-4 px-4">
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
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
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
              {/* <div className="space-y-4 md:space-y-6">
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
              </div> */}

              {/* CTA para ver más */}
              <RBAnimatedText animation="scaleIn" delay={400} className="flex justify-center pt-8 md:pt-12 px-2">
                <Link href="/products" className="w-full sm:w-auto">
                  <ACHoverBorderGradient
                    containerClassName="rounded-xl shadow-xl hover:shadow-2xl transition-shadow w-full sm:w-auto"
                    className="px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-blue-950 transition-all w-full sm:w-auto"
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

