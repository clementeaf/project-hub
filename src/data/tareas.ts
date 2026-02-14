export interface TareaComment {
  userId: string;
  text: string;
  date: string;
}

export interface Tarea {
  id: string;
  projectId: string;
  title: string;
  description: string;
  type: "task" | "bug" | "feature";
  priority: "low" | "medium" | "high" | "critical";
  status: "backlog" | "in_progress" | "review" | "qa" | "done";
  assigneeId: string;
  dueDate: string;
  comments: TareaComment[];
  createdAt: string;
}

export const tareas: Tarea[] = [
  // ── Portal E-Commerce Delgado (prj-001) ──────────────────────────
  {
    id: "tsk-001",
    projectId: "prj-001",
    title: "Implementar flujo de checkout",
    description:
      "Crear el flujo completo de checkout: resumen del carrito, datos de envío, selección de método de pago y confirmación del pedido.",
    type: "feature",
    priority: "high",
    status: "in_progress",
    assigneeId: "usr-002",
    dueDate: "2026-02-20",
    comments: [
      {
        userId: "usr-001",
        text: "Usar el componente Stepper que ya tenemos en el design system.",
        date: "2026-02-05",
      },
      {
        userId: "usr-002",
        text: "De acuerdo. Ya tengo el paso 1 y 2 listos, falta integrar la pasarela.",
        date: "2026-02-07",
      },
    ],
    createdAt: "2026-01-28",
  },
  {
    id: "tsk-002",
    projectId: "prj-001",
    title: "Corregir cálculo de impuestos en carrito",
    description:
      "El IVA se calcula sobre el subtotal sin descuentos. Debe aplicarse después de los descuentos según normativa fiscal vigente.",
    type: "bug",
    priority: "critical",
    status: "review",
    assigneeId: "usr-004",
    dueDate: "2026-02-14",
    comments: [
      {
        userId: "usr-004",
        text: "Fix aplicado. Ahora el IVA se calcula post-descuento. Agregué tests unitarios.",
        date: "2026-02-12",
      },
    ],
    createdAt: "2026-02-10",
  },
  {
    id: "tsk-003",
    projectId: "prj-001",
    title: "Diseñar emails transaccionales",
    description:
      "Crear templates HTML responsivos para: confirmación de pedido, envío despachado, entrega completada y recuperación de contraseña.",
    type: "task",
    priority: "medium",
    status: "backlog",
    assigneeId: "usr-004",
    dueDate: "2026-03-01",
    comments: [],
    createdAt: "2026-02-01",
  },
  {
    id: "tsk-004",
    projectId: "prj-001",
    title: "Integrar webhook de Stripe",
    description:
      "Configurar endpoint para recibir eventos de Stripe: payment_intent.succeeded, charge.refunded y dispute.created. Actualizar estado del pedido automáticamente.",
    type: "feature",
    priority: "high",
    status: "backlog",
    assigneeId: "usr-002",
    dueDate: "2026-02-25",
    comments: [
      {
        userId: "usr-001",
        text: "Prioridad alta, bloquea el hito de pasarela de pagos.",
        date: "2026-02-08",
      },
    ],
    createdAt: "2026-02-03",
  },
  {
    id: "tsk-005",
    projectId: "prj-001",
    title: "Optimizar imágenes del catálogo con lazy loading",
    description:
      "Implementar carga diferida de imágenes en la grilla de productos y usar formato WebP con fallback a JPEG. Reducir LCP a menos de 2.5s.",
    type: "task",
    priority: "medium",
    status: "done",
    assigneeId: "usr-002",
    dueDate: "2026-01-30",
    comments: [
      {
        userId: "usr-002",
        text: "Implementado con next/image. LCP bajó de 3.8s a 1.9s.",
        date: "2026-01-29",
      },
    ],
    createdAt: "2026-01-15",
  },

  // ── App Gestión Interna Castillo (prj-002) ────────────────────────
  {
    id: "tsk-006",
    projectId: "prj-002",
    title: "CRUD de productos en inventario",
    description:
      "Crear formulario de alta/edición de productos con validación, tabla con filtros avanzados, búsqueda y paginación server-side.",
    type: "feature",
    priority: "high",
    status: "in_progress",
    assigneeId: "usr-003",
    dueDate: "2026-02-20",
    comments: [
      {
        userId: "usr-003",
        text: "Tabla lista con filtros. Falta el formulario de edición inline.",
        date: "2026-02-10",
      },
    ],
    createdAt: "2026-01-20",
  },
  {
    id: "tsk-007",
    projectId: "prj-002",
    title: "Lector de código de barras",
    description:
      "Integrar librería de escaneo de códigos de barras vía cámara del dispositivo para dar de alta productos rápidamente desde el almacén.",
    type: "feature",
    priority: "medium",
    status: "backlog",
    assigneeId: "usr-003",
    dueDate: "2026-03-10",
    comments: [],
    createdAt: "2026-02-05",
  },
  {
    id: "tsk-008",
    projectId: "prj-002",
    title: "Bug: stock negativo al cancelar pedido",
    description:
      "Cuando se cancela un pedido que ya descontó stock, la reversión suma doble si el usuario hace clic dos veces en el botón de cancelar.",
    type: "bug",
    priority: "high",
    status: "qa",
    assigneeId: "usr-002",
    dueDate: "2026-02-15",
    comments: [
      {
        userId: "usr-002",
        text: "Agregué mutex optimista y deshabilité el botón tras el primer clic.",
        date: "2026-02-11",
      },
      {
        userId: "usr-003",
        text: "Probado en staging, parece resuelto. Paso a QA formal.",
        date: "2026-02-12",
      },
    ],
    createdAt: "2026-02-09",
  },
  {
    id: "tsk-009",
    projectId: "prj-002",
    title: "Configurar roles y permisos",
    description:
      "Implementar sistema RBAC con roles: admin, supervisor, operador. Cada rol tiene acceso diferenciado a módulos y acciones.",
    type: "task",
    priority: "high",
    status: "review",
    assigneeId: "usr-003",
    dueDate: "2026-02-18",
    comments: [
      {
        userId: "usr-001",
        text: "Revisar que el middleware de Next.js valide permisos correctamente en rutas protegidas.",
        date: "2026-02-13",
      },
    ],
    createdAt: "2026-01-25",
  },

  // ── Dashboard Analytics (prj-005) ─────────────────────────────────
  {
    id: "tsk-010",
    projectId: "prj-005",
    title: "Gráfico de ventas mensual interactivo",
    description:
      "Crear gráfico de líneas con Recharts que muestre ventas mensuales, con tooltip detallado, zoom y comparación año anterior.",
    type: "feature",
    priority: "medium",
    status: "done",
    assigneeId: "usr-004",
    dueDate: "2025-11-15",
    comments: [
      {
        userId: "usr-004",
        text: "Listo con animaciones y modo responsive.",
        date: "2025-11-14",
      },
    ],
    createdAt: "2025-10-20",
  },
  {
    id: "tsk-011",
    projectId: "prj-005",
    title: "Exportar dashboard a PDF",
    description:
      "Permitir al usuario exportar el estado actual del dashboard como PDF con gráficos renderizados, tablas y resumen ejecutivo.",
    type: "feature",
    priority: "high",
    status: "in_progress",
    assigneeId: "usr-001",
    dueDate: "2026-02-25",
    comments: [
      {
        userId: "usr-001",
        text: "Usando html2canvas + jsPDF. Los gráficos SVG necesitan conversión previa.",
        date: "2026-02-10",
      },
    ],
    createdAt: "2026-01-30",
  },
  {
    id: "tsk-012",
    projectId: "prj-005",
    title: "Bug: filtro de fechas no resetea al cambiar vista",
    description:
      "Al cambiar entre las vistas Semanal/Mensual/Anual el rango de fechas seleccionado persiste, mostrando datos incorrectos en la nueva vista.",
    type: "bug",
    priority: "medium",
    status: "done",
    assigneeId: "usr-003",
    dueDate: "2026-01-20",
    comments: [
      {
        userId: "usr-003",
        text: "El estado del filtro ahora se resetea con useEffect al cambiar la vista.",
        date: "2026-01-19",
      },
    ],
    createdAt: "2026-01-15",
  },
  {
    id: "tsk-013",
    projectId: "prj-005",
    title: "Widget de KPIs en tiempo real",
    description:
      "Crear componentes de tarjetas KPI (ingresos, pedidos, ticket promedio, tasa de conversión) con actualización vía WebSocket cada 30 segundos.",
    type: "feature",
    priority: "medium",
    status: "done",
    assigneeId: "usr-002",
    dueDate: "2025-12-10",
    comments: [
      {
        userId: "usr-002",
        text: "Usando Server-Sent Events en vez de WebSocket por simplicidad. El cliente aprobó.",
        date: "2025-12-08",
      },
    ],
    createdAt: "2025-11-20",
  },
  {
    id: "tsk-014",
    projectId: "prj-005",
    title: "Tabla de transacciones con paginación",
    description:
      "Implementar tabla de transacciones recientes con sorting por columna, filtros por estado y monto, y paginación server-side con cursor.",
    type: "task",
    priority: "low",
    status: "review",
    assigneeId: "usr-004",
    dueDate: "2026-02-20",
    comments: [
      {
        userId: "usr-004",
        text: "Usé TanStack Table v8. El cursor de paginación viene del API.",
        date: "2026-02-13",
      },
    ],
    createdAt: "2026-02-01",
  },

  // ── API de Integración Logística (prj-004) ────────────────────────
  {
    id: "tsk-015",
    projectId: "prj-004",
    title: "Definir esquema OpenAPI 3.1",
    description:
      "Documentar todos los endpoints planificados con esquemas de request/response, códigos de error y ejemplos en formato OpenAPI 3.1.",
    type: "task",
    priority: "high",
    status: "done",
    assigneeId: "usr-003",
    dueDate: "2026-01-10",
    comments: [
      {
        userId: "usr-003",
        text: "Spec publicada en /docs. Incluye 12 endpoints y esquemas de error estandarizados.",
        date: "2026-01-09",
      },
    ],
    createdAt: "2025-12-15",
  },
  {
    id: "tsk-016",
    projectId: "prj-004",
    title: "Endpoint POST /shipments",
    description:
      "Implementar endpoint para crear envíos. Debe validar datos del paquete, dirección y seleccionar proveedor según reglas de negocio configurables.",
    type: "feature",
    priority: "high",
    status: "in_progress",
    assigneeId: "usr-003",
    dueDate: "2026-03-01",
    comments: [],
    createdAt: "2026-01-12",
  },
  {
    id: "tsk-017",
    projectId: "prj-004",
    title: "Rate limiting y autenticación JWT",
    description:
      "Configurar autenticación con JWT (RS256), refresh tokens y rate limiting de 100 req/min por API key para proteger los endpoints públicos.",
    type: "task",
    priority: "critical",
    status: "backlog",
    assigneeId: "usr-003",
    dueDate: "2026-02-28",
    comments: [
      {
        userId: "usr-001",
        text: "Esto es bloqueante antes de exponer la API al exterior. Subir prioridad.",
        date: "2026-02-06",
      },
    ],
    createdAt: "2026-01-20",
  },
  {
    id: "tsk-018",
    projectId: "prj-001",
    title: "Agregar filtros avanzados al catálogo",
    description:
      "Implementar filtros por categoría, rango de precio, valoración y disponibilidad con actualización de URL params para compartir búsquedas.",
    type: "feature",
    priority: "medium",
    status: "qa",
    assigneeId: "usr-004",
    dueDate: "2026-02-18",
    comments: [
      {
        userId: "usr-004",
        text: "Filtros funcionan con nuqs para sincronizar con URL. En QA.",
        date: "2026-02-12",
      },
    ],
    createdAt: "2026-01-22",
  },
];
