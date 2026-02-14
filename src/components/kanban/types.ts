export interface KanbanCardData {
  id: string;
  title: string;
  type: "task" | "bug" | "feature";
  priority: "low" | "medium" | "high" | "critical";
  assignee: { initials: string; name: string };
  dueDate?: string;
  commentsCount: number;
  description?: string;
  comments?: CardComment[];
}

export interface CardComment {
  user: string;
  initials: string;
  text: string;
  time: string;
}

export interface ColumnConfig {
  id: string;
  title: string;
  color: string;
}

export interface KanbanBoardConfig {
  columns: ColumnConfig[];
  /** Column IDs to merge when in client view (e.g. merge "qa" into "review") */
  clientMergeMap?: Record<string, string>;
}

export const TYPE_STYLES: Record<KanbanCardData["type"], string> = {
  task: "bg-blue-100 text-blue-800",
  bug: "bg-red-100 text-red-800",
  feature: "bg-purple-100 text-purple-800",
};

export const TYPE_LABELS: Record<KanbanCardData["type"], string> = {
  task: "Task",
  bug: "Bug",
  feature: "Feature",
};

export const PRIORITY_STYLES: Record<KanbanCardData["priority"], string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

export const PRIORITY_LABELS: Record<KanbanCardData["priority"], string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  critical: "Crítica",
};

export const INTERNAL_COLUMNS: ColumnConfig[] = [
  { id: "backlog", title: "Backlog", color: "bg-gray-400" },
  { id: "in_progress", title: "En Progreso", color: "bg-blue-500" },
  { id: "review", title: "Review", color: "bg-yellow-500" },
  { id: "qa", title: "QA", color: "bg-purple-500" },
  { id: "done", title: "Done", color: "bg-green-500" },
];

export const CLIENT_COLUMNS: ColumnConfig[] = [
  { id: "backlog", title: "Pendiente", color: "bg-gray-400" },
  { id: "in_progress", title: "En Desarrollo", color: "bg-blue-500" },
  { id: "review", title: "En Revisión", color: "bg-yellow-500" },
  { id: "done", title: "Completado", color: "bg-green-500" },
];

/** Default merge map: QA cards appear inside Review when in client view */
export const DEFAULT_CLIENT_MERGE: Record<string, string> = {
  qa: "review",
};
