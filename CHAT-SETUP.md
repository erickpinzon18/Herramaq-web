# 🤖 Chat Widget con OpenAI - Guía de Configuración

## 📋 Descripción

Chat flotante inteligente integrado con OpenAI que aparece en todas las páginas del sitio. Proporciona asistencia en tiempo real sobre productos, servicios y capacidades de Herramaq.

## ✨ Características

- ✅ Botón flotante en la esquina inferior derecha
- ✅ Interfaz de chat moderna y responsiva
- ✅ Contexto completo sobre Herramaq pre-configurado
- ✅ **Links de WhatsApp automáticos para ventas** 📱
- ✅ Mensajes pre-escritos personalizados según la consulta
- ✅ Historial de conversación por sesión
- ✅ Indicadores de escritura en tiempo real
- ✅ Mensajes con timestamp
- ✅ Animaciones suaves
- ✅ Totalmente responsive (móvil y desktop)

## 🚀 Configuración Rápida

### 1. Obtener API Key de OpenAI

1. Ve a [OpenAI Platform](https://platform.openai.com/api-keys)
2. Inicia sesión o crea una cuenta
3. Click en "Create new secret key"
4. Copia tu API key (empieza con `sk-...`)

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Copia desde .env.example
cp .env.example .env.local
```

Edita `.env.local` y agrega tu API key:

```bash
OPENAI_API_KEY=sk-tu-api-key-aqui
```

### 3. Instalar Dependencias (si es necesario)

El chat ya está integrado, solo asegúrate de tener las dependencias:

```bash
npm install
```

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

¡Listo! El chat debería aparecer en la esquina inferior derecha.

## 🎨 Personalización

### Modificar el Pre-Prompt del Asistente ⭐

**El contexto completo del sistema está en `/src/app/api/chat/route.ts`**

Esta es la configuración más importante - define toda la personalidad y conocimiento del bot:

```typescript
const SYSTEM_PROMPT = `Eres el asistente virtual oficial de Herramaq...`;
```

**Incluye:**
- ✅ Información completa de la empresa
- ✅ Catálogo de productos con precios
- ✅ Servicios y capacidades técnicas
- ✅ Clientes principales
- ✅ **Generación automática de links de WhatsApp** 📱
- ✅ Número de WhatsApp: +52 427 163 5691
- ✅ Tono y estilo de comunicación
- ✅ Estrategias de ventas
- ✅ Llamados a la acción (CTAs)
- ✅ Ejemplos de conversaciones con WhatsApp

**Cómo funciona WhatsApp:**
El bot genera automáticamente links como:
```
https://wa.me/524271635691?text=Hola,%20me%20interesa%20cotizar%20fresas%20de%20carburo
```

Estos links abren WhatsApp con un mensaje pre-escrito personalizado según la consulta del cliente.

**Personalízalo editando:**
1. Productos y precios
2. Servicios disponibles
3. Tono de comunicación
4. Estrategias de venta
5. Restricciones y límites

### Cambiar el Modelo de OpenAI

En `/src/app/api/chat/route.ts`, línea ~170:

```typescript
model: 'gpt-4o-mini', // Opciones: gpt-4o, gpt-4o-mini, gpt-3.5-turbo
```

**Recomendado:** `gpt-4o-mini` (mejor relación calidad/precio)

### Ajustar el Contexto del Asistente ❌ DEPRECADO

~~El contexto ya NO está en `ChatWidget.tsx`~~ 

✅ **AHORA está en el servidor** (`/src/app/api/chat/route.ts`) como `SYSTEM_PROMPT`

**Ventajas de tenerlo en el servidor:**
- ✅ Más seguro (no expuesto al cliente)
- ✅ Fácil de actualizar sin rebuild del frontend
- ✅ Un solo lugar centralizado
- ✅ Mejor control sobre el comportamiento del bot

### Modificar Parámetros de OpenAI

En `/src/app/api/chat/route.ts`, línea ~175:

```typescript
temperature: 0.7,      // Creatividad (0-2) - 0.7 es ideal para ventas
max_tokens: 1000,      // Longitud máxima de respuesta (1000 = ~750 palabras)
top_p: 1,              // Diversidad de respuestas
frequency_penalty: 0,  // Penalización por repetición
presence_penalty: 0,   // Penalización por temas repetidos
```

**Recomendaciones:**
- `temperature: 0.7` = Balance perfecto para ventas (ni muy robótico ni muy creativo)
- `max_tokens: 1000` = Respuestas concisas (ajustado desde 10000 para mejor UX)
- Si quieres respuestas más largas: aumenta `max_tokens` a 2000

## 📁 Estructura de Archivos

```
src/app/
├── components/
│   ├── ChatWidget.tsx          # Componente UI del chat (frontend)
│   └── shared.tsx              # Exportación del widget
├── api/
│   └── chat/
│       └── route.ts            # ⭐ Endpoint API + SYSTEM_PROMPT (backend)
└── layout.tsx                  # Layout global (incluye ChatWidget)
```

**Archivo más importante:** `/src/app/api/chat/route.ts`
- Contiene el `SYSTEM_PROMPT` completo (pre-prompt)
- Maneja la lógica de OpenAI
- Protege tu API key

## 💰 Costos de OpenAI

### Modelos Recomendados (Precios aproximados)

- **gpt-4o-mini**: ~$0.15 / 1M tokens input, ~$0.60 / 1M tokens output
  - ✅ **Recomendado** - Excelente relación calidad/precio
  
- **gpt-3.5-turbo**: ~$0.50 / 1M tokens input, ~$1.50 / 1M tokens output
  - Más económico pero menor calidad

- **gpt-4o**: ~$2.50 / 1M tokens input, ~$10.00 / 1M tokens output
  - Máxima calidad pero más costoso

### Estimación de Uso

- Conversación promedio: ~500-1000 tokens
- 100 conversaciones/día ≈ $0.10-0.30 USD/día con gpt-4o-mini

### Monitorear Uso

Ve a [OpenAI Usage Dashboard](https://platform.openai.com/usage) para ver tu consumo en tiempo real.

## 🔒 Seguridad

### Variables de Entorno

- ✅ El API key NUNCA se expone al cliente
- ✅ Toda la lógica de OpenAI está en el servidor (`/api/chat/route.ts`)
- ✅ `.env.local` está en `.gitignore`

### Rate Limiting (Opcional)

Para producción, considera agregar rate limiting:

```typescript
// En /api/chat/route.ts
import { Ratelimit } from "@upstash/ratelimit";
```

## 🐛 Troubleshooting

### El chat no aparece

1. Verifica que `<ChatWidget />` esté en `layout.tsx`
2. Revisa la consola del navegador para errores

### "Error en la respuesta del servidor"

1. Verifica que `OPENAI_API_KEY` esté configurada correctamente
2. Revisa que tengas saldo en tu cuenta de OpenAI
3. Verifica logs del servidor: `npm run dev`

### Respuestas muy lentas

1. Reduce `max_tokens` en `/api/chat/route.ts`
2. Cambia a `gpt-4o-mini` si usas `gpt-4o`

### El contexto no se mantiene

El historial de mensajes se envía completo en cada request. Si el chat se cierra, la sesión se pierde (comportamiento esperado).

## 🚀 Deployment (Producción)

### Vercel (Recomendado)

1. Push tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Agrega la variable de entorno:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-tu-api-key`
4. Deploy

### Otras Plataformas

- **Netlify**: Agrega `OPENAI_API_KEY` en Site Settings > Environment Variables
- **Railway**: Settings > Variables > `OPENAI_API_KEY`

## 📚 Recursos

- [OpenAI API Docs](https://platform.openai.com/docs)
- [OpenAI Pricing](https://openai.com/pricing)
- [OpenAI Playground](https://platform.openai.com/playground) - Prueba modelos

## 🎯 Próximas Mejoras (Opcional)

- [ ] Persistencia de conversaciones en base de datos
- [ ] Analytics de conversaciones
- [ ] Rate limiting por usuario
- [ ] Soporte para archivos/imágenes
- [ ] Integración con CRM
- [ ] A/B testing de prompts
- [ ] Modo offline con respuestas pre-definidas

## 📞 Soporte

Si tienes problemas, revisa:
1. Logs del servidor (`npm run dev`)
2. Consola del navegador (F12)
3. [OpenAI Status](https://status.openai.com/)

---

**¿Listo para chatear?** 🚀 Solo necesitas configurar tu API key y ¡ya está!
