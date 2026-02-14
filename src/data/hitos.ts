export interface Hito {
  id: string;
  projectId: string;
  title: string;
  dueDate: string;
  progress: number;
  status: "pending" | "in_progress" | "completed";
}

export const hitos: Hito[] = [
  // Portal E-Commerce Delgado (prj-001)
  {
    id: "hit-001",
    projectId: "prj-001",
    title: "Diseño de wireframes y prototipo",
    dueDate: "2025-10-15",
    progress: 100,
    status: "completed",
  },
  {
    id: "hit-002",
    projectId: "prj-001",
    title: "Desarrollo del catálogo y carrito",
    dueDate: "2025-12-20",
    progress: 100,
    status: "completed",
  },
  {
    id: "hit-003",
    projectId: "prj-001",
    title: "Integración pasarela de pagos",
    dueDate: "2026-02-15",
    progress: 70,
    status: "in_progress",
  },
  {
    id: "hit-004",
    projectId: "prj-001",
    title: "Panel de administración y lanzamiento",
    dueDate: "2026-03-30",
    progress: 0,
    status: "pending",
  },

  // App Gestión Interna Castillo (prj-002)
  {
    id: "hit-005",
    projectId: "prj-002",
    title: "Definición de requerimientos y arquitectura",
    dueDate: "2025-12-01",
    progress: 100,
    status: "completed",
  },
  {
    id: "hit-006",
    projectId: "prj-002",
    title: "Módulo de inventario",
    dueDate: "2026-02-28",
    progress: 55,
    status: "in_progress",
  },
  {
    id: "hit-007",
    projectId: "prj-002",
    title: "Módulo de pedidos y reportes",
    dueDate: "2026-04-15",
    progress: 0,
    status: "pending",
  },
  {
    id: "hit-008",
    projectId: "prj-002",
    title: "QA final y despliegue",
    dueDate: "2026-05-15",
    progress: 0,
    status: "pending",
  },

  // API de Integración Logística (prj-004)
  {
    id: "hit-009",
    projectId: "prj-004",
    title: "Diseño de endpoints y documentación OpenAPI",
    dueDate: "2026-01-15",
    progress: 100,
    status: "completed",
  },
  {
    id: "hit-010",
    projectId: "prj-004",
    title: "Implementación de endpoints core",
    dueDate: "2026-03-15",
    progress: 10,
    status: "in_progress",
  },
  {
    id: "hit-011",
    projectId: "prj-004",
    title: "Integración con proveedores y testing",
    dueDate: "2026-05-01",
    progress: 0,
    status: "pending",
  },

  // Dashboard Analytics (prj-005)
  {
    id: "hit-012",
    projectId: "prj-005",
    title: "Componentes de visualización de datos",
    dueDate: "2025-10-30",
    progress: 100,
    status: "completed",
  },
  {
    id: "hit-013",
    projectId: "prj-005",
    title: "Conexión con fuentes de datos en vivo",
    dueDate: "2025-12-20",
    progress: 100,
    status: "completed",
  },
  {
    id: "hit-014",
    projectId: "prj-005",
    title: "Exportación de informes PDF y cierre",
    dueDate: "2026-02-28",
    progress: 60,
    status: "in_progress",
  },
];
