"use client";

import React from "react";
import Image from "next/image";
import { Header, Footer, RBButton, RBBadge } from "../components";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Timeline } from "@/components/ui/timeline";
import { ACSpotlight } from "../components/aceternity/Spotlight";
import { ACMeteors } from "../components/aceternity/Meteors";
import { ACBackgroundBeams } from "../components/aceternity/BackgroundBeams";
import { ACHoverBorderGradient } from "../components/aceternity/HoverBorderGradient";

// --- Iconos SVG ---
const CheckCircleIcon = () => (
  <svg
    className="w-6 h-6 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ToolsIcon = () => (
  <svg
    className="w-8 h-8 text-slate-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const SparklesIcon = () => (
  <svg
    className="w-8 h-8 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

// --- Datos para Apple Cards Carousel (Productos Principales) ---
const servicesCards = [
  {
    category: "Maquinaria",
    title: "Tornos y Fresadoras",
    src: "https://www.mecanizadosgarrigues.es/wp-content/uploads/2019/03/tornos-cnc.jpg",
    content: (
      <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
          <span className="font-bold text-blue-400">
            Maquinaria de precisión
          </span>{" "}
          para tu taller. Ofrecemos tornos, fresadoras y taladros de las mejores
          marcas como Pinacho, garantizando calidad y alto rendimiento en todas
          tus operaciones.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <RBBadge variant="primary">Tornos</RBBadge>
          <RBBadge variant="success">Fresadoras</RBBadge>
          <RBBadge variant="info">Taladros</RBBadge>
        </div>
      </div>
    ),
  },
  {
    category: "Herramientas de Corte",
    title: "Cortadores, Brocas e Insertos",
    src: "https://www.jpherramientasindustriales.com/wp-content/uploads/2025/12/cortadores-brocas-e-insertos.png",
    content: (
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
          <span className="font-bold text-yellow-400">
            Herramientas de corte de alta calidad
          </span>{" "}
          de marcas reconocidas como Cleveland, OSG, Greenfield y Master-Cut.
          Cortadores, brocas, insertos y machuelos para satisfacer todas tus
          necesidades industriales.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <RBBadge variant="primary">Cortadores</RBBadge>
          <RBBadge variant="success">Brocas</RBBadge>
          <RBBadge variant="info">Insertos</RBBadge>
          <RBBadge variant="warning">Machuelos</RBBadge>
        </div>
      </div>
    ),
  },
  {
    category: "Accesorios",
    title: "Chucks, Boquillas y Porta Boquillas",
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
    content: (
      <div className="bg-gradient-to-br from-orange-900 to-red-900 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
          <span className="font-bold text-orange-300">
            Accesorios industriales
          </span>{" "}
          de marcas como Bison, Vertex e Incor. Chucks, boquillas, porta
          boquillas, cabezales y broqueros para complementar tu maquinaria con
          la mejor calidad.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <RBBadge variant="primary">Chucks - Bison</RBBadge>
          <RBBadge variant="success">Boquillas</RBBadge>
          <RBBadge variant="info">Vertex</RBBadge>
        </div>
      </div>
    ),
  },
  {
    category: "Medición",
    title: "Equipos de Medición de Precisión",
    src: "https://techmasterdemexico.com/wp-content/uploads/Caliper.jpg",
    content: (
      <div className="bg-gradient-to-br from-green-900 to-teal-900 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
          <span className="font-bold text-green-300">
            Instrumentos de medición
          </span>{" "}
          de alta precisión de marcas líderes como Mitutoyo e Insize. Garantiza
          la calidad de tus piezas con equipos de medición confiables y
          precisos.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <RBBadge variant="primary">Mitutoyo</RBBadge>
          <RBBadge variant="success">Insize</RBBadge>
        </div>
      </div>
    ),
  },
  {
    category: "Consumibles",
    title: "Abrasivos y Productos de Mantenimiento",
    src: "https://www.lamuno.com/wp-content/uploads/2024/02/abrasivos-1.jpg",
    content: (
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-white text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
          <span className="font-bold text-purple-300">
            Productos consumibles
          </span>{" "}
          de calidad. Abrasivos Austromex, discos de corte Lenox, solubles y
          todo lo necesario para mantener tu operación funcionando de manera
          óptima.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <RBBadge variant="primary">Austromex</RBBadge>
          <RBBadge variant="success">Lenox</RBBadge>
          <RBBadge variant="info">Dremel</RBBadge>
        </div>
      </div>
    ),
  },
];

// --- Datos para Testimonios Animados ---
const testimonials = [
  {
    quote:
      "Herramaq siempre tiene el producto que necesito en inventario. Su atención es excelente y los tiempos de entrega son muy rápidos.",
    name: "Carlos Ramírez",
    designation: "Propietario, Taller Mecánico Industrial",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    quote:
      "La calidad de las herramientas y accesorios que venden es de primera. Trabajamos con marcas como OSG y Mitutoyo gracias a ellos.",
    name: "María González",
    designation: "Gerente de Compras, Industria Metal-Mecánica",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    quote:
      "Más de 20 años en el mercado respaldan su experiencia. Son nuestra primera opción para herramientas industriales en Querétaro.",
    name: "José Luis Hernández",
    designation: "Director de Operaciones, Manufactura Automotriz",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
  {
    quote:
      "Precios accesibles y productos de marca garantizada. Herramaq es un socio confiable para nuestro negocio.",
    name: "Ana Martínez",
    designation: "Administradora, Taller de Precisión",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
];

// --- Datos para Timeline (Historia de la Empresa) ---
const timelineData = [
  {
    title: "1999",
    content: (
      <div>
        <p className="text-slate-700 text-base md:text-lg font-normal mb-4">
          Fundación de Herramaq en San Juan del Río, Querétaro. Iniciamos con un
          local en el centro con pocas piezas y poco inventario, pero con la
          visión de convertirnos en líderes del ramo.
        </p>
        <div className="flex gap-2 flex-wrap mb-4">
          <RBBadge variant="primary">San Juan del Río</RBBadge>
          <RBBadge variant="info">Querétaro</RBBadge>
        </div>
      </div>
    ),
  },
  {
    title: "2003",
    content: (
      <div>
        <p className="text-slate-700 text-base md:text-lg font-normal mb-4">
          OSG ROYCO nos certificó como distribuidores oficiales en México,
          consolidando nuestra posición como proveedores de herramientas de alta
          calidad.
        </p>
        <div className="flex gap-2 flex-wrap mb-4">
          <RBBadge variant="success">Distribuidor Autorizado</RBBadge>
          <RBBadge variant="info">OSG ROYCO</RBBadge>
        </div>
      </div>
    ),
  },
  {
    title: "2010",
    content: (
      <div>
        <p className="text-slate-700 text-base md:text-lg font-normal mb-4">
          Cambio de instalaciones al domicilio actual en Calle Verano 11,
          Betania, y expansión significativa del inventario a más de 5,000
          productos.
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-center gap-2 text-slate-700">
            <CheckCircleIcon />
            Nuevas instalaciones más amplias
          </li>
          <li className="flex items-center gap-2 text-slate-700">
            <CheckCircleIcon />
            Inventario expandido a 5,000+ productos
          </li>
          <li className="flex items-center gap-2 text-slate-700">
            <CheckCircleIcon />
            Más marcas de prestigio disponibles
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div>
        <p className="text-slate-700 text-base md:text-lg font-normal mb-4">
          Hoy contamos con más de 200 clientes, 6,000 productos en inventario y
          somos distribuidores y subdistribuidores autorizados de marcas
          reconocidas de alta calidad en toda la industria metal-mecánica.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-slate-700">200+</p>
            <p className="text-slate-600 text-sm">Clientes</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-green-600">6,000+</p>
            <p className="text-slate-600 text-sm">Productos en Inventario</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-purple-600">20+</p>
            <p className="text-slate-600 text-sm">Años de Experiencia</p>
          </div>
        </div>
      </div>
    ),
  },
];

// --- Datos de productos ---
const productosColumn1 = [
  "Tornos",
  "Taladros",
  "Fresadoras",
  "Chucks",
  "Cabezal",
  "Prensas",
  "Discos de corte",
  "Soluble",
  "Cortadores",
  "Machuelos",
  "Brocas",
  "Insertos",
];

const productosColumn2 = [
  "Llaves Allen",
  "Moleteadores",
  "Boquillas",
  "Porta boquillas",
  "Equipos de medición",
  "Abrasivos",
  "Equipos de seguridad",
  "Broquero",
  "Tarrajas",
  "Mototool",
  "Puntos giratorios",
];

const marcas = [
  "Cleveland",
  "Bison",
  "Royco",
  "Mitutoyo",
  "Austromex",
  "Lenox",
  "Jacobs",
  "Incor",
  "Vertex",
  "Bondhus",
  "Boehlerit",
  "OSG",
  "Pinacho",
  "Greenfield",
  "Dremel",
  "GLG",
  "Loc-Line",
  "Insize",
  "Master-Cut",
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
        <ACSpotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#94a3b8"
        />
        <ACMeteors number={30} />

        <div className="relative z-10 w-full px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Venta de Máquinas, Herramientas y Accesorios Industriales
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Más de 20 años de experiencia ofreciendo equipos, herramientas y
              accesorios industriales de la más alta calidad y de marcas
              reconocidas. ¡Somos tu mejor opción en San Juan del Río,
              Querétaro!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ACHoverBorderGradient>
                <a
                  href="https://wa.me/5214272909175?text=%C2%A1Hola!%20Vi%20tu%20sitio%20web,%20%C2%BFme%20podr%C3%ADas%20dar%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20herramientas%20que%20manejas?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-semibold bg-slate-800 text-white hover:bg-slate-100 hover:text-slate-900 px-8 py-4 text-lg rounded-lg transition-colors duration-300"
                >
                  Solicitar Cotización por WhatsApp
                </a>
              </ACHoverBorderGradient>
              <RBButton
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
              >
                <a href="tel:4272725663">Llamar: 427-272-5663</a>
              </RBButton>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Productos Destacados */}
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
              Nuestros Productos
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Contamos con una gran variedad de herramientas y accesorios
              industriales de las mejores marcas
            </p>
          </div>
          <Carousel items={cards} />
        </div>
      </section>

      {/* Sección de Lista de Productos y Marcas */}
      <section className="w-full py-12 md:py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
              Catálogo Completo
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Conoce todos los productos que tenemos disponibles para ti
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Columna de Productos */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <ToolsIcon />
                <h3 className="text-2xl font-bold text-slate-800">
                  Herramientas y Accesorios
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ul className="space-y-3">
                  {productosColumn1.map((producto, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <CheckCircleIcon />
                      <span>{producto}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {productosColumn2.map((producto, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <CheckCircleIcon />
                      <span>{producto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Columna de Marcas */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <SparklesIcon />
                <h3 className="text-2xl font-bold text-slate-800">
                  Marcas de Prestigio
                </h3>
              </div>
              <p className="text-slate-600 mb-6">
                Trabajamos de la mano con marcas reconocidas en la industria
                metal-mecánica:
              </p>
              <div className="flex flex-wrap gap-2">
                {marcas.map((marca, index) => (
                  <RBBadge
                    key={index}
                    variant={
                      index % 4 === 0
                        ? "primary"
                        : index % 4 === 1
                        ? "success"
                        : index % 4 === 2
                        ? "info"
                        : "warning"
                    }
                  >
                    {marca}
                  </RBBadge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - Historia de la Empresa */}
      <section className="w-full py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Nuestra Historia
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Más de 20 años de evolución, crecimiento y compromiso con la
              excelencia
            </p>
          </div>
          <Timeline data={timelineData} />
        </div>
      </section>

      {/* Animated Testimonials */}
      {/* <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              La confianza de más de 200 clientes nos respalda
            </p>
          </div>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </section> */}

      {/* Información de Contacto */}
      <section className="w-full py-12 md:py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
              Visítanos en San Juan del Río
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Estamos listos para atenderte con la mejor calidad y servicio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Dirección */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Dirección
              </h3>
              <p className="text-slate-600">
                Calle Verano 11, Betania
                <br />
                San Juan del Río, QRO
                <br />
                C.P. 76807
              </p>
            </div>

            {/* Horario */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Horario</h3>
              <p className="text-slate-600">
                Lun - Vie: 08:00 - 19:00
                <br />
                Sáb: 09:00 - 13:00
                <br />
                Dom: Cerrado
              </p>
            </div>

            {/* Contacto */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Contacto
              </h3>
              <p className="text-slate-600">
                <a href="tel:4272725663" className="hover:text-blue-600">
                  427-272-5663
                </a>
                <br />
                <a href="tel:4272748351" className="hover:text-blue-600">
                  427-274-8351
                </a>
                <br />
                <a
                  href="mailto:herramaq@prodigy.net.mx"
                  className="hover:text-blue-600"
                >
                  herramaq@prodigy.net.mx
                </a>
              </p>
            </div>
          </div>

          {/* Formas de Pago */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Formas de Pago
            </h3>
            <div className="flex justify-center gap-4">
              <RBBadge variant="primary">Efectivo</RBBadge>
              <RBBadge variant="info">VISA</RBBadge>
              <RBBadge variant="warning">Mastercard</RBBadge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final con Background Beams */}
      <section className="relative w-full py-16 md:py-20 bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
        <ACBackgroundBeams className="opacity-30" />

        <div className="relative z-10 w-full px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            ¿Listo para Equipar tu Taller con lo Mejor?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            Contáctanos hoy y descubre por qué somos la mejor opción en venta de
            máquinas, herramientas y accesorios industriales en San Juan del
            Río, Querétaro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ACHoverBorderGradient>
              <a
                href="https://wa.me/5214272909175?text=%C2%A1Hola!%20Vi%20tu%20sitio%20web,%20%C2%BFme%20podr%C3%ADas%20dar%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20herramientas%20que%20manejas?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-slate-800 justify-center font-semibold hover:bg-slate-100 hover:text-slate-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-lg transition-colors duration-300"
              >
                WhatsApp: Cotización Rápida
              </a>
            </ACHoverBorderGradient>
            <RBButton
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold"
            >
              <a href="mailto:herramaq@prodigy.net.mx">Enviar Email</a>
            </RBButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
