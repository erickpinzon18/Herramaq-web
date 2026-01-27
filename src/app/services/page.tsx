import ServicesPage from "../pages/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Productos y Servicios | HERRAMAQ - Herramientas Industriales Querétaro",
  description:
    "Catálogo completo de herramientas y maquinaria industrial en HERRAMAQ. Maquinaria: Tornos, Fresadoras, Taladros. Herramientas de Corte: Brocas, Cortadores, Insertos, Machuelos. Accesorios: Chucks, Portaherramientas. Equipos de Medición: Calibradores, Micrómetros Mitutoyo. 20+ años de experiencia en Querétaro.",
  keywords: [
    "tornos industriales Querétaro",
    "fresadoras México",
    "taladros industriales",
    "brocas Cleveland",
    "cortadores industriales",
    "insertos de carburo",
    "machuelos Greenfield",
    "chucks Bison",
    "portaherramientas",
    "calibradores digitales Mitutoyo",
    "micrómetros de precisión",
    "indicadores de carátula",
    "abrasivos Austromex",
    "discos de corte Tenazit",
    "llaves Allen Bondhus",
    "herramientas OSG",
    "herramientas Royco",
    "herramientas Cleveland",
    "Dremel accesorios",
    "Lenox sierras cinta",
    "equipos de medición industrial",
    "herramientas de corte Querétaro",
    "HERRAMAQ servicios",
    "San Juan del Río herramientas",
    "distribuidor herramientas industriales",
  ],
  openGraph: {
    title: "Productos y Servicios - Herramientas Industriales | HERRAMAQ",
    description:
      "Catálogo completo de maquinaria, herramientas de corte, accesorios y equipos de medición. Marcas líderes: Cleveland, Mitutoyo, Bison, Austromex, OSG. 20+ años de experiencia.",
    url: "https://herramaq.mx/services",
    siteName: "HERRAMAQ",
    images: [
      {
        url: "/LogoFull.jpeg",
        width: 800,
        height: 200,
        alt: "HERRAMAQ - Catálogo de Herramientas y Maquinaria Industrial",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Productos y Servicios | HERRAMAQ",
    description:
      "Tornos, fresadoras, brocas, insertos, equipos de medición y más. 20+ años de experiencia en herramientas industriales.",
    images: ["/LogoFull.jpeg"],
  },
  alternates: {
    canonical: "https://herramaq.mx/services",
  },
};

export default function Services() {
  return <ServicesPage />;
}
