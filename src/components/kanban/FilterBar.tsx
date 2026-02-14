import { Filter, Search } from "lucide-react";

interface FilterBarProps {
  onFilterType: (type: string) => void;
  onFilterPriority: (priority: string) => void;
  onSearch: (query: string) => void;
  activeType: string;
  activePriority: string;
}

export default function FilterBar({ onFilterType, onFilterPriority, onSearch, activeType, activePriority }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar tareas..."
          onChange={(e) => onSearch(e.target.value)}
          className="h-9 w-52 rounded-md border border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="flex items-center gap-1.5">
        <Filter className="h-4 w-4 text-muted-foreground" />

        {/* Type filter */}
        <select
          value={activeType}
          onChange={(e) => onFilterType(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="all">Todos los tipos</option>
          <option value="task">Tasks</option>
          <option value="bug">Bugs</option>
          <option value="feature">Features</option>
        </select>

        {/* Priority filter */}
        <select
          value={activePriority}
          onChange={(e) => onFilterPriority(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="all">Todas las prioridades</option>
          <option value="critical">Crítica</option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </div>
    </div>
  );
}
