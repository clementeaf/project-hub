import { Flag, CheckCircle2, Clock } from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  dueDate: string;
  progress: number;
  status: "pending" | "in_progress" | "completed";
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
}

const statusConfig = {
  pending: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted" },
  in_progress: { icon: Flag, color: "text-chart-4", bg: "bg-chart-4/10" },
  completed: { icon: CheckCircle2, color: "text-chart-2", bg: "bg-chart-2/10" },
};

export default function MilestoneTracker({ milestones }: MilestoneTrackerProps) {
  const overallProgress = milestones.length > 0
    ? Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)
    : 0;

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Hitos del Proyecto</h3>
        <span className="text-xs text-muted-foreground">{overallProgress}% completado</span>
      </div>

      {/* Overall progress bar */}
      <div className="mb-4 h-2.5 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${overallProgress}%` }} />
      </div>

      <div className="space-y-3">
        {milestones.map((m) => {
          const config = statusConfig[m.status];
          const Icon = config.icon;
          return (
            <div key={m.id} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                <Icon className={`h-4 w-4 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{m.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{m.progress}%</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary/60" style={{ width: `${m.progress}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{m.dueDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
