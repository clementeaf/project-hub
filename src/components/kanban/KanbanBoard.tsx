import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import CardDetailModal from "./CardDetailModal";
import FilterBar from "./FilterBar";
import type { KanbanCardData, ColumnConfig, CardComment } from "./types";

// ─── Props ───────────────────────────────────────────────────

export interface KanbanBoardProps {
  /** Column definitions shown in the board */
  columns: ColumnConfig[];
  /** Initial cards grouped by column id */
  initialCards: Record<string, KanbanCardData[]>;
  /** Make the board read-only (no drag & drop) */
  readonly?: boolean;
  /** Show the filter bar */
  showFilters?: boolean;
  /** Extra class name for the outer wrapper */
  className?: string;
  /** When true, cards display limited client-view actions in the modal */
  isClientView?: boolean;
  /** Current user info (for comments) */
  currentUser?: { name: string; initials: string };
  /** Called when a card moves to a different column */
  onCardMove?: (cardId: string, fromColumn: string, toColumn: string) => void;
  /** Called when a card is reordered within its column */
  onCardReorder?: (columnId: string, cardIds: string[]) => void;
  /** Called when client approves a deliverable */
  onApprove?: (card: KanbanCardData) => void;
  /** Called when client reports a bug */
  onReportBug?: (card: KanbanCardData) => void;
  /** Called when a comment is added */
  onAddComment?: (card: KanbanCardData, comment: CardComment) => void;
}

// ─── Component ───────────────────────────────────────────────

export default function KanbanBoard({
  columns,
  initialCards,
  readonly = false,
  showFilters = true,
  className,
  isClientView = false,
  currentUser,
  onCardMove,
  onCardReorder,
  onApprove,
  onReportBug,
  onAddComment,
}: KanbanBoardProps) {
  const [boardCards, setBoardCards] = useState(initialCards);
  const [activeCard, setActiveCard] = useState<KanbanCardData | null>(null);
  const [selectedCard, setSelectedCard] = useState<KanbanCardData | null>(null);

  // Filters
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // ── Helpers ──────────────────────────────────────────────

  const findColumnForCard = useCallback(
    (cardId: string): string | null => {
      for (const [colId, cards] of Object.entries(boardCards)) {
        if (cards.some((c) => c.id === cardId)) return colId;
      }
      return null;
    },
    [boardCards]
  );

  const getFilteredCards = (columnId: string): KanbanCardData[] => {
    const cards = boardCards[columnId] || [];
    return cards.filter((card) => {
      if (filterType !== "all" && card.type !== filterType) return false;
      if (filterPriority !== "all" && card.priority !== filterPriority) return false;
      if (searchQuery && !card.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  };

  // ── DnD handlers ─────────────────────────────────────────

  const handleDragStart = (event: DragStartEvent) => {
    const cardId = event.active.id as string;
    for (const cards of Object.values(boardCards)) {
      const card = cards.find((c) => c.id === cardId);
      if (card) {
        setActiveCard(card);
        break;
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeCol = findColumnForCard(activeId);
    let overCol = findColumnForCard(overId);

    if (!overCol && columns.some((c) => c.id === overId)) {
      overCol = overId;
    }

    if (!activeCol || !overCol || activeCol === overCol) return;

    setBoardCards((prev) => {
      const activeCards = [...prev[activeCol]];
      const overCards = [...(prev[overCol] || [])];
      const activeIndex = activeCards.findIndex((c) => c.id === activeId);
      const [movedCard] = activeCards.splice(activeIndex, 1);

      const overIndex = overCards.findIndex((c) => c.id === overId);
      if (overIndex >= 0) {
        overCards.splice(overIndex, 0, movedCard);
      } else {
        overCards.push(movedCard);
      }

      return { ...prev, [activeCol]: activeCards, [overCol]: overCards };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const draggedCard = activeCard;
    setActiveCard(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeCol = findColumnForCard(activeId);
    if (!activeCol) return;

    if (activeId !== overId) {
      const col = boardCards[activeCol];
      const oldIndex = col.findIndex((c) => c.id === activeId);
      const newIndex = col.findIndex((c) => c.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        setBoardCards((prev) => {
          const newOrder = arrayMove(prev[activeCol], oldIndex, newIndex);
          onCardReorder?.(activeCol, newOrder.map((c) => c.id));
          return { ...prev, [activeCol]: newOrder };
        });
      }
    }

    // Notify parent of cross-column moves
    if (draggedCard) {
      const originalCol = Object.entries(initialCards).find(([, cards]) =>
        cards.some((c) => c.id === activeId)
      )?.[0];
      if (originalCol && originalCol !== activeCol) {
        onCardMove?.(activeId, originalCol, activeCol);
      }
    }
  };

  // ── Render ───────────────────────────────────────────────

  return (
    <div className={className}>
      {showFilters && (
        <div className="mb-4">
          <FilterBar
            activeType={filterType}
            activePriority={filterPriority}
            onFilterType={setFilterType}
            onFilterPriority={setFilterPriority}
            onSearch={setSearchQuery}
          />
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={readonly ? undefined : handleDragStart}
        onDragOver={readonly ? undefined : handleDragOver}
        onDragEnd={readonly ? undefined : handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              color={col.color}
              cards={getFilteredCards(col.id)}
              readonly={readonly}
              onCardClick={(card) => setSelectedCard(card)}
            />
          ))}
        </div>

        {!readonly && (
          <DragOverlay>
            {activeCard && <KanbanCard card={activeCard} readonly />}
          </DragOverlay>
        )}
      </DndContext>

      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          isClientView={isClientView}
          currentUser={currentUser}
          onApprove={onApprove}
          onReportBug={onReportBug}
          onAddComment={onAddComment}
        />
      )}
    </div>
  );
}
