# Sistema de Logging y Monitorización

Este documento describe el sistema de logging implementado en el backend usando **Pino** como logger principal.

## 🎯 Características Implementadas

### ✅ Logging de Requests
- Cada petición HTTP se loggea con método, URL, status y tiempo de respuesta
- Asignación de `requestId` único por petición usando UUID v4
- Logging de requests entrantes y respuestas completadas
- Detección de requests abortados

### ✅ Logger Central con Pino
- Configuración automática según el entorno:
  - **Desarrollo**: Nivel `debug` con `pino-pretty` para salida legible
  - **Producción**: Nivel `info` con formato JSON plano
- Soporte para logging estructurado con metadatos

### ✅ Manejo Centralizado de Errores
- Middleware de error que usa el logger con contexto de request
- Logging de errores con stack trace completo en desarrollo
- Inclusión de requestId para trazabilidad

## 📁 Estructura de Archivos

```
src/
├── utils/
│   └── logger.ts              # Instancia configurada de Pino + clase legacy
├── middlewares/
│   ├── assignRequestId.ts     # Middleware que inyecta requestId en req
│   ├── requestLogger.ts       # Middleware de logging por request
│   └── errorHandler.ts        # Middleware de manejo centralizado de errores (actualizado)
└── types/
    └── index.ts               # Tipos extendidos para Request con requestId
```

## 🔧 Configuración

### Logger (utils/logger.ts)
- Exporta instancia de `pino` configurada según entorno
- Mantiene clase `Logger` legacy para compatibilidad
- Pretty printing automático en desarrollo

### Middleware de RequestId (middlewares/assignRequestId.ts)
- Genera UUID v4 único por petición
- Añade `requestId` al objeto `req`
- Incluye header `X-Request-ID` en la respuesta
- Extiende tipos de Express globalmente

### Middleware de Request Logger (middlewares/requestLogger.ts)
- Mide tiempo de respuesta usando `Date.now()`
- Crea child logger con contexto de requestId
- Loggea requests entrantes y respuestas finalizadas
- Maneja requests abortados

### Error Handler Actualizado (middlewares/errorHandler.ts)
- Integrado con sistema de logging de Pino
- Incluye requestId en logs de error
- Contexto completo: método, URL, IP, user agent
- Stack trace completo en desarrollo

## 🚀 Integración en Server

Los middlewares se aplican en el orden correcto en `server.ts`:

```typescript
// 1. Seguridad
applySecurity(app);

// 2. Asignación de Request ID (debe ser primero)
app.use(assignRequestId);

// 3. Logging de requests
app.use(requestLogger);

// 4. Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 5. Rutas
app.use('/api', apiRoutes);

// 6. Manejo de errores (debe ser último)
app.use(errorHandler);
```

## 📦 Dependencias Instaladas

```bash
pnpm add pino pino-pretty uuid
pnpm add -D @types/uuid
```

## 🧪 Testing

### Ruta de Debug
Se añadió la ruta `/api/debug-error` que lanza un error simulado para probar el logging:

```bash
curl http://localhost:3001/api/debug-error
```

### Ejemplo de Logs

**Request normal:**
```
[2025-08-06 15:13:34.404 +0200] INFO: Incoming GET /api/
    requestId: "33f33de6-2a92-4178-be53-84d088f74f67"
    method: "GET"
    url: "/api/"
    userAgent: "Mozilla/5.0..."
    ip: "::1"

[2025-08-06 15:13:34.406 +0200] INFO: GET /api/ 200 (2ms)
    requestId: "33f33de6-2a92-4178-be53-84d088f74f67"
    method: "GET"
    url: "/api/"
    statusCode: 200
    duration: "2ms"
    contentLength: "77"
```

**Error:**
```
[2025-08-06 15:13:46.200 +0200] ERROR: Error 500: Internal Server Error
    requestId: "49d81e69-c862-49b2-9134-36a6bed993f6"
    err: {
      "type": "Error",
      "message": "Simulated error for logging test",
      "stack": "Error: Simulated error for logging test..."
    }
    statusCode: 500
    method: "GET"
    url: "/api/debug-error"
    userAgent: "Mozilla/5.0..."
    ip: "::1"
```

## 🔍 Trazabilidad

Cada request tiene un `requestId` único que permite:
- Seguir el flujo completo de una petición
- Correlacionar logs de request, respuesta y errores
- Debugging eficiente en producción
- Header `X-Request-ID` en respuestas para el cliente

## 🌟 Beneficios

1. **Trazabilidad completa**: Cada petición es rastreable con su requestId único
2. **Logging estructurado**: Metadatos consistentes en formato JSON
3. **Rendimiento**: Pino es uno de los loggers más rápidos para Node.js
4. **Flexibilidad**: Configuración automática según entorno
5. **Compatibilidad**: Mantiene API legacy mientras migra a Pino
6. **Debugging**: Pretty printing en desarrollo, JSON en producción

## 🔄 Migración

El sistema mantiene la clase `Logger` legacy para compatibilidad con código existente, pero se recomienda usar la instancia `logger` de Pino directamente para nuevas implementaciones.