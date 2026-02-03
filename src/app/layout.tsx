import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "./components/ChatWidget";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "HERRAMAQ - Herramientas y Accesorios Industriales en San Juan del Río, Querétaro",
    template: "%s | HERRAMAQ",
  },
  description:
    "HERRAMAQ: Venta de herramientas, maquinaria y accesorios industriales en San Juan del Río, Querétaro. Más de 20 años de experiencia. Marcas líderes: Cleveland, Mitutoyo, Austromex, Bison, OSG, Pinacho. Tornos, fresadoras, brocas, insertos, equipos de medición.",
  keywords: [
    "herramientas industriales Querétaro",
    "maquinaria industrial San Juan del Río",
    "tornos Querétaro",
    "fresadoras México",
    "brocas industriales",
    "insertos de carburo",
    "equipos de medición Mitutoyo",
    "abrasivos Austromex",
    "chucks Bison",
    "herramientas Cleveland",
    "OSG herramientas de corte",
    "llaves Allen",
    "machuelos industriales",
    "HERRAMAQ",
    "herramientas de precisión",
    "accesorios industriales",
    "distribuidor Querétaro",
    "ferretería industrial",
    "proveedor industrial México",
    "herramientas de corte Querétaro",
  ],
  authors: [{ name: "HERRAMAQ" }],
  creator: "HERRAMAQ",
  publisher: "HERRAMAQ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://herramaq.mx",
    siteName: "HERRAMAQ",
    title: "HERRAMAQ - Herramientas y Accesorios Industriales en Querétaro",
    description:
      "Venta de herramientas, maquinaria y accesorios industriales. Más de 20 años sirviendo a la industria en San Juan del Río, Querétaro.",
    images: [
      {
        url: "/LogoFull.jpeg",
        width: 800,
        height: 200,
        alt: "HERRAMAQ - Máquinas, Herramientas, Accesorios Industriales",
      },
      {
        url: "/logo4k.jpeg",
        width: 1200,
        height: 1200,
        alt: "HERRAMAQ Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HERRAMAQ - Herramientas y Accesorios Industriales",
    description:
      "Venta de herramientas, maquinaria y accesorios industriales en San Juan del Río, Querétaro. 20+ años de experiencia.",
    images: ["/LogoFull.jpeg"],
    creator: "@herramaq",
  },
  verification: {
    google: "s7SHsRJMa0xNkVvdEtxwwzLj5SmS6HCWUVZmxOeEctA",
  },
  alternates: {
    canonical: "https://herramaq.mx",
  },
  category: "Industria y Manufactura",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <head>
        {/* Preconnect para mejorar performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <meta name="theme-color" content="#1e3a8a" />

        {/* Schema.org structured data para Google - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://herramaq.mx/#business",
              name: "HERRAMAQ",
              alternateName: "Herramientas y Accesorios Industriales HERRAMAQ",
              description:
                "Venta de herramientas, maquinaria y accesorios industriales. Tornos, fresadoras, taladros, brocas, insertos, equipos de medición y más. Más de 20 años de experiencia.",
              url: "https://herramaq.mx",
              telephone: ["+52-427-272-5663", "+52-427-274-8351"],
              email: "herramaq@prodigy.net.mx",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calle Verano 11, Betania",
                addressLocality: "San Juan del Río",
                addressRegion: "Querétaro",
                postalCode: "76807",
                addressCountry: "MX",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "20.3843",
                longitude: "-100.0382",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "08:00",
                  closes: "19:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "13:00",
                },
              ],
              priceRange: "$$",
              currenciesAccepted: "MXN",
              paymentAccepted: "Efectivo, Visa, Mastercard",
              image: [
                "https://herramaq.mx/LogoFull.jpeg",
                "https://herramaq.mx/logo4k.jpeg",
              ],
              logo: "https://herramaq.mx/LogoFull.jpeg",
              sameAs: ["https://wa.me/5214272909175"],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+52-427-272-5663",
                contactType: "sales",
                availableLanguage: ["Spanish"],
                areaServed: {
                  "@type": "GeoCircle",
                  geoMidpoint: {
                    "@type": "GeoCoordinates",
                    latitude: "20.3843",
                    longitude: "-100.0382",
                  },
                  geoRadius: "100000",
                },
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Catálogo de Herramientas y Maquinaria Industrial",
                itemListElement: [
                  {
                    "@type": "OfferCatalog",
                    name: "Maquinaria",
                    itemListElement: ["Tornos", "Fresadoras", "Taladros"],
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Herramientas de Corte",
                    itemListElement: [
                      "Brocas",
                      "Cortadores",
                      "Insertos",
                      "Machuelos",
                    ],
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Equipos de Medición",
                    itemListElement: [
                      "Calibradores",
                      "Micrómetros",
                      "Indicadores",
                    ],
                  },
                ],
              },
              foundingDate: "1999",
              knowsAbout: [
                "Herramientas industriales",
                "Maquinaria CNC",
                "Equipos de medición",
                "Herramientas de corte",
                "Abrasivos industriales",
              ],
              slogan: "Máquinas, Herramientas, Accesorios Industriales",
            }),
          }}
        />

        {/* Schema.org - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "HERRAMAQ",
              url: "https://herramaq.mx",
              logo: "https://herramaq.mx/LogoFull.jpeg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+52-427-272-5663",
                contactType: "customer service",
                availableLanguage: "Spanish",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calle Verano 11, Betania",
                addressLocality: "San Juan del Río",
                addressRegion: "Querétaro",
                postalCode: "76807",
                addressCountry: "MX",
              },
            }),
          }}
        />

        {/* Schema.org - Website con SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "HERRAMAQ",
              url: "https://herramaq.mx",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://herramaq.mx/products?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          {/* <ChatWidget /> */}
        </AuthProvider>
      </body>
    </html>
  );
}
