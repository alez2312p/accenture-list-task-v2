# Accenture List Task - Ionic To-Do App

Aplicación de tareas (To-Do List) con Ionic y Angular, desarrollada como prueba técnica para Accenture.

## Características

### Gestión de Tareas

- **Estados**: Pendiente, En Proceso, Completada, Cancelada
- **Tracking de tiempo**: Muestra cuánto tiempo tardaste en completar cada tarea
- **Fecha límite**: Opcional, muestra "vencida", "hoy", "mañana" o fecha
- **Diseño Card**: Tarjetas visuales con barra de color según estado

### Funcionalidades

- **Swipe para cambiar estado**: Desliza a derecha para avanzar, izquierda para retroceder
- **Búsqueda**: Busca tareas por título
- **Ordenar**: Por fecha creación, fecha vencimiento, o alfabético
- **Filtrar por estado**: Filtra por estado con chips
- **Deshacer**: Recupera la última acción borrada
- **Exportar/Importar**: JSON para backup

### Categorías

- Crear, editar y eliminar categorías con colores personalizados
- Filtrar por categoría en página separada

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
├── config/                    # Configuraciones
│   └── task.config.ts         # Estados y opciones
├── models/                    # Modelos de datos
│   ├── task.model.ts
│   └── category.model.ts
├── pipes/                      # Pipes para formatting
│   ├── index.ts
│   └── task.pipes.ts          # timeSpent, formatDate, dueDate
├── services/                  # Servicios
│   ├── task.service.ts
│   └── category.service.ts
├── components/
│   ├── task-card/            # Componente de tarjeta
│   ├── task-form/            # Formulario de tarea
│   ├── confirm-modal/         # Modal de confirmación
│   └── form-modal/            # Modal de formulario
├── home/                     # Página principal
└── categories/               # Página de categorías
```

## Arquitectura

- **Angular 20 + Ionic 8** con Signals para estado reactivo
- **Componentes separados**: TaskCardComponent, Pipes, constantes
- **Diseño mobile-first**: Cards con swipe
- **Lazy loading** de rutas

## Estados de Tareas

| Estado     | Color    | Icono                    | Descripción |
| ---------- | -------- | ------------------------ | ----------- |
| Pendiente  | Gris     | ellipse-outline          | Nueva tarea |
| En Proceso | Amarillo | hourglass-outline        | Trabajando  |
| Completada | Verde    | checkmark-circle-outline | Finalizada  |
| Cancelada  | Rojo     | close-circle-outline     | Cancelada   |

## Tech Stack

| Tecnología | Versión |
| ---------- | ------- |
| Angular    | 20      |
| Ionic      | 8       |
| TypeScript | 5.9+    |
| Cordova    | -       |
| Ionicons   | 7.0.0   |

## Licencia

MIT
