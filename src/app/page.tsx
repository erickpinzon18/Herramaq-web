import HomePage from "./pages/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "HERRAMAQ | Herramientas, Maquinaria y Accesorios Industriales en Querétaro",
  description:
    "HERRAMAQ: Tu proveedor de herramientas y maquinaria industrial en San Juan del Río, Querétaro. Más de 20 años de experiencia. Tornos, fresadoras, taladros, brocas, insertos, chucks, llaves Allen, abrasivos y equipos de medición. Marcas: Cleveland, Mitutoyo, Bison, Austromex, OSG, Pinacho, Dremel, Lenox.",
  keywords: [
    "HERRAMAQ",
    "herramientas industriales Querétaro",
    "maquinaria industrial San Juan del Río",
    "tornos industriales",
    "fresadoras",
    "taladros industriales",
    "brocas Cleveland",
    "insertos de carburo",
    "chucks Bison",
    "equipos de medición Mitutoyo",
    "abrasivos Austromex Tenazit",
    "herramientas OSG",
    "llaves Allen Bondhus",
    "herramientas de corte",
    "ferretería industrial Querétaro",
    "distribuidor herramientas México",
    "machuelos Greenfield",
    "Dremel herramientas",
    "Lenox sierras",
    "proveedor industrial Querétaro",
    "herramientas de precisión",
    "accesorios industriales",
    "venta de herramientas",
  ],
  openGraph: {
    title: "HERRAMAQ - Herramientas y Maquinaria Industrial en Querétaro",
    description:
      "Venta de herramientas, maquinaria y accesorios industriales. Más de 20 años sirviendo a la industria. Tornos, fresadoras, brocas, insertos, equipos de medición y más.",
    url: "https://herramaq.mx",
    siteName: "HERRAMAQ",
    images: [
      {
        url: "/LogoFull.jpeg",
        width: 800,
        height: 200,
        alt: "HERRAMAQ - Máquinas, Herramientas, Accesorios Industriales",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HERRAMAQ - Herramientas y Maquinaria Industrial",
    description:
      "20+ años de experiencia en herramientas, maquinaria y accesorios industriales en San Juan del Río, Querétaro.",
    images: ["/LogoFull.jpeg"],
  },
  alternates: {
    canonical: "https://herramaq.mx",
  },
};

export default function Home() {
  return <HomePage />;
}
