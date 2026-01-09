import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquareWarning,
  Upload,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Building2,
  ClipboardList,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  role: 'citizen' | 'contractor' | 'admin';
}

export const DashboardSidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const citizenLinks = [
    { href: '/citizen/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/citizen/projects', label: 'All Projects', icon: FolderKanban },
    { href: '/citizen/complaints', label: 'My Complaints', icon: MessageSquareWarning },
  ];

  const contractorLinks = [
    { href: '/contractor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/contractor/projects', label: 'My Projects', icon: FolderKanban },
    { href: '/contractor/updates', label: 'Submit Updates', icon: Upload },
    { href: '/contractor/complaints', label: 'Assigned Complaints', icon: MessageSquareWarning },
  ];

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Manage Projects', icon: FolderKanban },
    { href: '/admin/contractors', label: 'Contractors', icon: Building2 },
    { href: '/admin/complaints', label: 'All Complaints', icon: ClipboardList },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/users', label: 'Users', icon: Users },
  ];

  const links = role === 'citizen' ? citizenLinks : role === 'contractor' ? contractorLinks : adminLinks;
  const roleLabel = role === 'citizen' ? 'Citizen' : role === 'contractor' ? 'Contractor' : 'Admin';

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-semibold text-sm">GovTrack</h1>
              <p className="text-xs text-sidebar-foreground/60">{roleLabel} Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <link.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-sidebar-primary")} />
              {!collapsed && <span className="text-sm font-medium">{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link
          to={`/${role}/settings`}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>
        <Link
          to="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </Link>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-sidebar rounded-full border border-sidebar-border flex items-center justify-center hover:bg-sidebar-accent transition-colors"
      >
        <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
      </button>
    </aside>
  );
};
