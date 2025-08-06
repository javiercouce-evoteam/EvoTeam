# 🌐 Ejemplos con cURL

Si prefieres usar cURL en lugar de los scripts de Node.js, aquí tienes ejemplos para probar cada característica de seguridad.

## 🏥 Health Check

```bash
curl -X GET http://localhost:3001/api/health
```

## 🚦 Rate Limiting Tests

### Test Global Rate Limit
```bash
# Hacer múltiples requests rápidamente
for i in {1..10}; do
  curl -X GET http://localhost:3001/api/health
  echo "Request $i completed"
done
```

### Test Auth Rate Limit
```bash
# Hacer múltiples intentos de login
for i in {1..7}; do
  curl -X POST http://localhost:3001/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"password123"}'
  echo "Login attempt $i completed"
done
```

## 🛡️ XSS Protection Tests

### Test XSS in Registration
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "<script>alert(\"XSS\")</script>"
  }'
```

### Test XSS in Headers
```bash
curl -X GET http://localhost:3001/api/health \
  -H "User-Agent: <script>alert('XSS')</script>" \
  -H "X-Custom-Header: javascript:alert(1)"
```

## 🔄 HPP Protection Tests

### Test Parameter Pollution
```bash
curl -X GET "http://localhost:3001/api/health?id=1&id=2&id=3&action=delete&action=create"
```

### Test POST Parameter Pollution
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=user@example.com&email=admin@example.com&password=userpass&password=adminpass"
```

## 🌐 CORS Tests

### Test Valid Origin
```bash
curl -X GET http://localhost:3001/api/health \
  -H "Origin: http://localhost:3000" \
  -v
```

### Test Invalid Origin
```bash
curl -X GET http://localhost:3001/api/health \
  -H "Origin: http://malicious-site.com" \
  -v
```

### Test Preflight Request
```bash
curl -X OPTIONS http://localhost:3001/api/auth/login \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

## ✅ Schema Validation Tests

### Test Valid Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "validPassword123"
  }'
```

### Test Invalid Email
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "not-an-email",
    "password": "password123"
  }'
```

### Test Missing Fields
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

### Test SQL Injection
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com'\'' OR '\''1'\''='\''1",
    "password": "password'\'' OR '\''1'\''='\''1"
  }'
```

## 🔑 Authentication Endpoints

### Test Registration
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePassword123!",
    "name": "New User"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePassword123!"
  }'
```

### Test Logout
```bash
curl -X POST http://localhost:3001/api/auth/logout
```

### Test Profile (without auth)
```bash
curl -X GET http://localhost:3001/api/auth/profile
```

### Test Profile (with invalid token)
```bash
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer invalid-token-here"
```

## 🛡️ Security Attack Tests

### Test Large Payload
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "'$(printf 'A%.0s' {1..10000})'",
    "name": "'$(printf 'B%.0s' {1..10000})'"
  }'
```

### Test Malformed JSON
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "pass"'
```

### Test Empty Body
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d ''
```

## 📊 Checking Response Headers

Para ver todos los headers de seguridad que se están aplicando:

```bash
curl -X GET http://localhost:3001/api/health -v
```

Busca estos headers en la respuesta:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 0`
- `Strict-Transport-Security`
- `Content-Security-Policy`
- `Access-Control-Allow-Origin`
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`

## 💡 Tips

1. **Rate Limiting**: Espera 15 minutos entre tests para resetear los límites
2. **Verbose Mode**: Usa `-v` para ver headers completos
3. **Save Response**: Usa `-o filename.json` para guardar respuestas
4. **Follow Redirects**: Usa `-L` si hay redirects
5. **Ignore SSL**: Usa `-k` para desarrollo (no en producción)

## 🚨 Resultados Esperados

- **✅ PASS**: Status 200-299, funcionalidad correcta
- **❌ BLOCKED**: Status 400, 401, 403, 429 - Seguridad funcionando
- **⚠️ UNEXPECTED**: Otros status codes - Revisar configuración