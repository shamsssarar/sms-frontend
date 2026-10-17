"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu, PanelLeft, Search } from "lucide-react";
import { AppSidebar } from "./app-sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pageTitle = pathname === "/dashboard" ? "Dashboard" : "Workspace";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border md:block">
        <AppSidebar pathname={pathname} />
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-xl">
            <AppSidebar
              pathname={pathname}
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="min-h-screen md:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-md p-2 hover:bg-accent md:hidden"
          >
            <Menu className="size-5" />
          </button>

          <PanelLeft className="hidden size-5 text-muted-foreground md:block" />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{pageTitle}</p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              SMS / {pageTitle}
            </p>
          </div>

          <button
            type="button"
            aria-label="Search (not implemented)"
            disabled
            className="hidden items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground sm:flex"
          >
            <Search className="size-4" />
            <span>Search</span>
          </button>

          <button
            type="button"
            aria-label="Notifications (not implemented)"
            disabled
            className="rounded-md p-2 text-muted-foreground"
          >
            <Bell className="size-5" />
          </button>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
