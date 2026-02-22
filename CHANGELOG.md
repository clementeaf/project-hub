# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [0.0.1] - 2025-01-XX

### Added

#### Landing Page
- Hero section, sección de servicios, proceso de trabajo y testimonios
- Página de contacto con formulario interactivo (nombre, email, empresa, mensaje) y validación client-side
- Página de agendar con calendario custom (navegación por mes, deshabilitación de fines de semana y fechas pasadas) y grilla de horarios
- Layout compartido (`LandingLayout`) con navbar y footer

#### Autenticación (UI)
- Página de login con campos email/password y botones de OAuth (Google, GitHub)
- Página de registro con campos nombre, email, password y confirmación
- Redirección a `/app` al submit (sin auth real implementada)

#### App — Dashboard
- Layout de aplicación con sidebar colapsable y header con breadcrumbs
- Sidebar con navegación activa por ruta, badge de rol y toggle de colapso
- Header con sistema de notificaciones (hardcoded) y dropdown de usuario
- Vista de dashboard con métricas, feed de actividad y barras de progreso por proyecto
- Lista de proyectos con cards detalladas (progreso, equipo, tareas, bugs)
- Página de reportes con métricas estáticas y placeholder de burndown chart
- Página de configuración con perfil y toggles de notificaciones

#### App — Kanban Board
- Board completo con drag & drop real usando `@dnd-kit/core` y `@dnd-kit/sortable`
- Columnas: Backlog, En Progreso, Revisión, QA, Completado
- Cards con badges de tipo y prioridad, drag handle en hover
- `DragOverlay` con ghost card durante el arrastre
- Modal de detalle con assignee, fecha, descripción y thread de comentarios
- Barra de filtros funcional (búsqueda por título, filtro por tipo y prioridad)
- Milestone tracker con barras de progreso individuales y promedio general
- Sistema de vista interna vs. vista cliente (remapea columnas, oculta QA, cambia identidad de usuario)

#### Data Layer
- Módulos tipados en `src/data/`: proyectos, tareas, usuarios, hitos, servicios
- Tipos compartidos en `src/components/kanban/types.ts` con definición de columnas internas y de cliente

#### Infraestructura
- Proyecto Astro 5 con integración React 19
- UI components basados en shadcn/ui (Button, Card, Dialog, Input, Badge, Avatar, Dropdown, Tabs, Select, Calendar)
- Tailwind CSS 4 con plugin Vite
- Utilidad `cn()` con `clsx` + `tailwind-merge`

### Known Limitations
- Los formularios de contacto y agendar no envían datos (solo cambian estado local)
- Auth es solo UI — no hay librería de autenticación ni protección de rutas
- Todos los datos del dashboard y app son hardcodeados inline en cada componente
- Los módulos de `src/data/` están definidos pero no son consumidos por los componentes
- Los movimientos del Kanban y comentarios se pierden al recargar la página
- Solo el proyecto ID "1" tiene datos de cards; los demás muestran boards vacíos
- Reportes muestra un placeholder para el burndown chart
- Configuración no persiste cambios

## [Unreleased]

### Planned
- Integración de backend (Supabase o similar)
- Autenticación real con protección de rutas
- Persistencia de datos del Kanban
- Cableado de `src/data/` como fuente única de datos
- Formularios de landing conectados a servicio de email/booking
- Gráficos reales en reportes
