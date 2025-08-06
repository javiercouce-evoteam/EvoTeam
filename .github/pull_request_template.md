# Pull Request Template

## 📋 Información General

### 🎯 Tipo de Cambio
<!-- Marca con una X el tipo de cambio que aplica -->
- [ ] 🐛 Bug fix (cambio que soluciona un issue)
- [ ] ✨ Nueva funcionalidad (cambio que añade funcionalidad)
- [ ] 💥 Breaking change (cambio que puede romper funcionalidad existente)
- [ ] 📚 Documentación (cambios solo en documentación)
- [ ] 🎨 Refactoring (cambio de código que no corrige bugs ni añade funcionalidad)
- [ ] ⚡ Mejora de rendimiento
- [ ] 🧪 Tests (añadir o corregir tests)
- [ ] 🔧 Configuración/Tooling (cambios en configuración o herramientas)
- [ ] 🔒 Seguridad (cambios relacionados con seguridad)

### 🎫 Issue/Ticket Relacionado
<!-- Enlaza el issue o ticket de Jira/GitHub que resuelve este PR -->
- Resuelve: #[número_del_issue]
- Relacionado con: SCRUM-[número]

---

## 📝 Descripción

### ¿Qué hace este PR?
<!-- Describe de manera clara y concisa qué cambios introduces -->


### ¿Por qué es necesario este cambio?
<!-- Explica el contexto y la motivación detrás del cambio -->


### ¿Cómo se ha implementado?
<!-- Describe la solución técnica implementada -->


---

## 🧪 Testing

### ✅ Tests Realizados
<!-- Marca los tests que has ejecutado -->
- [ ] Tests unitarios pasando (`pnpm test`)
- [ ] Tests de integración pasando
- [ ] Smoke tests manuales realizados
- [ ] Tests en diferentes navegadores (si aplica)
- [ ] Tests en dispositivos móviles (si aplica)

### 🔍 Cómo Testear
<!-- Proporciona pasos específicos para que los reviewers puedan testear -->
1. 
2. 
3. 

### 📱 Componentes/Áreas Afectadas
<!-- Lista los componentes, módulos o áreas del código que se ven afectados -->
- [ ] Backend API (`/backend`)
- [ ] Frontend Web (`/apps/web`)
- [ ] Mobile App (`/apps/mobile`)
- [ ] UI Components (`/packages/ui`)
- [ ] CI/CD Pipeline (`.github/workflows`)
- [ ] Documentación
- [ ] Base de datos/Migraciones

---

## 🔒 Seguridad

### ✅ Checklist de Seguridad
<!-- Verifica que has seguido las prácticas de seguridad del proyecto -->
- [ ] No se exponen secretos o claves en el código
- [ ] Se validan correctamente los inputs del usuario
- [ ] Se implementan controles de autorización apropiados
- [ ] Se siguen las prácticas de CORS configuradas
- [ ] Se implementa rate limiting donde es necesario
- [ ] Se sanitizan los datos antes de procesarlos
- [ ] Se usan HTTPS para comunicaciones externas

### 🛡️ Consideraciones de Seguridad
<!-- Describe cualquier consideración especial de seguridad -->


---

## 📊 Rendimiento

### ⚡ Impacto en Rendimiento
<!-- Describe el impacto en rendimiento, si lo hay -->
- [ ] Sin impacto en rendimiento
- [ ] Mejora el rendimiento
- [ ] Puede afectar el rendimiento (explicar abajo)

### 📈 Métricas (si aplica)
<!-- Incluye métricas de rendimiento si son relevantes -->
- Bundle size: 
- Tiempo de carga: 
- Memoria utilizada: 

---

## 🔄 Compatibilidad

### 📱 Compatibilidad de Dispositivos
- [ ] Desktop (Chrome, Firefox, Safari, Edge)
- [ ] Mobile (iOS Safari, Android Chrome)
- [ ] Tablet

### 🔧 Compatibilidad de Versiones
- [ ] Node.js versión mínima soportada
- [ ] Dependencias actualizadas y compatibles
- [ ] No introduce breaking changes

---

## 📸 Screenshots/Videos
<!-- Incluye capturas de pantalla o videos si hay cambios visuales -->


---

## 📚 Documentación

### 📖 Documentación Actualizada
- [ ] README actualizado (si es necesario)
- [ ] Documentación de API actualizada
- [ ] Comentarios en código añadidos/actualizados
- [ ] CHANGELOG.md actualizado

### 🔗 Enlaces Útiles
<!-- Incluye enlaces a documentación relevante -->
- [Documentación de la API](./backend/README.md)
- [Guía de Seguridad](./backend/SECURITY.md)
- [Logging Guidelines](./backend/LOGGING.md)

---

## ✅ Checklist del Desarrollador

### 🔍 Pre-commit Checks
- [ ] `pnpm run type-check` pasa sin errores
- [ ] `pnpm run lint` pasa sin errores
- [ ] `pnpm run format:check` pasa sin errores
- [ ] `pnpm run build` ejecuta correctamente
- [ ] Pre-commit hooks ejecutados exitosamente

### 📋 Revisión de Código
- [ ] El código sigue las convenciones del proyecto
- [ ] Se han eliminado console.logs y código de debug
- [ ] Se han añadido comentarios donde es necesario
- [ ] Se han actualizado los tipos de TypeScript
- [ ] Se han manejado correctamente los errores
- [ ] Se siguen los patrones establecidos en el codebase

### 🗂️ Organización
- [ ] Los archivos están en las carpetas correctas
- [ ] Los nombres de archivos siguen las convenciones
- [ ] Se han eliminado archivos no utilizados
- [ ] Las importaciones están organizadas correctamente

---

## 🔄 Deployment

### 🚀 Consideraciones de Deploy
- [ ] Requiere migraciones de base de datos
- [ ] Requiere variables de entorno nuevas
- [ ] Requiere reinicio de servicios
- [ ] Compatible con deploy en caliente

### 📋 Pasos Post-Deploy (si aplica)
1. 
2. 
3. 

---

## 👥 Reviewers

### 🎯 Tipo de Review Necesario
- [ ] Review de código general
- [ ] Review de seguridad
- [ ] Review de rendimiento
- [ ] Review de UX/UI
- [ ] Review de arquitectura

### 📝 Notas para Reviewers
<!-- Información específica que quieres que los reviewers sepan -->


### ❓ Preguntas Específicas
<!-- Preguntas específicas que tienes para los reviewers -->


---

## 📋 Checklist Final

### ✅ Antes de Merge
- [ ] Todos los checks de CI/CD pasan
- [ ] Al menos 2 approvals recibidos
- [ ] Conflictos de merge resueltos
- [ ] Branch actualizado con la última versión de main
- [ ] Tests de smoke realizados en staging (si aplica)

---

**🎉 ¡Gracias por contribuir al proyecto! 🎉**

<!-- 
💡 Tips para un buen PR:
- Mantén los PRs pequeños y enfocados
- Escribe commits descriptivos siguiendo conventional commits
- Incluye tests para nueva funcionalidad
- Actualiza la documentación cuando sea necesario
- Responde a los comentarios de review de manera constructiva
-->