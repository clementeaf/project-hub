import { useState } from "react";
import { X, Calendar, User, MessageSquare, CheckCircle2, Bug as BugIcon, Send } from "lucide-react";
import type { KanbanCardData, CardComment } from "./types";
import { TYPE_STYLES, TYPE_LABELS, PRIORITY_STYLES, PRIORITY_LABELS } from "./types";

interface CardDetailModalProps {
  card: KanbanCardData;
  onClose: () => void;
  isClientView?: boolean;
  currentUser?: { name: string; initials: string };
  onApprove?: (card: KanbanCardData) => void;
  onReportBug?: (card: KanbanCardData) => void;
  onAddComment?: (card: KanbanCardData, comment: CardComment) => void;
}

export default function CardDetailModal({
  card,
  onClose,
  isClientView = false,
  currentUser = { name: "Tú", initials: "TU" },
  onApprove,
  onReportBug,
  onAddComment,
}: CardDetailModalProps) {
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState<CardComment[]>(card.comments ?? []);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: CardComment = {
      user: currentUser.name,
      initials: currentUser.initials,
      text: newComment,
      time: "Ahora",
    };
    setLocalComments([...localComments, comment]);
    onAddComment?.(card, comment);
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-border bg-background shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border p-5">
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              <span className={`rounded px-2 py-0.5 text-xs font-medium ${TYPE_STYLES[card.type]}`}>
                {TYPE_LABELS[card.type]}
              </span>
              <span className={`rounded px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLES[card.priority]}`}>
                Prioridad: {PRIORITY_LABELS[card.priority]}
              </span>
            </div>
            <h2 className="text-lg font-semibold">{card.title}</h2>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 p-5">
          {/* Details grid */}
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4 shrink-0" />
              <span>Asignado:</span>
              <span className="font-medium text-foreground">{card.assignee.name}</span>
            </div>
            {card.dueDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>Fecha límite:</span>
                <span className="font-medium text-foreground">{card.dueDate}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-sm font-semibold">Descripción</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {card.description || "Sin descripción."}
            </p>
          </div>

          {/* Client actions */}
          {isClientView && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onApprove?.(card)}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-green-600 px-4 text-sm font-medium text-white hover:bg-green-700"
              >
                <CheckCircle2 className="h-4 w-4" /> Aprobar Entregable
              </button>
              <button
                onClick={() => onReportBug?.(card)}
                className="inline-flex h-9 items-center gap-2 rounded-md border border-destructive px-4 text-sm font-medium text-destructive hover:bg-destructive hover:text-white"
              >
                <BugIcon className="h-4 w-4" /> Reportar Bug
              </button>
            </div>
          )}

          {/* Comments */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <MessageSquare className="h-4 w-4" />
              Comentarios ({localComments.length})
            </h3>

            {localComments.length === 0 && (
              <p className="text-sm text-muted-foreground">No hay comentarios aún.</p>
            )}

            <div className="space-y-3">
              {localComments.map((c, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {c.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{c.user}</span>
                      <span className="text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add comment */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                className="flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              />
              <button
                onClick={handleAddComment}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
