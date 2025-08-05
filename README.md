# Pospon App - Aplicación Fullstack

Una aplicación fullstack moderna construida con **Next.js**, **React Native (Expo)**, **Tamagui** y **pnpm workspaces**.

## 🏗️ Arquitectura del Proyecto

```
Pospon-app/
├── apps/
│   ├── web/          # Aplicación web (Next.js 14.2.5)
│   └── mobile/       # Aplicación móvil (React Native + Expo)
├── packages/
│   └── ui/           # Componentes UI compartidos (Tamagui)
├── backend/          # Servidor backend (Node.js)
└── package.json      # Configuración del workspace raíz
```

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **pnpm** (gestor de paquetes)
- **Git**

### Instalación
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd Pospon-app

# Instalar dependencias
pnpm install
```

## 📱 Comandos de Desarrollo

### Aplicaciones
```bash
# Iniciar aplicación web (Next.js)
pnpm run dev
# o
pnpm --filter web dev

# Iniciar aplicación móvil (Expo)
pnpm --filter mobile start

# Iniciar backend
cd backend && node index.js
```

### Build y Producción
```bash
# Build aplicación web
pnpm run build

# Build todas las aplicaciones
pnpm run build:all
```

## 🧹 Comandos de Limpieza

**¿Problemas con dependencias inconsistentes?** Usa estos comandos:

```bash
# 🔥 RECOMENDADO: Limpieza completa + reinstalación
pnpm run fresh

# Limpiar solo carpetas node_modules
pnpm run clean:modules

# Limpiar solo archivo de lock
pnpm run clean:lock

# Limpiar todo (modules + lock)
pnpm run clean
```

> **💡 Tip:** Usa `pnpm run fresh` cuando tengas problemas de versiones inconsistentes o cachés corruptos.

## 🛠️ Stack Tecnológico

### Frontend Web
- **Next.js 14.2.5** - Framework React con SSR/SSG
- **React 19.0.0** - Biblioteca de UI
- **Tamagui 1.132.9** - Sistema de componentes UI
- **TypeScript** - Tipado estático

### Frontend Móvil
- **React Native** - Framework móvil multiplataforma
- **Expo** - Plataforma de desarrollo móvil
- **Tamagui** - Componentes UI compartidos

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** (si aplica) - Framework web

### Herramientas
- **pnpm** - Gestor de paquetes con workspaces
- **TypeScript** - Tipado estático
- **ESLint** - Linter de código
- **Git** - Control de versiones

## 📦 Gestión de Dependencias

### Versiones Bloqueadas
Para evitar conflictos, las siguientes dependencias están bloqueadas a versiones exactas:

- **React**: `19.0.0`
- **Tamagui**: `1.132.9`
- **Next.js**: `14.2.5`

### Overrides de pnpm
El proyecto usa `pnpm.overrides` para forzar versiones consistentes en todo el monorepo.

## 🔧 Configuración

### Variables de Entorno
Crea archivos `.env.local` en las aplicaciones que lo requieran:

```bash
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001

# apps/mobile/.env
API_URL=http://localhost:3001
```

### Tamagui
La configuración de Tamagui se encuentra en:
- `tamagui.config.ts` - Configuración principal
- `packages/ui/` - Componentes compartidos

## 🐛 Solución de Problemas

### Errores Comunes

**1. Errores de tipos de TypeScript**
```bash
pnpm run fresh
```

**2. Conflictos de versiones**
```bash
pnpm run clean
pnpm install
```

**3. Problemas de caché**
```bash
pnpm run clean:modules
pnpm install
```

**4. Error "next command not found"**
```bash
cd apps/web
pnpm add next@14.2.5
```

### Advertencias Conocidas

> ⚠️ **ExceptionsManager Warning**: Esta advertencia es conocida y ya ha sido reportada en el repositorio oficial. Se resolverá pronto a través de actualizaciones del SDK o DevTools.

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Inicia la aplicación web |
| `pnpm run build` | Build de la aplicación web |
| `pnpm run build:all` | Build de todas las aplicaciones |
| `pnpm run clean` | Limpia node_modules y lock files |
| `pnpm run clean:modules` | Limpia solo node_modules |
| `pnpm run clean:lock` | Limpia solo pnpm-lock.yaml |
| `pnpm run fresh` | Limpieza completa + reinstalación |

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---

**¿Necesitas ayuda?** Revisa la documentación de [Next.js](https://nextjs.org/docs), [Tamagui](https://tamagui.dev) y [Expo](https://docs.expo.dev).
