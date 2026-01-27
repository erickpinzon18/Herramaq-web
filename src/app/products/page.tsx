import ProductsPage from "../pages/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Catálogo de Productos | HERRAMAQ - Herramientas Industriales Querétaro",
  description:
    "Explora nuestro catálogo de herramientas y maquinaria industrial. Más de 4,000 productos en stock. Brocas Cleveland, insertos Royco, equipos Mitutoyo, abrasivos Austromex, chucks Bison. Envío a todo México. HERRAMAQ San Juan del Río.",
  keywords: [
    "catálogo herramientas industriales",
    "comprar brocas Cleveland",
    "insertos Royco México",
    "calibradores Mitutoyo precio",
    "abrasivos Austromex Querétaro",
    "chucks Bison distribuidor",
    "herramientas TMX",
    "portabrocas Jacobs",
    "llaves Allen Bondhus",
    "machuelos Volkel",
    "herramientas Insize",
    "limas Nicholson",
    "discos Tenazit",
    "herramientas Dremel",
    "sierras Lenox",
    "herramientas de corte OSG",
    "equipo de medición digital",
    "herramientas de precisión",
    "tienda herramientas industriales",
    "venta herramientas Querétaro",
    "distribuidor Cleveland México",
    "proveedor Mitutoyo Querétaro",
  ],
  openGraph: {
    title: "Catálogo de Productos - Herramientas Industriales | HERRAMAQ",
    description:
      "Más de 4,000 productos de herramientas industriales. Marcas líderes: Cleveland, Mitutoyo, Austromex, Bison, OSG, Royco. Envío a todo México.",
    url: "https://herramaq.mx/products",
    siteName: "HERRAMAQ",
    images: [
      {
        url: "/LogoFull.jpeg",
        width: 800,
        height: 200,
        alt: "HERRAMAQ - Catálogo de Productos Industriales",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo de Productos | HERRAMAQ",
    description:
      "+4,000 productos de herramientas industriales. Cleveland, Mitutoyo, Austromex y más. Envío a todo México.",
    images: ["/LogoFull.jpeg"],
  },
  alternates: {
    canonical: "https://herramaq.mx/products",
  },
};

export default function Products() {
  return <ProductsPage />;
}
