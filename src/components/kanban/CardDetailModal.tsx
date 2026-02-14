import { useState } from "react";
import { X, Calendar, User, MessageSquare, CheckCircle2, Bug as BugIcon, Send } from "lucide-react";
import type { KanbanCardData } from "./KanbanCard";

interface CardDetailModalProps {
  card: KanbanCardData;
  onClose: () => void;
  isClientView?: boolean;
}

const comments = [
  { user: "Juan Díaz", initials: "JD", text: "He actualizado los estilos del componente según el diseño.", time: "Hace 2 horas" },
  { user: "María López", initials: "ML", text: "Se ve bien! Solo falta ajustar el padding en mobile.", time: "Hace 1 hora" },
];

export default function CardDetailModal({ card, onClose, isClientView = false }: CardDetailModalProps) {
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(comments);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setLocalComments([
      ...localComments,
      {
        user: isClientView ? "Cliente" : "Tú",
        initials: isClientView ? "CL" : "TU",
        text: newComment,
        time: "Ahora",
      },
    ]);
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
            <div className="mb-2 flex gap-2">
              <span
                className={`rounded px-2 py-0.5 text-xs font-medium ${
                  card.type === "bug" ? "bg-red-100 text-red-800" : card.type === "feature" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                }`}
              >
                {card.type === "task" ? "Task" : card.type === "bug" ? "Bug" : "Feature"}
              </span>
              <span
                className={`rounded px-2 py-0.5 text-xs font-medium ${
                  card.priority === "critical"
                    ? "bg-red-100 text-red-700"
                    : card.priority === "high"
                      ? "bg-orange-100 text-orange-700"
                      : card.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                }`}
              >
                Prioridad: {card.priority === "low" ? "Baja" : card.priority === "medium" ? "Media" : card.priority === "high" ? "Alta" : "Crítica"}
              </span>
            </div>
            <h2 className="text-lg font-semibold">{card.title}</h2>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Details grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Asignado:</span>
              <span className="font-medium text-foreground">{card.assignee.name}</span>
            </div>
            {card.dueDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Fecha límite:</span>
                <span className="font-medium text-foreground">{card.dueDate}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-sm font-semibold">Descripción</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.description || "Implementar los cambios necesarios según las especificaciones del diseño. Asegurar compatibilidad con mobile y desktop. Incluir tests unitarios para los nuevos componentes."}
            </p>
          </div>

          {/* Client actions */}
          {isClientView && (
            <div className="flex gap-2">
              <button className="inline-flex h-9 items-center gap-2 rounded-md bg-green-600 px-4 text-sm font-medium text-white hover:bg-green-700">
                <CheckCircle2 className="h-4 w-4" /> Aprobar Entregable
              </button>
              <button className="inline-flex h-9 items-center gap-2 rounded-md border border-destructive px-4 text-sm font-medium text-destructive hover:bg-destructive hover:text-white">
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
            <div className="space-y-3">
              {localComments.map((c, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {c.initials}
                  </div>
                  <div className="flex-1">
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
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
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
