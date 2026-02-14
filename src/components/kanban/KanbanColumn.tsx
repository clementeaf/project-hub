import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import KanbanCard from "./KanbanCard";
import type { KanbanCardData } from "./KanbanCard";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  id: string;
  title: string;
  cards: KanbanCardData[];
  color?: string;
  onCardClick?: (card: KanbanCardData) => void;
}

export default function KanbanColumn({ id, title, cards, color = "bg-muted", onCardClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex w-72 shrink-0 flex-col rounded-xl bg-muted/50">
      <div className="flex items-center gap-2 px-3 py-3">
        <div className={cn("h-2.5 w-2.5 rounded-full", color)} />
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {cards.length}
        </span>
      </div>

      <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            "flex min-h-[200px] flex-1 flex-col gap-2 px-2 pb-2 transition-colors",
            isOver && "bg-accent/50 rounded-lg"
          )}
        >
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} onClick={() => onCardClick?.(card)} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
