import { FolderKanban, Clock, Users, ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Plataforma de comercio electrónico con catálogo, carrito y pasarela de pagos.",
    status: "active" as const,
    progress: 72,
    client: "María González",
    team: ["JD", "ML", "CR"],
    startDate: "2025-10-01",
    tasksTotal: 45,
    tasksDone: 32,
    bugsOpen: 2,
  },
  {
    id: 2,
    name: "App Móvil FinTrack",
    description: "Aplicación móvil para seguimiento de finanzas personales e inversiones.",
    status: "active" as const,
    progress: 45,
    client: "Diego Fernández",
    team: ["JD", "AT"],
    startDate: "2025-12-15",
    tasksTotal: 38,
    tasksDone: 17,
    bugsOpen: 1,
  },
  {
    id: 3,
    name: "Dashboard Analytics",
    description: "Panel de control con métricas en tiempo real y generación de reportes.",
    status: "active" as const,
    progress: 90,
    client: "Carlos Mendoza",
    team: ["ML", "PG"],
    startDate: "2025-08-20",
    tasksTotal: 30,
    tasksDone: 27,
    bugsOpen: 0,
  },
  {
    id: 4,
    name: "API Gateway",
    description: "Gateway centralizado para microservicios con autenticación y rate limiting.",
    status: "active" as const,
    progress: 30,
    client: "Ana Rodríguez",
    team: ["CR", "PG", "JD"],
    startDate: "2026-01-10",
    tasksTotal: 25,
    tasksDone: 7,
    bugsOpen: 0,
  },
  {
    id: 5,
    name: "Portal Educativo",
    description: "Plataforma de cursos online con video streaming y sistema de evaluaciones.",
    status: "paused" as const,
    progress: 15,
    client: "María González",
    team: ["AT"],
    startDate: "2025-11-01",
    tasksTotal: 50,
    tasksDone: 8,
    bugsOpen: 0,
  },
];

const statusMap = {
  active: { label: "Activo", class: "bg-green-100 text-green-800" },
  completed: { label: "Completado", class: "bg-blue-100 text-blue-800" },
  paused: { label: "Pausado", class: "bg-yellow-100 text-yellow-800" },
};

export default function ProjectList() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <p className="text-sm text-muted-foreground">Gestiona y monitorea todos tus proyectos</p>
        </div>
        <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          <FolderKanban className="h-4 w-4" />
          Nuevo Proyecto
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.id}
            href={`/app/proyecto/${project.id}`}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="font-semibold group-hover:text-primary">{project.name}</h3>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusMap[project.status].class}`}>
                {statusMap[project.status].label}
              </span>
            </div>

            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{project.description}</p>

            {/* Progress */}
            <div className="mb-4">
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Progreso</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            {/* Meta info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {project.tasksTotal - project.tasksDone} tareas pendientes
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {project.team.length}
              </div>
            </div>

            {/* Team avatars */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex -space-x-2">
                {project.team.map((initials, i) => (
                  <div
                    key={i}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-muted text-[10px] font-medium"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
