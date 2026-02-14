import {
  FolderKanban,
  CheckCircle2,
  Bug,
  Flag,
  TrendingUp,
} from "lucide-react";

const metrics = [
  { label: "Proyectos Activos", value: "5", icon: FolderKanban, color: "text-chart-1" },
  { label: "Tareas Completadas", value: "23", icon: CheckCircle2, color: "text-chart-2" },
  { label: "Bugs Abiertos", value: "3", icon: Bug, color: "text-destructive" },
  { label: "Próximo Hito", value: "2 días", icon: Flag, color: "text-chart-4" },
];

const activity = [
  { user: "Juan Díaz", action: "completó la tarea", target: "#45 - Diseño del header", time: "Hace 5 min", color: "bg-chart-2" },
  { user: "María López", action: "reportó el bug", target: "#12 - Error en login", time: "Hace 15 min", color: "bg-destructive" },
  { user: "Carlos Ruiz", action: "avanzó el hito", target: '"MVP" al 80%', time: "Hace 1 hora", color: "bg-chart-4" },
  { user: "Ana Torres", action: "comentó en", target: "#38 - API de pagos", time: "Hace 2 horas", color: "bg-chart-1" },
  { user: "Pedro Gómez", action: "completó la tarea", target: "#41 - Tests unitarios", time: "Hace 3 horas", color: "bg-chart-2" },
];

const projects = [
  { name: "E-Commerce Platform", progress: 72, status: "active" },
  { name: "App Móvil FinTrack", progress: 45, status: "active" },
  { name: "Dashboard Analytics", progress: 90, status: "active" },
  { name: "API Gateway", progress: 30, status: "active" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Resumen general de tus proyectos</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{m.label}</span>
              <m.icon className={`h-5 w-5 ${m.color}`} />
            </div>
            <div className="mt-2 text-3xl font-bold">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity feed */}
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Actividad Reciente</h2>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.color}`} />
                <div className="flex-1 text-sm">
                  <span className="font-medium">{a.user}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="font-medium">{a.target}</span>
                  <div className="mt-0.5 text-xs text-muted-foreground">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects progress */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Progreso de Proyectos</h2>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground">{p.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <a
            href="/app/proyectos"
            className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
          >
            Ver todos los proyectos
          </a>
        </div>
      </div>
    </div>
  );
}
