import { useState, useMemo } from "react";
import KanbanBoard from "../kanban/KanbanBoard";
import MilestoneTracker from "../kanban/MilestoneTracker";
import { Eye, EyeOff } from "lucide-react";
import {
  INTERNAL_COLUMNS,
  CLIENT_COLUMNS,
  DEFAULT_CLIENT_MERGE,
  type KanbanCardData,
} from "../kanban/types";

// ─── Mock data (would come from API in real app) ──────────

const projectsMock: Record<string, { name: string; description: string }> = {
  "1": { name: "E-Commerce Platform", description: "Plataforma de comercio electrónico con catálogo, carrito y pasarela de pagos." },
  "2": { name: "App Móvil FinTrack", description: "Aplicación móvil para seguimiento de finanzas personales e inversiones." },
  "3": { name: "Dashboard Analytics", description: "Panel de control con métricas en tiempo real y generación de reportes." },
  "4": { name: "API Gateway", description: "Gateway centralizado para microservicios con autenticación y rate limiting." },
  "5": { name: "Portal Educativo", description: "Plataforma de cursos online con video streaming y sistema de evaluaciones." },
};

const cardsByProject: Record<string, Record<string, KanbanCardData[]>> = {
  "1": {
    backlog: [
      { id: "t1", title: "Configurar CI/CD pipeline", type: "task", priority: "medium", assignee: { initials: "CR", name: "Carlos Ruiz" }, dueDate: "Feb 20", commentsCount: 1, comments: [{ user: "Carlos Ruiz", initials: "CR", text: "Necesitamos definir los stages del pipeline.", time: "Hace 3 días" }] },
      { id: "t2", title: "Diseñar sistema de notificaciones", type: "feature", priority: "low", assignee: { initials: "AT", name: "Ana Torres" }, dueDate: "Feb 25", commentsCount: 0, comments: [] },
      { id: "t3", title: "Documentar API endpoints", type: "task", priority: "low", assignee: { initials: "PG", name: "Pedro Gómez" }, commentsCount: 0, comments: [] },
    ],
    in_progress: [
      { id: "t4", title: "Implementar autenticación JWT", type: "feature", priority: "high", assignee: { initials: "JD", name: "Juan Díaz" }, dueDate: "Feb 15", commentsCount: 3, comments: [{ user: "Juan Díaz", initials: "JD", text: "Usando RS256 para los tokens.", time: "Hace 2 horas" }, { user: "María López", initials: "ML", text: "No olvides el refresh token.", time: "Hace 1 hora" }, { user: "Juan Díaz", initials: "JD", text: "Sí, ya está incluido en el flow.", time: "Hace 30 min" }] },
      { id: "t5", title: "Error en validación de formulario", type: "bug", priority: "critical", assignee: { initials: "ML", name: "María López" }, dueDate: "Feb 14", commentsCount: 2, comments: [{ user: "Cliente", initials: "CL", text: "El formulario no valida emails correctamente.", time: "Hace 1 día" }, { user: "María López", initials: "ML", text: "Estoy trabajando en el fix.", time: "Hace 5 horas" }] },
      { id: "t6", title: "Diseño responsive del dashboard", type: "task", priority: "medium", assignee: { initials: "JD", name: "Juan Díaz" }, dueDate: "Feb 18", commentsCount: 1, comments: [{ user: "Juan Díaz", initials: "JD", text: "Empezando por mobile-first.", time: "Hace 4 horas" }] },
    ],
    review: [
      { id: "t7", title: "Integración pasarela de pagos", type: "feature", priority: "high", assignee: { initials: "CR", name: "Carlos Ruiz" }, dueDate: "Feb 16", commentsCount: 5, description: "Integrar Stripe como pasarela de pagos principal. Incluir webhooks para confirmar transacciones.", comments: [{ user: "Carlos Ruiz", initials: "CR", text: "PR listo para review.", time: "Hace 6 horas" }, { user: "Juan Díaz", initials: "JD", text: "Revisando ahora.", time: "Hace 4 horas" }] },
      { id: "t8", title: "Optimizar consultas de base de datos", type: "task", priority: "medium", assignee: { initials: "PG", name: "Pedro Gómez" }, commentsCount: 2, comments: [{ user: "Pedro Gómez", initials: "PG", text: "Queries optimizadas, 60% más rápido.", time: "Hace 8 horas" }] },
    ],
    qa: [
      { id: "t9", title: "Tests E2E para checkout", type: "task", priority: "high", assignee: { initials: "AT", name: "Ana Torres" }, dueDate: "Feb 17", commentsCount: 1, comments: [{ user: "Ana Torres", initials: "AT", text: "Tests pasando en todos los browsers.", time: "Hace 2 horas" }] },
    ],
    done: [
      { id: "t10", title: "Setup del proyecto base", type: "task", priority: "medium", assignee: { initials: "JD", name: "Juan Díaz" }, commentsCount: 0, comments: [] },
      { id: "t11", title: "Diseño del header y navegación", type: "task", priority: "low", assignee: { initials: "ML", name: "María López" }, commentsCount: 2, comments: [{ user: "María López", initials: "ML", text: "Header finalizado.", time: "Hace 3 días" }] },
      { id: "t12", title: "Modelo de datos del usuario", type: "feature", priority: "medium", assignee: { initials: "CR", name: "Carlos Ruiz" }, commentsCount: 1, comments: [] },
    ],
  },
};

// Fallback: generate empty columns for projects without specific data
function getCardsForProject(id: string): Record<string, KanbanCardData[]> {
  if (cardsByProject[id]) return cardsByProject[id];
  return Object.fromEntries(INTERNAL_COLUMNS.map((col) => [col.id, []]));
}

const milestonesByProject: Record<string, { id: number; title: string; dueDate: string; progress: number; status: "pending" | "in_progress" | "completed" }[]> = {
  "1": [
    { id: 1, title: "MVP - Funcionalidad Core", dueDate: "Feb 28", progress: 70, status: "in_progress" },
    { id: 2, title: "Beta - Integración Pagos", dueDate: "Mar 15", progress: 40, status: "in_progress" },
    { id: 3, title: "Launch - Producción", dueDate: "Abr 01", progress: 10, status: "pending" },
  ],
  "2": [
    { id: 4, title: "Prototipo UI", dueDate: "Ene 30", progress: 100, status: "completed" },
    { id: 5, title: "MVP Móvil", dueDate: "Mar 01", progress: 45, status: "in_progress" },
  ],
  "3": [
    { id: 6, title: "Dashboard v1", dueDate: "Feb 20", progress: 90, status: "in_progress" },
  ],
};

// ─── Component ────────────────────────────────────────────

interface ProjectDetailProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const [isClientView, setIsClientView] = useState(false);

  const project = projectsMock[projectId] || { name: `Proyecto #${projectId}`, description: "" };
  const milestones = milestonesByProject[projectId] || [];
  const cards = getCardsForProject(projectId);

  const activeColumns = isClientView ? CLIENT_COLUMNS : INTERNAL_COLUMNS;

  // In client view, merge QA cards into Review
  const resolvedCards = useMemo(() => {
    if (!isClientView) return cards;

    const merged = { ...cards };
    for (const [source, target] of Object.entries(DEFAULT_CLIENT_MERGE)) {
      if (merged[source]?.length) {
        merged[target] = [...(merged[target] || []), ...merged[source]];
        merged[source] = [];
      }
    }
    return merged;
  }, [isClientView, cards]);

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Project header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
        <button
          onClick={() => setIsClientView(!isClientView)}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-accent"
        >
          {isClientView ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          {isClientView ? "Vista Interna" : "Vista Cliente"}
        </button>
      </div>

      {/* Milestones */}
      {milestones.length > 0 && <MilestoneTracker milestones={milestones} />}

      {/* Reusable Kanban Board */}
      <KanbanBoard
        columns={activeColumns}
        initialCards={resolvedCards}
        isClientView={isClientView}
        readonly={isClientView}
        currentUser={
          isClientView
            ? { name: "María González", initials: "MG" }
            : { name: "Juan Díaz", initials: "JD" }
        }
      />
    </div>
  );
}
