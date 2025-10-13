import ContactPage from '../pages/contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contacto - Solicita tu Cotización | Herramaq Querétaro",
  description: "Contacta a Herramaq en San Juan del Río, Querétaro. Solicita cotización de maquinaria CNC, herramientas de corte o servicios de maquinado. Teléfono: (427) 123 4567 | Email: ventas@herramaq.com | Horario: Lunes a Viernes 8:00 AM - 6:00 PM, Sábados 9:00 AM - 1:00 PM.",
  keywords: [
    "contacto Herramaq",
    "cotización maquinaria CNC",
    "solicitar cotización Querétaro",
    "ventas@herramaq.com",
    "teléfono Herramaq",
    "(427) 123 4567",
    "San Juan del Río Querétaro",
    "ubicación Herramaq",
    "horario atención Querétaro",
    "WhatsApp maquinaria industrial",
    "cotización herramientas de corte",
    "presupuesto maquinado CNC",
    "asesoría técnica Querétaro",
    "soporte técnico maquinaria",
    "distribuidores autorizados México",
    "atención personalizada industrial",
    "visita showroom Querétaro",
    "contacto ventas industriales",
    "correo ventas Herramaq",
    "formulario contacto"
  ],
  openGraph: {
    title: "Contacto - Solicita tu Cotización Personalizada | Herramaq",
    description: "¿Necesitas maquinaria CNC, herramientas o servicios de maquinado? Contáctanos. Respuesta en menos de 24 horas.",
    url: "https://herramaq.com/contacto",
    siteName: "Herramaq",
    images: [
      {
        url: "/og-image-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto Herramaq - San Juan del Río, Querétaro",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto - Solicita tu Cotización | Herramaq",
    description: "Contáctanos para cotizaciones y asesoría técnica. Respuesta rápida garantizada.",
    images: ["/twitter-image-contact.jpg"],
  },
  alternates: {
    canonical: "https://herramaq.com/contacto",
  },
};

export default function Contact() {
  return <ContactPage />;
}
