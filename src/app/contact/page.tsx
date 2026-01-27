import ContactPage from "../pages/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | HERRAMAQ - Herramientas Industriales San Juan del Río",
  description:
    "Contacta a HERRAMAQ para cotizaciones de herramientas y maquinaria industrial. Teléfonos: (427) 272-5663, (427) 274-8351. Email: herramaq@prodigy.net.mx. WhatsApp: +52 1 427 290 9175. Ubicación: Calle Verano 11, Betania, San Juan del Río, Querétaro. Horario: Lun-Vie 8:00-19:00, Sáb 9:00-13:00.",
  keywords: [
    "contacto HERRAMAQ",
    "teléfono HERRAMAQ",
    "427 272 5663",
    "427 274 8351",
    "whatsapp HERRAMAQ",
    "herramaq@prodigy.net.mx",
    "cotización herramientas industriales",
    "ubicación HERRAMAQ",
    "San Juan del Río herramientas",
    "Calle Verano Betania",
    "horario HERRAMAQ",
    "solicitar cotización Querétaro",
    "contacto ventas herramientas",
    "distribuidor herramientas Querétaro",
    "asesoría herramientas industriales",
    "visitar tienda herramientas",
    "dirección HERRAMAQ",
    "presupuesto herramientas",
    "atención al cliente HERRAMAQ",
  ],
  openGraph: {
    title: "Contacto - Solicita tu Cotización | HERRAMAQ",
    description:
      "Contáctanos para cotizaciones de herramientas y maquinaria industrial. WhatsApp: +52 1 427 290 9175. San Juan del Río, Querétaro.",
    url: "https://herramaq.mx/contact",
    siteName: "HERRAMAQ",
    images: [
      {
        url: "/LogoFull.jpeg",
        width: 800,
        height: 200,
        alt: "HERRAMAQ - Contacto y Ubicación",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | HERRAMAQ",
    description:
      "Cotizaciones de herramientas industriales. Tel: (427) 272-5663. WhatsApp: +52 1 427 290 9175. San Juan del Río, Querétaro.",
    images: ["/LogoFull.jpeg"],
  },
  alternates: {
    canonical: "https://herramaq.mx/contact",
  },
};

export default function Contact() {
  return <ContactPage />;
}
