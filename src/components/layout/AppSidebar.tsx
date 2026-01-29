import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Send,
  CheckCircle2,
  Package,
  Settings,
  ChevronLeft,
  ChevronRight,
  Factory,
  Wrench,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "综合总览",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "生产订单",
    icon: ClipboardList,
    path: "/orders",
  },
  {
    title: "生产派单",
    icon: Send,
    path: "/dispatch",
  },
  {
    title: "质量检验",
    icon: CheckCircle2,
    path: "/quality",
  },
  {
    title: "库存管理",
    icon: Package,
    path: "/inventory",
  },
  {
    title: "设备监控",
    icon: Factory,
    path: "/equipment",
  },
  {
    title: "工时管理",
    icon: BarChart3,
    path: "/workhours",
  },
];

const bottomMenuItems = [
  {
    title: "系统设置",
    icon: Settings,
    path: "/settings",
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-screen flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Factory className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">MES</span>
              <span className="text-[10px] text-muted-foreground">生产管理系统</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto">
            <Factory className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-primary/20 transition-colors z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
        )}
      </button>

      {/* Main Menu */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary glow-border"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )}
              />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.title}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="py-4 px-2 border-t border-sidebar-border">
        {bottomMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )}
              />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.title}</span>
              )}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
