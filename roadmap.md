# Roadmap Técnico - Prueba de Desarrollador Mobile Ionic

## Visión General

Desarrollar una aplicación To-Do List con Ionic/Angular que incluya categorización de tareas, Firebase/Remote Config, optimización de rendimiento y exportación para Android/iOS.

---

## Fase 1: Configuración Inicial y Aplicación Base

### 1.1 Estructura del Proyecto
- [x] Configurar Ionic con Angular ✅
- [x] Verificar que compila correctamente (`ionic build`) ✅
- [x] Preparar estructura para Cordova (Android/iOS) ✅
- [x] Agregar plataformas Cordova ✅

### 1.2 Aplicación To-Do List Base
- [ ] Crear modelo `Task` (id, title, completed, categoryId)
- [ ] Implementar servicio de storage local (LocalStorage/IndexedDB)
- [ ] Crear página principal con lista de tareas
- [ ] Agregar funcionalidad: add, toggle complete, delete
- [ ] Commit inicial al repositorio Git

---

## Fase 2: Sistema de Categorías

### 2.1 Modelos y Servicios
- [ ] Crear modelo `Category` (id, name, color)
- [ ] Implementar servicio de categorías
- [ ] Relacionar tareas con categorías

### 2.2 UI de Categorías
- [ ] Crear página de gestión de categorías (CRUD)
- [ ] Selector de categoría al crear/editar tarea
- [ ] Filtrar tareas por categoría
- [ ] Mostrar color de categoría en cada tarea

---

## Fase 3: Firebase y Remote Config

### 3.1 Firebase Setup
- [ ] Crear proyecto en Firebase Console
- [ ] Instalar `@angular/fire` y `firebase`
- [ ] Configurar Firebase en la app

### 3.2 Remote Config (Feature Flag)
- [ ] Implementar servicio de Remote Config
- [ ] Crear feature flag (ej: `enable_category_colors`)
- [ ] Demo del feature flag en acción

---

## Fase 4: Optimización de Rendimiento

### 4.1 Carga Inicial
- [ ] Implementar lazy loading de rutas
- [ ] Optimizar bundle size (tree shaking)

### 4.2 Manejo de Datos
- [ ] Implementar virtual scrolling para listas grandes
- [ ] Optimizar almacenamiento (useIndexedDB para grandes cantidades)
- [ ] Implementar ChangeDetectionStrategy.OnPush

### 4.3 Memoria
- [ ] Limpiar suscripciones (takeUntilDestroy)
- [ ] Optimizar renders con trackBy

---

## Fase 5: Build y Exportación

### 5.1 Android
- [ ] Configurar Cordova para Android
- [ ] Build APK: `ionic cordova build android`
- [ ] Generar APK firmado

### 5.2 iOS
- [ ] Configurar Cordova para iOS
- [ ] Build IPA: `ionic cordova build ios`
- [ ] Generar IPA firmado (requiere cuenta Apple Developer en macOS)

---

## Fase 6: Documentación y Entregables

### 6.1 Documentación
- [ ] Actualizar README.md con instrucciones de ejecución
- [ ] Documentar cambios realizados
- [ ] Explicar feature flag de Remote Config

### 6.2 Respuestas a Preguntas
- [ ] Principales desafíos enfrentados
- [ ] Técnicas de optimización aplicadas
- [ ] Calidad y mantenibilidad del código

### 6.3 Archivos Entregables
- [ ] Repositorio Git actualizado
- [ ] APK generado
- [ ] IPA generado (si está disponible)

---

## Dependencias a Instalar

```bash
# Firebase
npm install firebase @angular/fire

# Cordova
npm install cordova cordova-res

# Utilities
npm install @ionic/storage
```

---

## Scripts Útiles

```bash
# Development
ionic serve

# Android
ionic cordova add android
ionic cordova build android

# iOS (macOS only)
ionic cordova add ios
ionic cordova build ios
```

---

## Stack Tecnológico

| Componente | Tecnología |
|------------|-------------|
| Framework | Ionic 8 + Angular 20 |
| Storage | IndexedDB / Ionic Storage |
| Backend | Firebase |
| Feature Flags | Firebase Remote Config |
| Build | Cordova |