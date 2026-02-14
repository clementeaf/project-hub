import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Calendar, MessageSquare } from "lucide-react";

export interface KanbanCardData {
  id: string;
  title: string;
  type: "task" | "bug" | "feature";
  priority: "low" | "medium" | "high" | "critical";
  assignee: { initials: string; name: string };
  dueDate?: string;
  commentsCount: number;
  description?: string;
}

const typeStyles = {
  task: "bg-blue-100 text-blue-800",
  bug: "bg-red-100 text-red-800",
  feature: "bg-purple-100 text-purple-800",
};

const typeLabels = { task: "Task", bug: "Bug", feature: "Feature" };

const priorityStyles = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

const priorityLabels = { low: "Baja", medium: "Media", high: "Alta", critical: "Crítica" };

interface Props {
  card: KanbanCardData;
  onClick?: () => void;
}

export default function KanbanCard({ card, onClick }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group cursor-pointer rounded-lg border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <div className="mb-2 flex items-start justify-between">
        <div className="flex flex-wrap gap-1.5">
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${typeStyles[card.type]}`}>
            {typeLabels[card.type]}
          </span>
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${priorityStyles[card.priority]}`}>
            {priorityLabels[card.priority]}
          </span>
        </div>
        <button
          className="cursor-grab touch-none text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      <h4 className="text-sm font-medium leading-snug">{card.title}</h4>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-medium" title={card.assignee.name}>
            {card.assignee.initials}
          </div>
          {card.dueDate && (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {card.dueDate}
            </span>
          )}
        </div>
        {card.commentsCount > 0 && (
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <MessageSquare className="h-3 w-3" />
            {card.commentsCount}
          </span>
        )}
      </div>
    </div>
  );
}
