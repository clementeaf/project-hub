import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Calendar, MessageSquare } from "lucide-react";
import type { KanbanCardData } from "./types";
import { TYPE_STYLES, TYPE_LABELS, PRIORITY_STYLES, PRIORITY_LABELS } from "./types";

interface KanbanCardProps {
  card: KanbanCardData;
  onClick?: () => void;
  readonly?: boolean;
}

export default function KanbanCard({ card, onClick, readonly = false }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    disabled: readonly,
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
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${TYPE_STYLES[card.type]}`}>
            {TYPE_LABELS[card.type]}
          </span>
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${PRIORITY_STYLES[card.priority]}`}>
            {PRIORITY_LABELS[card.priority]}
          </span>
        </div>
        {!readonly && (
          <button
            className="cursor-grab touch-none text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
        )}
      </div>

      <h4 className="text-sm font-medium leading-snug">{card.title}</h4>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-medium"
            title={card.assignee.name}
          >
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
