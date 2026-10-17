"use client";

import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ChartNoAxesColumn,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Wallet,
  Bell,
  Users,
  ChevronDown,
  X,
  type LucideIcon,
} from "lucide-react";

const navigationGroups: {
  label: string;
  items: {
    label: string;
    icon: LucideIcon;
    href?: string;
  }[];
}[] = [
  {
    label: "WORKSPACE",
    items: [{ label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }],
  },
  {
    label: "ACADEMIC",
    items: [
      { label: "Students", icon: GraduationCap },
      { label: "Teachers", icon: Users },
      { label: "Classes", icon: CalendarDays },
      { label: "Subjects", icon: BookOpen },
      { label: "Attendance", icon: ClipboardCheck },
      { label: "Exams & Results", icon: ChartNoAxesColumn },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { label: "Fees & Finance", icon: Wallet },
      { label: "Notices", icon: Bell },
      { label: "Users & Settings", icon: Settings },
    ],
  },
];

type AppSidebarProps = {
  pathname: string;
  onNavigate?: () => void;
};

export function AppSidebar({ pathname, onNavigate }: AppSidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-18 items-center gap-3 border-b border-sidebar-border px-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="size-6" />
        </div>

        <div className="min-w-0">
          <h1 className="text-lg font-bold tracking-tight">SMS</h1>
          <p className="text-xs text-sidebar-foreground/60">
            Education management
          </p>
        </div>
        {onNavigate && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onNavigate}
            className="rounded-md p-2 transition-colors hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <nav
        aria-label="Main navigation"
        className="flex-1 space-y-7 overflow-y-auto px-3 py-6"
      >
        {navigationGroups.map((group) => (
          <section key={group.label} className="space-y-2">
            <h2 className="px-3 text-[11px] font-semibold tracking-widest text-sidebar-foreground/50">
              {group.label}
            </h2>

            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active =
                  item.href !== undefined && pathname === item.href;

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        <Icon className="size-[18px] shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <div
                        aria-disabled="true"
                        title="Page not implemented yet"
                        className="flex cursor-default items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/45"
                      >
                        <Icon className="size-[18px] shrink-0" />
                        <span>{item.label}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <button
          type="button"
          disabled
          className="flex w-full items-center gap-3 rounded-lg p-2 text-left opacity-80"
        >
          <div className="flex size-9 items-center justify-center rounded-full bg-sidebar-accent">
            <Users className="size-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Workspace Admin</p>
            <p className="text-xs text-sidebar-foreground/55">Administrator</p>
          </div>

          <ChevronDown className="size-4" />
        </button>
      </div>
    </aside>
  );
}
