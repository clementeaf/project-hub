import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/app", icon: LayoutDashboard },
  { name: "Proyectos", href: "/app/proyectos", icon: FolderKanban },
  { name: "Reportes", href: "/app/reportes", icon: BarChart3 },
  { name: "Configuración", href: "/app/configuracion", icon: Settings },
];

interface SidebarProps {
  currentPath: string;
  role?: "admin" | "developer" | "client";
}

export default function Sidebar({ currentPath, role = "admin" }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const roleLabels: Record<string, string> = {
    admin: "Administrador",
    developer: "Desarrollador",
    client: "Cliente",
  };

  const roleColors: Record<string, string> = {
    admin: "bg-chart-1 text-white",
    developer: "bg-chart-2 text-white",
    client: "bg-chart-4 text-white",
  };

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <a href="/app" className="flex items-center gap-2 text-lg font-bold text-sidebar-foreground">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">
              P
            </div>
            ProjectHub
          </a>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">
            P
          </div>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 pt-4">
          <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", roleColors[role])}>
            {roleLabels[role]}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 pt-4">
        {navigation.map((item) => {
          const isActive = currentPath === item.href || (item.href !== "/app" && currentPath.startsWith(item.href));
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && item.name}
            </a>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!collapsed && "Colapsar"}
        </button>
        <a
          href="/login"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && "Cerrar Sesión"}
        </a>
      </div>
    </aside>
  );
}
