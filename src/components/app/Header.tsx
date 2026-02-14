import { useState } from "react";
import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";

interface HeaderProps {
  breadcrumb?: { label: string; href?: string }[];
}

export default function Header({ breadcrumb = [{ label: "Dashboard" }] }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Juan completó la tarea #45", time: "Hace 5 min" },
    { id: 2, text: "Nuevo comentario en Bug #12", time: "Hace 15 min" },
    { id: 3, text: 'Hito "MVP" al 80%', time: "Hace 1 hora" },
  ];

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumb.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-muted-foreground">/</span>}
            {item.href ? (
              <a href={item.href} className="text-muted-foreground hover:text-foreground">
                {item.label}
              </a>
            ) : (
              <span className="font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowDropdown(false);
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 z-50 w-72 rounded-md border border-border bg-popover p-1 shadow-lg">
              <div className="px-3 py-2 text-sm font-semibold">Notificaciones</div>
              {notifications.map((n) => (
                <div key={n.id} className="rounded-md px-3 py-2 text-sm hover:bg-accent">
                  <div>{n.text}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowDropdown(!showDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-accent"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              JD
            </div>
            <span className="hidden text-sm font-medium sm:inline">Juan Díaz</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-11 z-50 w-48 rounded-md border border-border bg-popover p-1 shadow-lg">
              <div className="border-b border-border px-3 py-2">
                <div className="text-sm font-medium">Juan Díaz</div>
                <div className="text-xs text-muted-foreground">juan@projecthub.dev</div>
              </div>
              <a href="/app/configuracion" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent">
                <User className="h-4 w-4" /> Perfil
              </a>
              <a href="/app/configuracion" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent">
                <Settings className="h-4 w-4" /> Configuración
              </a>
              <div className="border-t border-border">
                <a href="/login" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent">
                  <LogOut className="h-4 w-4" /> Cerrar Sesión
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
