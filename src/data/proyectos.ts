export interface Proyecto {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "paused";
  clientId: string;
  progress: number;
  startDate: string;
  endDate: string;
  teamIds: string[];
}

export const proyectos: Proyecto[] = [
  {
    id: "prj-001",
    name: "Portal E-Commerce Delgado",
    description:
      "Plataforma de comercio electrónico completa con catálogo de productos, carrito de compras, pasarela de pagos y panel de administración para el cliente.",
    status: "active",
    clientId: "usr-005",
    progress: 65,
    startDate: "2025-09-15",
    endDate: "2026-03-30",
    teamIds: ["usr-001", "usr-002", "usr-004"],
  },
  {
    id: "prj-002",
    name: "App Gestión Interna Castillo",
    description:
      "Aplicación web interna para gestión de inventario, seguimiento de pedidos y generación de reportes en tiempo real para la cadena de tiendas del cliente.",
    status: "active",
    clientId: "usr-006",
    progress: 40,
    startDate: "2025-11-01",
    endDate: "2026-05-15",
    teamIds: ["usr-002", "usr-003"],
  },
  {
    id: "prj-003",
    name: "Rediseño Web Corporativa",
    description:
      "Rediseño completo del sitio corporativo con enfoque mobile-first, optimización SEO y nuevo sistema de blog integrado con CMS headless.",
    status: "completed",
    clientId: "usr-005",
    progress: 100,
    startDate: "2025-04-01",
    endDate: "2025-08-20",
    teamIds: ["usr-001", "usr-004"],
  },
  {
    id: "prj-004",
    name: "API de Integración Logística",
    description:
      "Desarrollo de API REST para integrar el sistema de gestión del cliente con proveedores de logística externos, incluyendo tracking en tiempo real.",
    status: "paused",
    clientId: "usr-006",
    progress: 25,
    startDate: "2025-12-10",
    endDate: "2026-06-01",
    teamIds: ["usr-003"],
  },
  {
    id: "prj-005",
    name: "Dashboard Analytics",
    description:
      "Panel de analíticas interactivo con visualización de datos de ventas, métricas de rendimiento y generación de informes exportables en PDF.",
    status: "active",
    clientId: "usr-005",
    progress: 80,
    startDate: "2025-08-01",
    endDate: "2026-02-28",
    teamIds: ["usr-001", "usr-002", "usr-003", "usr-004"],
  },
];
