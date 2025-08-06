# 🤖 PROMPT DE CONTEXTO COMPLETO - POSPON APP

## 📋 INFORMACIÓN CRÍTICA PARA LA IA

**IMPORTANTE**: Este es un monorepo fullstack con configuraciones específicas y problemas conocidos resueltos. Lee completamente este contexto antes de realizar cualquier cambio.

---

## 🏗️ ARQUITECTURA DEL PROYECTO

### Estructura del Monorepo
```
Pospon-app/
├── apps/
│   ├── web/                    # Next.js 14.2.5 (VERSIÓN FIJA)
│   │   ├── src/app/           # App Router de Next.js
│   │   ├── next.config.js     # Configuración simplificada
│   │   ├── package.json       # Dependencias específicas
│   │   └── tsconfig.json      # TypeScript config
│   └── mobile/                # React Native + Expo
│       ├── App.tsx            # Punto de entrada
│       ├── package.json       # Dependencias móviles
│       └── metro.config.js    # Metro bundler config
├── packages/
│   └── ui/                    # Componentes compartidos
│       ├── src/               # Componentes Tamagui
│       └── package.json       # UI dependencies
├── backend/                   # Node.js backend
│   ├── index.js              # Servidor principal
│   └── package.json          # Backend dependencies
├── package.json              # WORKSPACE ROOT - CRÍTICO
├── pnpm-lock.yaml            # Lock file - NO MODIFICAR MANUALMENTE
├── pnpm-workspace.yaml       # Configuración workspace
└── tamagui.config.ts         # Configuración UI global
```

---

## 🚨 REGLAS CRÍTICAS - NUNCA IGNORAR

### 1. VERSIONES EXACTAS OBLIGATORIAS
```json
{
  "react": "19.0.0",           // EXACTA - Sin ^
  "react-dom": "19.0.0",       // EXACTA - Sin ^
  "tamagui": "1.132.9",        // EXACTA - Sin ^
  "next": "14.2.5"             // EXACTA - Sin ^
}
```

### 2. OVERRIDES DE PNPM - NO TOCAR
El `package.json` raíz contiene `pnpm.overrides` que FUERZAN versiones específicas:
```json
{
  "pnpm": {
    "overrides": {
      "react": "=19.0.0",
      "react-dom": "=19.0.0",
      "tamagui": "=1.132.9",
      "@tamagui/core": "=1.132.9",
      "@tamagui/web": "=1.132.9",
      "@tamagui/config": "=1.132.9",
      "@tamagui/babel-plugin": "=1.132.9"
    }
  }
}
```

### 3. NUNCA USAR `ignoreBuildErrors: true`
Este proyecto está configurado para compilar sin errores. Si hay errores de TypeScript, RESOLVERLOS, no ignorarlos.

---

## 🛠️ COMANDOS ESENCIALES

### Comandos de Desarrollo
```bash
# DESARROLLO WEB (PRINCIPAL)
pnpm run dev                  # Inicia Next.js en localhost:3000

# DESARROLLO MÓVIL
pnpm --filter mobile start    # Inicia Expo

# BACKEND
cd backend && node index.js   # Inicia servidor backend
```

### Comandos de Build
```bash
# Build web para producción
pnpm run build               # Build solo web
pnpm run build:all          # Build todo el monorepo
```

### 🧹 COMANDOS DE LIMPIEZA (MUY IMPORTANTES)
```bash
# 🔥 COMANDO SALVADOR - Usar cuando hay problemas
pnpm run fresh              # Limpia TODO + reinstala

# Comandos específicos
pnpm run clean:modules      # Solo node_modules
pnpm run clean:lock         # Solo pnpm-lock.yaml
pnpm run clean              # Ambos
```

---

## 🚨 PROBLEMAS CONOCIDOS Y SOLUCIONES

### PRIORIDAD ALTA - Errores Críticos

#### 1. Error: "Module not found" o tipos de Tamagui
**SÍNTOMAS**: Errores de importación, tipos no encontrados
**SOLUCIÓN**:
```bash
pnpm run fresh
```

#### 2. Error: "next command not found"
**SÍNTOMAS**: Build falla, comando next no reconocido
**SOLUCIÓN**:
```bash
cd apps/web
pnpm add next@14.2.5
```

#### 3. Conflictos de versiones React/Tamagui
**SÍNTOMAS**: Errores de peer dependencies, tipos incompatibles
**SOLUCIÓN**: Verificar que TODAS las versiones sean exactas (sin ^)

### PRIORIDAD MEDIA - Configuraciones

#### 4. Fuentes no encontradas (Geist)
**PROBLEMA RESUELTO**: Se cambió de Geist a Inter/JetBrains_Mono
**UBICACIÓN**: `apps/web/src/app/layout.tsx`
```typescript
// ✅ CORRECTO
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

// ❌ INCORRECTO (causaba errores)
// const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
```

#### 5. Configuración webpack compleja
**PROBLEMA RESUELTO**: Se simplificó `next.config.js`
**UBICACIÓN**: `apps/web/next.config.js`
```javascript
// ✅ CONFIGURACIÓN ACTUAL (SIMPLIFICADA)
const { withTamagui } = require('@tamagui/next-plugin');

module.exports = withTamagui({
  config: './tamagui.config.ts',
  components: ['tamagui'],
  importsWhitelist: ['constants.js', 'colors.js'],
  outputCSS: './public/tamagui.css',
  logTimings: true,
  disableExtraction: process.env.NODE_ENV === 'development'
});
```

### PRIORIDAD BAJA - Advertencias

#### 6. ExceptionsManager Warning (React Native)
**SÍNTOMAS**: Warning en consola sobre DevTools
**ESTADO**: Conocido, reportado oficialmente, se resolverá automáticamente

---

## 📁 ARCHIVOS CRÍTICOS - NO MODIFICAR SIN CUIDADO

### 1. `package.json` (raíz) - SÚPER CRÍTICO
- Contiene overrides de pnpm
- Scripts de limpieza
- Versiones exactas de dependencias

### 2. `pnpm-lock.yaml` - CRÍTICO
- NO modificar manualmente
- Si hay problemas, usar `pnpm run clean:lock`

### 3. `apps/web/next.config.js` - IMPORTANTE
- Configuración simplificada de Tamagui
- NO agregar configuraciones complejas de webpack

### 4. `tamagui.config.ts` - IMPORTANTE
- Configuración global de UI
- Afecta a web y mobile

### 5. `apps/web/src/app/layout.tsx` - IMPORTANTE
- Configuración de fuentes (Inter/JetBrains_Mono)
- Provider de Tamagui

---

## 🔧 CONFIGURACIONES ESPECÍFICAS

### TypeScript
- Todos los proyectos usan TypeScript estricto
- Configuraciones específicas en cada `tsconfig.json`
- NO usar `any` - resolver tipos correctamente

### ESLint
- Configuración específica para Tamagui en `apps/web/.eslintrc.local.js`
- Reglas personalizadas para evitar conflictos

### Tamagui
- Versión 1.132.9 EXACTA en todo el monorepo
- Configuración centralizada en `tamagui.config.ts`
- Componentes compartidos en `packages/ui/`

---

## 🚀 FLUJO DE TRABAJO RECOMENDADO

### Para Nuevas Features
1. **SIEMPRE** verificar que el servidor funciona: `pnpm run dev`
2. Hacer cambios incrementales
3. Probar en cada cambio
4. Si hay errores de dependencias: `pnpm run fresh`

### Para Debugging
1. **PRIMER PASO**: `pnpm run fresh`
2. Verificar versiones exactas en package.json
3. Revisar logs de compilación
4. Consultar esta guía de problemas conocidos

### Para Nuevas Dependencias
1. **VERIFICAR** compatibilidad con React 19 y Tamagui 1.132.9
2. Agregar con versión exacta (sin ^)
3. Actualizar overrides si es necesario
4. Probar con `pnpm run build`

---

## 📊 COMANDOS DE DIAGNÓSTICO

### Verificar Estado del Proyecto
```bash
# Ver versiones instaladas
pnpm ls react tamagui @tamagui/core -r --depth=0

# Verificar build
pnpm run build

# Estado de Git
git status

# Procesos en ejecución
# Verificar si hay servidores corriendo en puertos 3000, 3001
```

### Información del Sistema
```bash
# Versiones importantes
node --version          # Debe ser 18+
pnpm --version          # Debe ser 8+
```

---

## 🎯 OBJETIVOS DEL PROYECTO

### Aplicación Web (Next.js)
- **Framework**: Next.js 14.2.5 con App Router
- **UI**: Tamagui para componentes
- **Estilos**: Sistema de design tokens
- **Deploy**: Preparado para Vercel

### Aplicación Móvil (React Native)
- **Framework**: Expo con React Native
- **UI**: Componentes compartidos con web (Tamagui)
- **Navegación**: React Navigation (si aplica)

### Backend
- **Runtime**: Node.js
- **Framework**: Express (básico)
- **API**: RESTful endpoints

---

## 🔍 DEBUGGING AVANZADO

### Si `pnpm run fresh` no resuelve el problema:

1. **Verificar Node.js**:
   ```bash
   node --version  # Debe ser 18+
   ```

2. **Limpiar caché de pnpm**:
   ```bash
   pnpm store prune
   ```

3. **Verificar permisos de archivos** (Windows):
   - Ejecutar terminal como administrador si es necesario

4. **Verificar conflictos de puertos**:
   ```bash
   netstat -ano | findstr :3000
   ```

5. **Reinstalar pnpm** (último recurso):
   ```bash
   npm uninstall -g pnpm
   npm install -g pnpm@latest
   ```

---

## 📝 NOTAS PARA LA IA

### Comportamiento Esperado
- **SIEMPRE** leer este contexto completo antes de hacer cambios
- **PRIORIZAR** soluciones conocidas antes de experimentar
- **MANTENER** versiones exactas de dependencias
- **USAR** comandos de limpieza cuando hay dudas
- **DOCUMENTAR** nuevos problemas encontrados

### Comandos Prohibidos
- ❌ `npm install` (usar `pnpm install`)
- ❌ `yarn install` (usar `pnpm install`)
- ❌ Modificar `pnpm-lock.yaml` manualmente
- ❌ Agregar `ignoreBuildErrors: true`
- ❌ Cambiar versiones de React/Tamagui sin consultar

### Comandos Seguros
- ✅ `pnpm run fresh` (siempre seguro)
- ✅ `pnpm run dev` (desarrollo)
- ✅ `pnpm run build` (verificar build)
- ✅ `git status` (verificar cambios)

---

## 🏆 ESTADO ACTUAL DEL PROYECTO

### ✅ Funcionando Correctamente
- Build de producción sin errores
- Servidor de desarrollo estable
- Tipos de TypeScript válidos
- Versiones sincronizadas en todo el monorepo
- Comandos de limpieza implementados

### 🔧 Configuraciones Aplicadas
- Next.js downgradeado a 14.2.5 (estable)
- Tamagui bloqueado a 1.132.9 (estable)
- Fuentes cambiadas a Inter/JetBrains_Mono
- Webpack simplificado
- Overrides de pnpm configurados

### 📈 Próximos Pasos Sugeridos
- Implementar features específicas de la aplicación
- Agregar tests unitarios
- Configurar CI/CD
- Optimizar performance

---

**RECUERDA**: Este proyecto ha sido estabilizado después de resolver múltiples conflictos de dependencias. Mantén las configuraciones actuales y usa los comandos de limpieza cuando tengas dudas.

**ÚLTIMA ACTUALIZACIÓN**: Enero 2025 - Proyecto estable y funcionando