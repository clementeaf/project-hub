# ProjectHub

Plataforma de consultoría y desarrollo para gestión de proyectos con tablero Kanban interactivo.

## Stack

- **Framework**: Astro 5 + React 19
- **Estilos**: Tailwind CSS 4
- **UI**: shadcn/ui (Radix primitives)
- **Drag & Drop**: @dnd-kit
- **Iconos**: Lucide React

## Estructura del proyecto

```
src/
├── components/
│   ├── landing/       # ContactForm, AgendarForm
│   ├── auth/          # LoginForm, RegisterForm
│   ├── app/           # Sidebar, Header, Dashboard, ProjectList, ProjectDetail
│   ├── kanban/        # KanbanBoard, KanbanColumn, KanbanCard, CardDetailModal, FilterBar, MilestoneTracker
│   └── ui/            # Button, Card, Dialog, Input, Badge, Avatar, Dropdown, Tabs, Select, Calendar
├── data/              # Mock data tipada (proyectos, tareas, usuarios, hitos, servicios)
├── layouts/           # LandingLayout, AppLayout
├── lib/               # Utilidades (cn)
├── pages/
│   ├── index.astro          # Landing page
│   ├── contacto.astro       # Formulario de contacto
│   ├── agendar.astro        # Agendar consulta
│   ├── login.astro          # Inicio de sesión
│   ├── registro.astro       # Registro
│   └── app/
│       ├── index.astro      # Dashboard
│       ├── proyectos.astro  # Lista de proyectos
│       ├── proyecto/[id].astro  # Detalle con Kanban
│       ├── reportes.astro   # Reportes
│       └── configuracion.astro  # Configuración
└── styles/            # Estilos globales
```

## Zonas de la aplicación

### 1. Landing Page (pública)
Sitio de presentación con hero, servicios, proceso, testimonios, formulario de contacto y sistema de agendamiento con calendario interactivo.

### 2. Auth (pública)
Login y registro con UI completa incluyendo botones OAuth (Google/GitHub). Actualmente solo UI sin backend de autenticación.

### 3. App (privada)
- **Dashboard**: Métricas generales, actividad reciente, progreso de proyectos
- **Proyectos**: Lista de proyectos con detalle individual
- **Kanban**: Tablero drag & drop con filtros, milestones y sistema de vista dual (interna/cliente)
- **Reportes**: Métricas de tareas y placeholder de burndown chart
- **Configuración**: Perfil y preferencias de notificaciones

## Estado actual

Prototipo funcional con UI completa. Sin backend integrado — todos los datos son mock data hardcodeada. Ver [CHANGELOG.md](./CHANGELOG.md) para detalle completo y limitaciones conocidas.

## Comandos

| Comando             | Acción                                       |
| :------------------ | :------------------------------------------- |
| `npm install`       | Instala dependencias                         |
| `npm run dev`       | Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build`     | Build de producción en `./dist/`             |
| `npm run preview`   | Preview del build local                      |
