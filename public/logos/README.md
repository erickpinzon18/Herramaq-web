# Logos de Marcas

Esta carpeta contiene los logos de las diferentes marcas de productos.

## Cómo agregar logos

1. Descarga el logo de la marca en formato PNG (preferiblemente con fondo transparente)
2. Guarda el archivo en esta carpeta con el nombre en minúsculas y guiones
   - Ejemplo: `makita.png`, `black-decker.png`, `milwaukee.png`
3. Actualiza el archivo `/src/data/brandLogos.ts` con la ruta del logo

## Formato recomendado

- **Formato**: PNG con fondo transparente
- **Dimensiones recomendadas**: 200x80 píxeles (proporción 2.5:1)
- **Peso máximo**: 50KB por archivo

## Ejemplo de uso en brandLogos.ts

```typescript
'MAKITA': {
    name: 'MAKITA',
    logoUrl: '/logos/makita.png',
    website: 'https://www.makita.com'
},
```

## Obtener todas las marcas de Firebase

Para saber qué marcas necesitas agregar, puedes usar el script:

```typescript
import { getAllUniqueBrands } from '@/utils/getBrands';

// Ejecutar en la consola del navegador
getAllUniqueBrands();
```

Este script te dará:
1. Lista de todas las marcas en tu base de datos
2. Código pre-generado para copiar en `brandLogos.ts`

## Recursos para descargar logos

- [Brandfetch](https://brandfetch.com/) - Logos de marcas en alta calidad
- [Clearbit Logo API](https://clearbit.com/logo) - API para obtener logos automáticamente
- [LogoSearch](https://logosear.ch/) - Buscador de logos SVG

## Logo por defecto

Si una marca no tiene logo configurado, se mostrará un placeholder automático.
