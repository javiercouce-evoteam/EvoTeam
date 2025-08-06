# 🚀 Pospon Backend API

Backend API desarrollado con Node.js, Express y TypeScript para la aplicación Pospon.

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── index.ts              # Punto de entrada principal
│   ├── server.ts             # Configuración del servidor Express
│   ├── routes/               # Definición de rutas
│   │   └── index.ts          # Rutas principales
│   ├── controllers/          # Controladores de rutas
│   │   └── healthController.ts
│   ├── services/             # Lógica de negocio
│   ├── middlewares/          # Middlewares personalizados
│   │   └── errorHandler.ts   # Manejo de errores
│   ├── utils/                # Utilidades
│   │   ├── env.ts            # Configuración de entorno
│   │   └── logger.ts         # Sistema de logging
│   └── types/                # Tipos TypeScript
│       └── index.ts          # Tipos globales
├── dist/                     # Código compilado (generado)
├── .env.example              # Variables de entorno de ejemplo
├── tsconfig.json             # Configuración TypeScript
├── .eslintrc.json            # Configuración ESLint
├── .prettierrc               # Configuración Prettier
└── package.json              # Dependencias y scripts
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con auto-reload
pnpm --filter backend run dev

# Compilar TypeScript
pnpm --filter backend run build

# Ejecutar en producción
pnpm --filter backend run start

# Linting y formateo
pnpm --filter backend run lint
pnpm --filter backend run lint:fix
pnpm --filter backend run format

# Verificación de tipos
pnpm --filter backend run type-check

# Limpiar directorio dist
pnpm --filter backend run clean
```

## 🔧 Configuración

1. **Variables de entorno**: Copia `.env.example` a `.env` y configura las variables necesarias.

2. **Instalación de dependencias**:
   ```bash
   cd backend
   pnpm install
   ```

3. **Desarrollo**:
   ```bash
   pnpm run dev
   ```

## 📡 Endpoints Disponibles

- `GET /` - Redirección a `/api`
- `GET /api` - Hello World
- `GET /api/health` - Health check
- `GET /api/info` - Información de la API

## 🏗️ Tecnologías

- **Runtime**: Node.js
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Linting**: ESLint + Prettier
- **Seguridad**: Helmet, CORS
- **Logging**: Morgan + Logger personalizado
- **Desarrollo**: tsx (reemplazo de ts-node-dev)

## 📝 Convenciones

- Usar **ESModules** (import/export)
- **Tipos estrictos** de TypeScript (no usar `any`)
- **Paths absolutos** con alias `@/`
- **Manejo de errores** centralizado
- **Logging** estructurado
- **Validación** de variables de entorno