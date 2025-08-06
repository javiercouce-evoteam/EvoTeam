# Configuración de Protección de Rama Main

Para asegurar que solo código validado llegue a la rama `main`, debes configurar las siguientes reglas de protección en GitHub:

## 🔧 Pasos para Configurar Branch Protection

### 1. Ir a Configuración del Repositorio
1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Branches**

### 2. Agregar Regla de Protección
1. Click en **Add rule** (Agregar regla)
2. En **Branch name pattern**, escribe: `main`

### 3. Configurar las Siguientes Opciones:

#### ✅ **Require a pull request before merging**
- ✅ Require approvals: `1` (mínimo)
- ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ Require review from code owners (opcional)

#### ✅ **Require status checks to pass before merging**
- ✅ Require branches to be up to date before merging
- **Status checks requeridos:**
  - `Backend CI/CD Pipeline`
  - `Smoke Test`

#### ✅ **Require conversation resolution before merging**
- Asegura que todos los comentarios sean resueltos

#### ✅ **Require signed commits** (opcional pero recomendado)

#### ✅ **Require linear history** (opcional)
- Mantiene un historial limpio sin merge commits

#### ✅ **Include administrators**
- Aplica las reglas incluso a administradores

### 4. Guardar Configuración
Click en **Create** para guardar la regla.

## 🚀 Flujo de Trabajo Resultante

1. **Desarrollador crea PR** → GitHub Actions ejecuta CI
2. **CI debe pasar** → Todos los checks en verde
3. **Review requerido** → Al menos 1 aprobación
4. **Merge permitido** → Solo si todo está en verde
5. **Deploy automático** → Render.com despliega desde `main`

## 🔍 Status Checks que se Ejecutarán

- **Type Checking** (TypeScript)
- **Linting** (ESLint)
- **Format Checking** (Prettier)
- **Build Process** (Compilación)
- **Security Audit** (pnpm audit)
- **Smoke Test** (Servidor inicia correctamente)

## 📋 Comandos Locales para Verificar

Antes de crear un PR, ejecuta localmente:

```bash
cd backend
pnpm install
pnpm run type-check
pnpm run lint
pnpm run format:check
pnpm run build
pnpm audit
```

## 🎯 Beneficios

- ✅ **Calidad garantizada** en `main`
- ✅ **Deploy seguro** en Render.com
- ✅ **Historial limpio** de commits
- ✅ **Colaboración estructurada**
- ✅ **Detección temprana** de errores