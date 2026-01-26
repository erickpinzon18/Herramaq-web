import ServicesPage from "../pages/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios de Maquinado CNC de Precisión | Herramaq Querétaro",
  description:
    "Servicios profesionales de maquinado CNC en Querétaro: Torno CNC alta precisión, fresado 5 ejes, tratamientos térmicos, control de calidad dimensional y diseño de herramentales. 30+ años de experiencia. Certificaciones ISO 9001 y AS9100. Proveedores de BOSCH, TREMEC, Safran.",
  keywords: [
    "maquinado CNC Querétaro",
    "torno CNC precisión",
    "fresado 5 ejes México",
    "centro de maquinado CNC",
    "tratamientos térmicos Querétaro",
    "temple y revenido",
    "nitrurado de piezas",
    "control de calidad CMM",
    "metrología dimensional",
    "diseño de herramentales",
    "manufactura de precisión",
    "maquinado aeroespacial",
    "maquinado automotriz",
    "tolerancias micrométricas",
    "acabados superficiales espejo",
    "certificación ISO 9001",
    "certificación AS9100",
    "maquinado titanio",
    "maquinado Inconel",
    "ingeniería CAD/CAM",
    "producción en serie Querétaro",
    "prototipos CNC",
    "proveedor BOSCH México",
    "proveedor TREMEC",
    "maquinado médico",
    "maquinado energético",
    "San Juan del Río servicios",
  ],
  openGraph: {
    title: "Servicios de Maquinado CNC - Precisión Certificada | Herramaq",
    description:
      "Torno CNC, fresado 5 ejes, tratamientos térmicos y control de calidad. 30+ años sirviendo a la industria automotriz y aeroespacial.",
    url: "https://herramaq.mx/servicios",
    siteName: "Herramaq",
    images: [
      {
        url: "/og-image-services.jpg",
        width: 1200,
        height: 630,
        alt: "Servicios de Maquinado CNC Herramaq - Torno y Fresado de Precisión",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de Maquinado CNC de Precisión | Herramaq",
    description:
      "Torno CNC, fresado 5 ejes, tratamientos térmicos. Certificaciones ISO 9001 y AS9100. 30+ años de experiencia.",
    images: ["/twitter-image-services.jpg"],
  },
  alternates: {
    canonical: "https://herramaq.mx/servicios",
  },
};

export default function Services() {
  return <ServicesPage />;
}
