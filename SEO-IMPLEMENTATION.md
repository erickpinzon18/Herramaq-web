# SEO Implementation Checklist - Herramaq

## ✅ Metadata Completo

### Layout Principal (`layout.tsx`)
- **Title template**: Sistema de títulos dinámicos con plantilla
- **Description**: Descripción optimizada con palabras clave
- **Keywords**: 25+ palabras clave relevantes incluyendo:
  - Términos generales: maquinaria industrial, herramientas CNC, servicios de maquinado
  - Ubicación: Querétaro, San Juan del Río
  - Marcas: INDUMAC, PRECITOOLS, FERROTEC, SANDVIK, MITUTOYO, NORTON
  - Industrias: automotriz, aeroespacial, manufactura
  
- **Open Graph (Facebook/LinkedIn)**:
  - Configurado para compartir óptimo en redes sociales
  - Imágenes 1200x630px
  - Locale: es_MX
  
- **Twitter Cards**:
  - Summary large image format
  - Optimizado para compartir en Twitter/X
  
- **Robots meta**: Configurado para indexación completa
- **Canonical URLs**: Previene contenido duplicado
- **Language**: es-MX (español de México)

### Página de Inicio (`page.tsx`)
- **40+ keywords específicos** de la home
- **Description detallada** con estadísticas (15+ años, 50+ marcas, 200+ clientes)
- **Keywords long-tail** como:
  - "maquinaria CNC Querétaro"
  - "tornos CNC San Juan del Río"
  - "maquinado de precisión Querétaro"
  - "SANDVIK Querétaro"
  
## ✅ Structured Data (Schema.org)

Implementado en el `<head>` del layout:
- **LocalBusiness Schema** con:
  - Nombre, descripción, URL
  - Dirección completa (calle, ciudad, código postal)
  - Coordenadas geográficas (20.3843, -100.0382)
  - Teléfono y email
  - Horarios de atención (Lun-Vie 8am-6pm, Sáb 9am-1pm)
  - Rating agregado: 4.9/5 de 200 reseñas
  - Redes sociales (Facebook, LinkedIn)
  - Rango de precios

## ✅ HTML Semántico

### Mejoras en `home.tsx`:
- **role="main"** en el contenedor principal
- **aria-label** descriptivos para navegación
- **Headings jerárquicos**:
  - H1 (oculto visualmente con sr-only): "Herramaq - Soluciones Industriales..."
  - H2 para cada sección con IDs únicos
  - aria-labelledby conectando secciones con sus títulos
  
- **Secciones semánticas**:
  - `<section>` con aria-labelledby para cada área
  - IDs descriptivos: hero-heading, stats-heading, capabilities-heading, testimonials-heading, etc.

## ✅ Archivos de Configuración

### `robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://herramaq.com/sitemap.xml
Crawl-delay: 1
```

### `sitemap.ts` (XML Sitemap automático)
- Homepage: priority 1.0, weekly updates
- Products: priority 0.9, weekly updates  
- Services: priority 0.8, monthly updates
- Contact: priority 0.7, monthly updates

## ✅ Performance Optimizations

- **Preconnect** para Google Fonts
- **Favicon y app icons** configurados
- **Images**: Usando next/image con lazy loading
- **Critical CSS**: Inline en head

## 🎯 Palabras Clave Principales

### Categoría: Maquinaria
- maquinaria CNC
- tornos CNC
- fresadoras CNC
- centros de maquinado

### Categoría: Herramientas
- herramientas de corte
- fresas de carburo
- insertos de torneado
- brocas de cobalto
- herramientas de precisión

### Categoría: Servicios
- servicios de maquinado
- maquinado de precisión
- manufactura industrial

### Categoría: Medición
- calibradores digitales
- micrómetros
- equipos de medición certificados

### Categoría: Sujeción
- prensas de sujeción
- chuck hidráulico
- portaherramientas CNC

### Geo-localización
- Querétaro
- San Juan del Río
- México

### Marcas (Partnerships)
- INDUMAC, PRECITOOLS, FERROTEC
- SANDVIK, MITUTOYO, NORTON
- BOSCH, TREMEC, SAFRAN, VALEO, SIEMENS

## 📊 Métricas de SEO Esperadas

- **Google Search Console**: Rastreo completo en 7-14 días
- **Google My Business**: Conectar con LocalBusiness schema
- **Bing Webmaster Tools**: Registrar sitemap
- **Rich Snippets**: Rating stars, horarios, ubicación

## 🔄 Próximos Pasos Recomendados

1. **Crear imágenes OG**:
   - `/public/og-image.jpg` (1200x630px)
   - `/public/og-image-home.jpg`
   - `/public/twitter-image.jpg`
   - `/public/apple-touch-icon.png`
   - `/public/favicon.ico`

2. **Google Search Console**:
   - Verificar propiedad con código en metadata
   - Enviar sitemap.xml
   - Monitorear indexación

3. **Google My Business**:
   - Crear perfil de negocio
   - Conectar con schema.org data
   - Agregar fotos de instalaciones

4. **Analytics**:
   - Google Analytics 4
   - Google Tag Manager
   - Heatmaps (Hotjar/Microsoft Clarity)

5. **Link Building**:
   - Directorios industriales de México
   - Asociaciones de manufactura
   - Blogs de la industria

6. **Content Marketing**:
   - Blog de casos de uso
   - Guías de selección de herramientas
   - Videos tutoriales

## 📝 Keywords por Página

### Homepage (/)
- Generales, estadísticas, servicios completos

### Products (/products)
- Catálogo, marcas específicas, categorías de productos

### Services (/services)  
- Maquinado, torno, fresado, servicios específicos

### Contact (/contact)
- Ubicación, dirección, horarios, contacto Querétaro

## ✨ Features Implementadas

✅ Meta tags completos (title, description, keywords)
✅ Open Graph para redes sociales
✅ Twitter Cards
✅ Schema.org structured data (LocalBusiness)
✅ Sitemap XML automático
✅ Robots.txt optimizado
✅ HTML semántico con ARIA labels
✅ Canonical URLs
✅ Language tags (es-MX)
✅ Preconnect para performance
✅ 65+ keywords relevantes total
✅ Geo-targeting para Querétaro/México
✅ Brand keywords (marcas partners)

## 🎯 Posicionamiento Objetivo

**Queries principales**:
1. "maquinaria cnc querétaro"
2. "herramientas de corte san juan del río"
3. "servicios de maquinado querétaro"
4. "tornos cnc méxico"
5. "proveedores industriales querétaro"

**Long-tail queries**:
- "donde comprar herramientas sandvik en querétaro"
- "servicios de fresado de precisión querétaro"
- "proveedor mitutoyo san juan del río"
- "maquinado de alta precisión industria automotriz"
