import HomePage from './pages/home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Herramaq - Maquinaria CNC, Herramientas y Servicios de Maquinado en Querétaro",
  description: "Herramaq en San Juan del Río, Querétaro. Venta de maquinaria CNC (tornos, fresadoras), herramientas de corte especializadas, sistemas de medición y servicios de maquinado de alta precisión. 15+ años de experiencia, 50+ marcas reconocidas, 200+ clientes satisfechos.",
  keywords: [
    "Herramaq",
    "maquinaria CNC Querétaro",
    "tornos CNC San Juan del Río",
    "fresadoras CNC México",
    "herramientas de corte",
    "fresas de carburo",
    "insertos de torneado",
    "servicios de maquinado",
    "maquinado de precisión Querétaro",
    "INDUMAC",
    "PRECITOOLS",
    "FERROTEC",
    "SANDVIK Querétaro",
    "MITUTOYO México",
    "NORTON abrasivos",
    "calibradores digitales",
    "micrómetros de precisión",
    "prensas de sujeción",
    "chuck hidráulico",
    "portaherramientas CNC",
    "manufactura industrial",
    "industria automotriz Querétaro",
    "industria aeroespacial México",
    "BOSCH proveedor",
    "TREMEC herramientas",
    "SAFRAN maquinado",
    "equipos de medición certificados",
    "soluciones industriales",
    "maquinaria industrial Querétaro"
  ],
  openGraph: {
    title: "Herramaq - Soluciones Industriales de Precisión en Querétaro",
    description: "Maquinaria CNC, herramientas de corte y servicios de maquinado industrial. 15+ años sirviendo a la industria automotriz y aeroespacial en Querétaro.",
    url: "https://herramaq.com",
    siteName: "Herramaq",
    images: [
      {
        url: "/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Herramaq - Maquinaria y Herramientas Industriales",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Herramaq - Maquinaria CNC y Herramientas Industriales",
    description: "15+ años de experiencia en maquinaria CNC, herramientas de corte y servicios de maquinado en Querétaro.",
    images: ["/twitter-image-home.jpg"],
  },
  alternates: {
    canonical: "https://herramaq.com",
  },
};

export default function Home() {
  return <HomePage />;
}
