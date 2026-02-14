import { useState } from "react";
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
import type { KanbanCardData } from "./KanbanCard";
import CardDetailModal from "./CardDetailModal";
import FilterBar from "./FilterBar";
import MilestoneTracker from "./MilestoneTracker";
import { Eye, EyeOff } from "lucide-react";

const internalColumns = [
  { id: "backlog", title: "Backlog", color: "bg-gray-400" },
  { id: "in_progress", title: "En Progreso", color: "bg-blue-500" },
  { id: "review", title: "Review", color: "bg-yellow-500" },
  { id: "qa", title: "QA", color: "bg-purple-500" },
  { id: "done", title: "Done", color: "bg-green-500" },
];

const clientColumns = [
  { id: "backlog", title: "Pendiente", color: "bg-gray-400" },
  { id: "in_progress", title: "En Desarrollo", color: "bg-blue-500" },
  { id: "review", title: "En Revisión", color: "bg-yellow-500" },
  { id: "done", title: "Completado", color: "bg-green-500" },
];

const initialCards: Record<string, KanbanCardData[]> = {
  backlog: [
    { id: "t1", title: "Configurar CI/CD pipeline", type: "task", priority: "medium", assignee: { initials: "CR", name: "Carlos Ruiz" }, dueDate: "Feb 20", commentsCount: 1 },
    { id: "t2", title: "Diseñar sistema de notificaciones", type: "feature", priority: "low", assignee: { initials: "AT", name: "Ana Torres" }, dueDate: "Feb 25", commentsCount: 0 },
    { id: "t3", title: "Documentar API endpoints", type: "task", priority: "low", assignee: { initials: "PG", name: "Pedro Gómez" }, commentsCount: 0 },
  ],
  in_progress: [
    { id: "t4", title: "Implementar autenticación JWT", type: "feature", priority: "high", assignee: { initials: "JD", name: "Juan Díaz" }, dueDate: "Feb 15", commentsCount: 3 },
    { id: "t5", title: "Error en validación de formulario", type: "bug", priority: "critical", assignee: { initials: "ML", name: "María López" }, dueDate: "Feb 14", commentsCount: 2 },
    { id: "t6", title: "Diseño responsive del dashboard", type: "task", priority: "medium", assignee: { initials: "JD", name: "Juan Díaz" }, dueDate: "Feb 18", commentsCount: 1 },
  ],
  review: [
    { id: "t7", title: "Integración pasarela de pagos", type: "feature", priority: "high", assignee: { initials: "CR", name: "Carlos Ruiz" }, dueDate: "Feb 16", commentsCount: 5 },
    { id: "t8", title: "Optimizar consultas de base de datos", type: "task", priority: "medium", assignee: { initials: "PG", name: "Pedro Gómez" }, commentsCount: 2 },
  ],
  qa: [
    { id: "t9", title: "Tests E2E para checkout", type: "task", priority: "high", assignee: { initials: "AT", name: "Ana Torres" }, dueDate: "Feb 17", commentsCount: 1 },
  ],
  done: [
    { id: "t10", title: "Setup del proyecto base", type: "task", priority: "medium", assignee: { initials: "JD", name: "Juan Díaz" }, commentsCount: 0 },
    { id: "t11", title: "Diseño del header y navegación", type: "task", priority: "low", assignee: { initials: "ML", name: "María López" }, commentsCount: 2 },
    { id: "t12", title: "Modelo de datos del usuario", type: "feature", priority: "medium", assignee: { initials: "CR", name: "Carlos Ruiz" }, commentsCount: 1 },
  ],
};

const milestones = [
  { id: 1, title: "MVP - Funcionalidad Core", dueDate: "Feb 28", progress: 70, status: "in_progress" as const },
  { id: 2, title: "Beta - Integración Pagos", dueDate: "Mar 15", progress: 40, status: "in_progress" as const },
  { id: 3, title: "Launch - Producción", dueDate: "Abr 01", progress: 10, status: "pending" as const },
];

interface KanbanBoardProps {
  projectId?: string;
}

export default function KanbanBoard({ projectId }: KanbanBoardProps) {
  const [columns, setColumns] = useState(initialCards);
  const [activeCard, setActiveCard] = useState<KanbanCardData | null>(null);
  const [selectedCard, setSelectedCard] = useState<KanbanCardData | null>(null);
  const [isClientView, setIsClientView] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const currentColumns = isClientView ? clientColumns : internalColumns;

  const getFilteredCards = (columnId: string): KanbanCardData[] => {
    // In client view, merge qa into review
    let cards = columns[columnId] || [];
    if (isClientView && columnId === "review") {
      cards = [...cards, ...(columns["qa"] || [])];
    }

    return cards.filter((card) => {
      if (filterType !== "all" && card.type !== filterType) return false;
      if (filterPriority !== "all" && card.priority !== filterPriority) return false;
      if (searchQuery && !card.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  };

  const findColumnForCard = (cardId: string): string | null => {
    for (const [colId, cards] of Object.entries(columns)) {
      if (cards.some((c) => c.id === cardId)) return colId;
    }
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const cardId = event.active.id as string;
    for (const cards of Object.values(columns)) {
      const card = cards.find((c) => c.id === cardId);
      if (card) { setActiveCard(card); break; }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeCol = findColumnForCard(activeId);
    let overCol = findColumnForCard(overId);

    // If over is a column id (droppable), not a card
    if (!overCol && currentColumns.some((c) => c.id === overId)) {
      overCol = overId;
    }

    if (!activeCol || !overCol || activeCol === overCol) return;

    setColumns((prev) => {
      const activeCards = [...prev[activeCol]];
      const overCards = [...prev[overCol]];
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
    setActiveCard(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeCol = findColumnForCard(activeId);
    if (!activeCol) return;

    // Same column reorder
    if (activeId !== overId) {
      const col = columns[activeCol];
      const oldIndex = col.findIndex((c) => c.id === activeId);
      const newIndex = col.findIndex((c) => c.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        setColumns((prev) => ({
          ...prev,
          [activeCol]: arrayMove(prev[activeCol], oldIndex, newIndex),
        }));
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">E-Commerce Platform</h1>
          <p className="text-sm text-muted-foreground">Plataforma de comercio electrónico</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsClientView(!isClientView)}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            {isClientView ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {isClientView ? "Vista Interna" : "Vista Cliente"}
          </button>
        </div>
      </div>

      {/* Milestone tracker */}
      <MilestoneTracker milestones={milestones} />

      {/* Filters */}
      <FilterBar
        activeType={filterType}
        activePriority={filterPriority}
        onFilterType={setFilterType}
        onFilterPriority={setFilterPriority}
        onSearch={setSearchQuery}
      />

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {currentColumns.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              color={col.color}
              cards={getFilteredCards(col.id)}
              onCardClick={(card) => setSelectedCard(card)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard && <KanbanCard card={activeCard} />}
        </DragOverlay>
      </DndContext>

      {/* Card detail modal */}
      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          isClientView={isClientView}
        />
      )}
    </div>
  );
}
