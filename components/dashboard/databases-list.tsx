'use client'

import { Database, MoreHorizontal, Plus } from 'lucide-react'
import { databases, type DbInstance } from '@/lib/data'
import { cn } from '@/lib/utils'

const statusStyles: Record<DbInstance['status'], string> = {
  Healthy: 'bg-chart-3/10 text-chart-3',
  Degraded: 'bg-chart-5/10 text-chart-5',
  Provisioning: 'bg-chart-4/10 text-chart-4',
}

const statusDot: Record<DbInstance['status'], string> = {
  Healthy: 'bg-chart-3',
  Degraded: 'bg-chart-5',
  Provisioning: 'animate-pulse bg-chart-4',
}

function loadColor(pct: number) {
  if (pct >= 85) return 'bg-chart-5'
  if (pct >= 60) return 'bg-chart-4'
  return 'bg-chart-3'
}

export function DatabasesList() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Database className="size-4 text-muted-foreground" />
          <div>
            <h2 className="text-sm font-medium text-foreground">Database instances</h2>
            <p className="text-xs text-muted-foreground">
              {databases.length} instances · {databases.filter((d) => d.status === 'Healthy').length} healthy
            </p>
          </div>
        </div>
        <button
          type="button"
          suppressHydrationWarning
          className="flex h-8 items-center gap-1.5 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="size-3.5" />
          New instance
        </button>
      </div>

      <ul className="divide-y divide-border">
        {databases.map((db) => {
          const pct = Math.round((db.connections / db.maxConnections) * 100)
          return (
            <li
              key={db.id}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-secondary/40"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-[10px] font-semibold text-foreground ring-1 ring-border">
                  {db.engine.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm font-medium text-foreground">{db.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {db.engine} {db.version} · {db.region} · {db.size}
                  </p>
                </div>
              </div>

              <div className="hidden w-40 shrink-0 flex-col gap-1 sm:flex">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Connections</span>
                  <span className="tabular-nums">
                    {db.connections}/{db.maxConnections}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className={cn('h-full rounded-full', loadColor(pct))} style={{ width: `${pct}%` }} />
                </div>
              </div>

              <span className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium', statusStyles[db.status])}>
                <span className={cn('size-1.5 rounded-full', statusDot[db.status])} />
                {db.status}
              </span>

              <button
                type="button"
                suppressHydrationWarning
                aria-label={`Actions for ${db.name}`}
                className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
