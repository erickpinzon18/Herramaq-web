# Herramaq Web - Proyecto Next.js

Sitio web corporativo moderno para Herramaq, empresa líder en San Juan del Río, Querétaro, especializada en la comercialización de máquinas, herramientas y accesorios industriales.

## 🏗️ Estructura del Proyecto

```
herramaq-web/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── reactbits/
│   │   │   │   ├── Button.tsx        # Botón con variantes (primary, ghost, outline)
│   │   │   │   └── Card.tsx          # Contenedor de tarjetas reutilizable
│   │   │   ├── aceternity/
│   │   │   │   ├── Hero.tsx          # Hero section con animaciones
│   │   │   │   ├── FeatureCard.tsx   # Tarjetas de características
│   │   │   │   └── Testimonial.tsx   # Componente de testimonios
│   │   │   ├── shared.tsx            # Header y Footer compartidos
│   │   │   └── index.ts              # Exportaciones centralizadas
│   │   ├── pages/
│   │   │   ├── home.tsx              # Página de inicio (full-width)
│   │   │   ├── products.tsx          # Catálogo de productos
│   │   │   ├── services.tsx          # Servicios de maquinado CNC
│   │   │   └── contact.tsx           # Formulario de contacto con API
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts          # API Route para formulario
│   │   ├── products/page.tsx         # Ruta /products
│   │   ├── services/page.tsx         # Ruta /services
│   │   ├── contact/page.tsx          # Ruta /contact
│   │   ├── page.tsx                  # Ruta / (home)
│   │   ├── layout.tsx                # Layout principal con fuentes
│   │   └── globals.css               # Variables CSS y tema
│   └── lib/
│       └── utils.ts                  # Utilidades (cn helper)
├── public/                           # Archivos estáticos
├── tailwind.config.ts                # Configuración de Tailwind
├── next.config.ts                    # Configuración de Next.js
├── .env.example                      # Variables de entorno ejemplo
└── tsconfig.json                     # Configuración TypeScript
```

## 🚀 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `home.tsx` | Página de inicio con hero, sliders, información |
| `/products` | `products.tsx` | Catálogo completo con filtros y búsqueda |
| `/services` | `services.tsx` | Servicios de maquinado con galerías |
| `/contact` | `contact.tsx` | Formulario de contacto conectado a API |
| `/api/contact` | `route.ts` | Endpoint POST para envío de formularios |

## 🎨 Sistema de Diseño

### Colores Corporativos (Herramaq)

```typescript
// Azul Corporativo
herramaq-blue-500: #0066e6  // Color primario
herramaq-blue-800: #00295c  // Azul oscuro para textos/fondos
herramaq-blue-50:  #e6f0ff  // Azul claro para fondos

// Amarillo Corporativo
herramaq-yellow-500: #ffd700 // Acento amarillo

// Variables HSL en globals.css
--primary: 212 100% 45%       // Azul Herramaq
--foreground: 222.2 84% 4.9%  // Texto oscuro
```

### Tipografía

```typescript
// Fuentes (layout.tsx)
--font-geist-sans: "Geist Sans"
--font-geist-mono: "Geist Mono"

// Escala tipográfica
text-xs   → 0.75rem
text-base → 1rem
text-xl   → 1.25rem
text-3xl  → 1.875rem
text-5xl  → 3rem (headings)
text-7xl  → 4.5rem (hero)
```

### Sombras Personalizadas

```css
shadow-herramaq-sm   → Sombra sutil con tinte azul
shadow-herramaq-md   → Sombra media
shadow-herramaq-lg   → Sombra grande para cards
shadow-herramaq-2xl  → Sombra dramática
```

## 🧩 Componentes Reutilizables

### ReactBits Library

#### `<RBButton>`
```tsx
import { RBButton } from '@/app/components';

<RBButton variant="primary">Texto</RBButton>
<RBButton variant="ghost" size="sm">Texto</RBButton>
<RBButton variant="outline" disabled>Texto</RBButton>

// Props
variant: 'primary' | 'ghost' | 'outline'
size: 'sm' | 'md' | 'lg'
disabled: boolean
onClick: () => void
```

#### `<RBCard>`
```tsx
import { RBCard } from '@/app/components';

<RBCard>
  <h3>Título</h3>
  <p>Contenido</p>
</RBCard>
```

### Aceternity Library

#### `<ACHero>`
```tsx
import { ACHero } from '@/app/components';

<ACHero
  title="Título Principal"
  subtitle="Subtítulo descriptivo"
  ctaText="Botón CTA"
  ctaLink="/ruta"
/>
```

#### `<ACFeatureCard>`
```tsx
import { ACFeatureCard } from '@/app/components';

<ACFeatureCard
  icon={<IconComponent />}
  title="Característica"
  description="Descripción detallada"
/>
```

#### `<ACTestimonial>`
```tsx
import { ACTestimonial } from '@/app/components';

<ACTestimonial
  quote="Testimonio del cliente..."
  author="Nombre Cliente"
  position="Cargo, Empresa"
  rating={5}
/>
```

## 📸 Optimización de Imágenes

Todas las imágenes usan `next/image` para optimización automática:

```tsx
import Image from 'next/image';

// Imagen con fill (requiere contenedor relativo)
<div className="relative h-80">
  <Image
    src="/ruta/imagen.jpg"
    alt="Descripción"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
    priority // Solo para imágenes above the fold
  />
</div>

// Imagen con dimensiones fijas
<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
  className="object-contain"
/>
```

### Dominios Externos Configurados
```typescript
// next.config.ts
remotePatterns: [
  { protocol: 'https', hostname: 'placehold.co' },
  { protocol: 'https', hostname: 'irp.cdn-website.com' }
]
```

## 🔌 API Routes

### POST `/api/contact`

Endpoint para envío de formularios de contacto.

**Request Body:**
```json
{
  "name": "string (requerido)",
  "email": "string (requerido, formato email)",
  "phone": "string (opcional)",
  "company": "string (opcional)",
  "message": "string (requerido)"
}
```

**Respuestas:**
```json
// 200 OK
{
  "success": true,
  "message": "Mensaje enviado correctamente..."
}

// 400 Bad Request
{
  "error": "Nombre, email y mensaje son requeridos"
}

// 500 Internal Server Error
{
  "error": "Error al procesar el formulario..."
}
```

### Configuración de Email

Para habilitar envío real de emails, configura las variables de entorno:

```bash
# .env.local

# Opción 1: Resend (Recomendado)
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=ventas@herramaq.com

# Opción 2: SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=contacto@herramaq.com
```

Luego descomenta el código en `src/app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'contacto@herramaq.com',
  to: process.env.CONTACT_EMAIL,
  subject: `Nuevo contacto de ${body.name}`,
  html: `...` // Ver código completo en route.ts
});
```

## 🎯 Características por Página

### Página de Inicio (/)
- ✅ Hero section con `<ACHero>` component
- ✅ Slider de marcas con imágenes optimizadas
- ✅ Slider de clientes con `CardSlider`
- ✅ Features con `<ACFeatureCard>`
- ✅ Layout full-width (w-full, max-w-none)
- ✅ Animaciones CSS personalizadas

### Página de Productos (/products)
- ✅ Catálogo con filtros por categoría
- ✅ Búsqueda en tiempo real
- ✅ Filtro por marca
- ✅ Imágenes optimizadas con `next/image`
- ✅ ProductCard con efecto hover

### Página de Servicios (/services)
- ✅ Galería de imágenes con `next/image`
- ✅ Testimoniales con `<ACTestimonial>`
- ✅ Grid de logos de clientes
- ✅ Descripción de cada servicio
- ✅ Priorización de imágenes críticas

### Página de Contacto (/contact)
- ✅ Formulario conectado a `/api/contact`
- ✅ Estados: idle, submitting, success, error
- ✅ Validación de email en frontend y backend
- ✅ Loading spinner durante envío
- ✅ Mensajes de éxito/error
- ✅ Auto-limpieza tras envío exitoso
- ✅ Mapa de Google Maps integrado
- ✅ Información de contacto

## 🛠️ Tecnologías

- **Next.js 15** - App Router, API Routes, Image Optimization
- **TypeScript** - Tipado estático completo
- **Tailwind CSS v4** - Utility-first CSS con tema personalizado
- **React 19** - Client components con hooks
- **next/image** - Optimización automática de imágenes
- **next/link** - Navegación optimizada

## 📦 Instalación y Desarrollo

```bash
# Clonar repositorio
git clone [URL]
cd herramaq-web

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus API keys

# Ejecutar en desarrollo
npm run dev
# Abrir http://localhost:3000

# Compilar para producción
npm run build

# Ejecutar en producción
npm start

# Linter y formato
npm run lint
```

## 🚀 Deployment

### Vercel (Recomendado)

1. Push a GitHub/GitLab/Bitbucket
2. Conecta en [vercel.com](https://vercel.com)
3. Configura variables de entorno en Vercel dashboard
4. Deploy automático en cada push

### Otras Plataformas

- **Netlify**: Compatible con Next.js
- **AWS Amplify**: Soporte completo
- **Docker**: Usa Dockerfile incluido

## 🎨 Mejores Prácticas

### Imágenes
- ✅ Siempre usar `<Image>` en lugar de `<img>`
- ✅ Agregar `priority` solo para above-the-fold
- ✅ Usar `fill` + contenedor relativo para responsive
- ✅ Especificar `sizes` para optimizar rendimiento
- ✅ Configurar `remotePatterns` para dominios externos

### Componentes
- ✅ Extraer lógica repetida a componentes reutilizables
- ✅ Usar TypeScript interfaces para todas las props
- ✅ Marcar componentes interactivos con `'use client'`
- ✅ Centralizar exportaciones en `index.ts`

### Estilos
- ✅ Usar variables CSS para colores del tema
- ✅ Preferir utilidades de Tailwind sobre CSS custom
- ✅ Crear variantes en componentes (no inline)
- ✅ Mantener consistencia con `tailwind.config.ts`

### API Routes
- ✅ Validar todas las entradas del usuario
- ✅ Usar `NextResponse.json()` para respuestas
- ✅ Manejar errores con try/catch
- ✅ Loggear errores con `console.error`

## 📝 TODO / Roadmap

- [ ] Integrar CMS (Sanity/Contentful) para gestión de contenido
- [ ] Agregar más productos al catálogo desde base de datos
- [ ] Implementar carrito de cotización
- [ ] Agregar búsqueda avanzada con Algolia
- [ ] Modo oscuro completo
- [ ] Internacionalización (i18n) español/inglés
- [ ] Panel de administración
- [ ] Analytics con Google Analytics 4
- [ ] Optimización SEO con metadata dinámica
5. Agregar SEO metadata
6. Implementar analytics

## 📝 Notas Técnicas

- **Componentes Client-side**: Todos los componentes de página usan `'use client'` para interactividad
- **Navegación**: Se usa `next/link` para navegación optimizada
- **Componentes Compartidos**: Header y Footer están centralizados en `components/shared.tsx`
- **Animaciones**: CSS puro para mejor rendimiento (sin Three.js)
- **TypeScript**: Todas las interfaces y tipos están definidos

## 🎨 Paleta de Colores

- **Azul Principal**: `#1e3a8a` (blue-800)
- **Gris Fondo**: `#f8fafc` (slate-50)
- **Texto Principal**: `#0f172a` (slate-900)
- **Texto Secundario**: `#475569` (slate-600)

## 📄 Licencia

© 2024 Herramaq. Todos los derechos reservados.
