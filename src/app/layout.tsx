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
      "Herramaq - Maquinaria, Herramientas y Servicios Industriales en Querétaro",
    template: "%s | Herramaq",
  },
  description:
    "Herramaq: Líder en venta de maquinaria CNC, herramientas de corte y servicios de maquinado en San Juan del Río, Querétaro. Más de 15 años de experiencia industrial.",
  keywords: [
    "maquinaria industrial",
    "herramientas CNC",
    "servicios de maquinado",
    "tornos CNC",
    "fresadoras",
    "herramientas de corte",
    "Querétaro",
    "San Juan del Río",
    "INDUMAC",
    "PRECITOOLS",
    "FERROTEC",
    "SANDVIK",
    "MITUTOYO",
    "NORTON",
    "equipos industriales",
    "manufactura",
    "metrología",
    "sujeción industrial",
    "abrasivos industriales",
    "carburo de tungsteno",
    "herramientas de precisión",
    "maquinado de precisión",
    "industria automotriz",
    "industria aeroespacial",
  ],
  authors: [{ name: "Herramaq" }],
  creator: "Herramaq",
  publisher: "Herramaq",
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
    siteName: "Herramaq",
    title:
      "Herramaq - Maquinaria, Herramientas y Servicios Industriales en Querétaro",
    description:
      "Líder en venta de maquinaria CNC, herramientas de corte y servicios de maquinado en San Juan del Río, Querétaro. Más de 15 años de experiencia.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Herramaq - Soluciones Industriales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Herramaq - Maquinaria y Herramientas Industriales",
    description:
      "Líder en venta de maquinaria CNC, herramientas de corte y servicios de maquinado en Querétaro.",
    images: ["/twitter-image.jpg"],
    creator: "@herramaq",
  },
  verification: {
    google: "google-site-verification-code-here",
  },
  alternates: {
    canonical: "https://herramaq.mx",
  },
  category: "Industria y Manufactura",
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

        {/* Favicon y app icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e40af" />

        {/* Schema.org structured data para Google */}
        <meta
          name="google-site-verification"
          content="s7SHsRJMa0xNkVvdEtxwwzLj5SmS6HCWUVZmxOeEctA"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Herramaq",
              description:
                "Maquinaria, herramientas y servicios industriales de alta precisión",
              url: "https://herramaq.mx",
              telephone: "+52-427-123-4567",
              email: "herramaq@prodigy.net.mx",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Central 123, Parque Industrial",
                addressLocality: "San Juan del Río",
                addressRegion: "Querétaro",
                postalCode: "76800",
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
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "13:00",
                },
              ],
              priceRange: "$$",
              image: "https://herramaq.mx/og-image.jpg",
              sameAs: [
                "https://www.facebook.com/herramaq",
                "https://www.linkedin.com/company/herramaq",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "200",
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
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
