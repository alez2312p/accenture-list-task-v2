# Accenture List Task - Ionic To-Do App

Aplicación de tareas (To-Do List) con Ionic y Angular, desarrollada como prueba técnica para Accenture.

## Características

- **Gestión de tareas**: Crear, editar, eliminar y marcar como completadas
- **Categorías**: Crear, editar y eliminar categorías con colores personalizados
- **Filtrado**: Filtrar tareas por categoría (modal scrolleable para 100+ categorías)
- **Diseño mobile-first**: Optimizado para dispositivos móviles
- **Persistencia**: Datos guardados en localStorage

## Requisitos del Entorno

| Herramienta | Versión Mínima | Versión Recomendada |
| ----------- | -------------- | ------------------- |
| Node.js     | 18+            | **22.x**            |
| npm         | 9+             | **11.x**            |
| Java JDK    | 17             | **17**              |
| Gradle      | 8.7+           | **8.7**             |
| Android SDK | 35             | **36**              |

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/alez2312p/accenture-list-task
cd accenture-list-task

# Instalar dependencias
npm install

# Instalar plataformas
# Android
ionic cordova platform add android@14

# iOS
# ionic cordova platform add ios@8.0.1
```

## Ejecución

```bash
# Desarrollo (web)
ionic serve

# Ejecutar en Android (emulador/dispositivo)
ionic cordova run android

# Ejecutar en iOS
# ionic cordova run ios
```

## Build

```bash
# Build Android (debug)
ionic cordova build android

# Build Android (release)
ionic cordova build android --release

# Build iOS
ionic cordova build ios

# Generar APK firmado (Android)
# Ubicación: platforms/android/app/build/outputs/apk/
```

## Estructura del Proyecto

```
src/app/
├── models/                    # Modelos de datos
│   ├── task.model.ts
│   └── category.model.ts
├── services/                  # Servicios
│   ├── task.service.ts
│   └── category.service.ts
├── components/              # Componentes reutilizables
│   ├── confirm-modal/       # Modal de confirmación
│   ├── form-modal/       # Modal de formulario
│   └── task-form/       # Formulario de tarea
├── home/                  # Página de tareas
├── categories/            # Página de categorías
└── tabs/                # Navegación por tabs

platforms/
├── android/            # Plataforma Android
│   └── app/build/outputs/apk/  # APKs generados
└── ios/                # Plataforma iOS (requiere Mac para generar IPA)
    └── [IPA location when built]
```

## Arquitectura

- **Angular 20 + Ionic 8** con Signals para estado reactivo
- **Components reutilizables** para modales y formularios
- **Diseño mobile-first** optimizado para listas con 100+ items
- **Lazy loading** de rutas para mejor rendimiento

## Firebase & Remote Config

La aplicación está configurada con Firebase y utiliza Remote Config para un feature flag que controla la visibilidad del botón de edición de tareas.

### Configuración Inicial

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Agregar app web al proyecto
3. Habilitar Remote Config en el menú izquierdo
4. Las credenciales ya están configuradas en `src/environments/environment.ts` y `src/environments/environment.prod.ts`

### Prueba del Feature Flag

Para verificar el funcionamiento del feature flag `show_edit_button`:

1. Acceder a Firebase Console > Proyecto > Remote Config
2. Asegurarse de que exista el parámetro `show_edit_button` (tipo: Booleano)
3. Cambiar el valor a `true` para mostrar el botón de edición o `false` para ocultarlo
4. Click en "Publicar cambios"
5. Recargar la aplicación (o hacer pull-to-refresh si se ejecuta en dispositivo)
6. Verificar que el botón de edición aparece/desaparece según el valor configurado

El feature flag está implementado en `src/app/core/services/config.service.ts` y consumido en `src/app/home/home.page.html` para controlar la visibilidad del botón de edición de tareas.

## ⚠️ Nota sobre seguridad de Firebase

La configuración de Firebase incluida contiene API Keys y IDs de proyecto que, según la [documentación oficial de Firebase](https://firebase.google.com/docs/projects/api-keys), están diseñados para ser expuestos en código cliente. La seguridad de los datos de Firebase proviene de las Rules de Firebase, no de ocultar estas credenciales.

En esta implementación:
- Firebase se usa **exclusivamente para Remote Config** (feature flag que controla la visibilidad del botón de edición)
- Los datos de la aplicación se almacenan en **localStorage** (no en Firebase)
- Por lo tanto, incluso si se expusieran estas credenciales, el impacto estaría limitado a la configuración de Remote Config

Para producción con almacenamiento de datos en Firebase, se recomendaría:
- Revisar y ajustar las Firebase Rules siguiendo el principio de privilegio mínimo
- Considerar Firebase App Check para validar que solo tu aplicación acceda a los recursos

## Licencia

MIT
