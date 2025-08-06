# 🛡️ Security Testing Suite - Pospon App Backend

Esta carpeta contiene una suite completa de tests para verificar las medidas de seguridad implementadas en el backend de Pospon App.

## 📁 Estructura de Archivos

### 🧪 Tests Principales
- **`comprehensive-security-demo.js`** - Demostración completa de todas las características de seguridad
- **`attack-simulation.js`** - Simulación de ataques para verificar qué requests fallan y cuáles tienen éxito
- **`quick-test.js`** - Test rápido de verificación básica de seguridad

### 🎯 Tests Específicos
- **`rate-limiting/test-rate-limits.js`** - Tests de rate limiting
- **`test-rate-limiting-force.js`** - Test forzado de rate limiting con muchas requests
- **`xss-protection/test-xss.js`** - Tests de protección XSS
- **`hpp-protection/test-hpp.js`** - Tests de protección HPP
- **`cors-tests/test-cors.js`** - Tests de protección CORS
- **`validation/test-validation.js`** - Tests de validación de esquemas
- **`auth-endpoints/test-auth.js`** - Tests de endpoints de autenticación

### 📚 Documentación
- **`curl-examples.md`** - Ejemplos de cURL para testing manual
- **`run-all-tests.js`** - Script para ejecutar todos los tests

## 🚀 Cómo Usar

### 1. Ejecutar Test Rápido
```bash
node backend/debug/quick-test.js
```

### 2. Demostración Completa
```bash
node backend/debug/comprehensive-security-demo.js
```

### 3. Simulación de Ataques
```bash
node backend/debug/attack-simulation.js
```

### 4. Test Específico (ejemplo)
```bash
node backend/debug/rate-limiting/test-rate-limits.js
```

## 🛡️ Características de Seguridad Verificadas

### ✅ Implementadas y Funcionando
1. **Security Headers (Helmet)**
   - ✅ X-Content-Type-Options
   - ✅ X-Frame-Options
   - ✅ X-XSS-Protection
   - ✅ Strict-Transport-Security
   - ✅ Content-Security-Policy

2. **XSS Protection**
   - ✅ Bloquea scripts maliciosos
   - ✅ Bloquea inyección de HTML
   - ✅ Sanitiza contenido de entrada

3. **SQL Injection Protection**
   - ✅ Validación de esquemas con Zod
   - ✅ Bloquea intentos de inyección SQL
   - ✅ Validación de tipos de datos

4. **HPP Protection**
   - ✅ Limpia parámetros duplicados
   - ✅ Previene parameter pollution

5. **Rate Limiting**
   - ✅ Límites globales configurados
   - ✅ Límites específicos para auth
   - ✅ Diferentes límites para dev/prod

6. **Input Validation**
   - ✅ Esquemas Zod implementados
   - ✅ Validación de email y password
   - ✅ Rechazo de datos inválidos

### ⚠️ Necesitan Ajustes
1. **CORS Protection**
   - ⚠️ Actualmente permite todos los orígenes
   - 💡 Configurar orígenes específicos en producción

2. **Authentication Middleware**
   - ⚠️ Algunos endpoints protegidos no requieren token
   - 💡 Revisar implementación de middleware de auth

## 📊 Resultados de Tests

### ✅ Requests que FALLAN (Correctamente Bloqueados)
- Scripts XSS maliciosos
- Inyecciones SQL
- Datos de entrada inválidos
- Emails mal formateados
- Passwords que no cumplen criterios

### ✅ Requests que TIENEN ÉXITO (Correctamente Permitidos)
- Health check
- Datos válidos de registro/login
- Requests con headers correctos
- Contenido de texto normal

### ⚠️ Áreas de Mejora Identificadas
1. **CORS**: Configurar orígenes específicos
2. **Auth Middleware**: Aplicar correctamente a endpoints protegidos
3. **Rate Limiting**: Funciona pero con límites altos en desarrollo

## 🔧 Configuración de Entorno

### Development Mode
- Rate Limiting: Límites altos para desarrollo
- CORS: Permisivo para testing local
- Logging: Detallado para debugging

### Production Mode
- Rate Limiting: Límites estrictos
- CORS: Orígenes específicos únicamente
- Logging: Optimizado para rendimiento

## 🎯 Próximos Pasos

1. **Ajustar CORS** para orígenes específicos en producción
2. **Revisar Authentication Middleware** para endpoints protegidos
3. **Implementar logging de seguridad** para monitoreo
4. **Añadir tests de carga** para rate limiting
5. **Configurar alertas** para intentos de ataque

## 📝 Notas Importantes

- Todos los tests están diseñados para ejecutarse con el servidor corriendo en `http://localhost:3001`
- Los tests no modifican datos permanentemente
- Rate limiting funciona pero con límites altos en modo desarrollo
- La mayoría de medidas de seguridad están funcionando correctamente

## 🚨 Advertencias de Seguridad

- **NO ejecutar estos tests en producción**
- **NO usar datos reales en los tests**
- **Revisar logs después de ejecutar tests de ataque**
- **Configurar CORS apropiadamente antes de producción**

---

🛡️ **Tu backend está bien protegido!** Las medidas de seguridad principales están funcionando correctamente y bloqueando la mayoría de ataques comunes.