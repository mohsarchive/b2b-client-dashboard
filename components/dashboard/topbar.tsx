'use client'

import { usePathname } from 'next/navigation'
import { Search, Bell, Plus, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'

const titles: Record<string, string> = {
  '/': 'Overview',
  '/analytics': 'Analytics',
  '/accounts': 'Accounts',
  '/pipelines': 'Pipelines',
  '/databases': 'Databases',
  '/client-files': 'Client files',
  '/settings': 'Settings',
  '/support': 'Support',
}

export function Topbar() {
  const pathname = usePathname()
  const current = titles[pathname] ?? 'Overview'

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-5 backdrop-blur-xl">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Workspace</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="font-medium text-foreground">{current}</span>
        </div>
      </div>

      <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search accounts, files…"
          className="h-9 border-border bg-secondary/50 pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <button
        type="button"
        suppressHydrationWarning
        className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <SlidersHorizontal className="size-4" />
      </button>
      <button
        type="button"
        suppressHydrationWarning
        className="relative flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Bell className="size-4" />
        <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
      </button>

      <button
        type="button"
        suppressHydrationWarning
        className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Plus className="size-4" />
        <span className="hidden sm:inline">New report</span>
      </button>
    </header>
  )
}
