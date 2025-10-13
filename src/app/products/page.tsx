import ProductsPage from '../pages/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Productos - Herramientas de Corte y Maquinaria CNC | Herramaq",
  description: "Catálogo completo de herramientas de corte de precisión, fresas de carburo, insertos de torneado, calibradores digitales, prensas de sujeción y más. Marcas líderes: PRECITOOLS, SANDVIK, MITUTOYO, NORTON, FERROTEC. Envíos a todo Querétaro y México.",
  keywords: [
    "herramientas de corte Querétaro",
    "fresas de carburo México",
    "insertos de torneado CNMG",
    "calibradores digitales MITUTOYO",
    "micrómetros de precisión",
    "prensas de sujeción CNC",
    "chuck hidráulico CAT40",
    "brocas de cobalto HSS",
    "discos de desbaste NORTON",
    "ruedas flap abrasivas",
    "machuelos de corte",
    "PRECITOOLS México",
    "SANDVIK herramientas",
    "FERROTEC prensas",
    "MITUTOYO calibradores",
    "herramientas de medición certificadas",
    "abrasivos industriales",
    "portaherramientas CNC",
    "herramientas para torno",
    "herramientas para fresadora",
    "sujeción y fijación industrial",
    "comprar herramientas Querétaro",
    "distribuidor SANDVIK México",
    "distribuidor MITUTOYO Querétaro"
  ],
  openGraph: {
    title: "Productos - Herramientas Industriales de Precisión | Herramaq",
    description: "Descubre nuestro catálogo de herramientas de corte, medición y sujeción de las mejores marcas. Fresas, insertos, calibradores y más en stock.",
    url: "https://herramaq.com/productos",
    siteName: "Herramaq",
    images: [
      {
        url: "/og-image-products.jpg",
        width: 1200,
        height: 630,
        alt: "Catálogo de Productos Herramaq - Herramientas de Corte",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Productos - Herramientas de Corte y Medición | Herramaq",
    description: "Catálogo completo de herramientas industriales de precisión. Marcas líderes en stock.",
    images: ["/twitter-image-products.jpg"],
  },
  alternates: {
    canonical: "https://herramaq.com/productos",
  },
};

export default function Products() {
  return <ProductsPage />;
}
