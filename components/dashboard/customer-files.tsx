'use client'

import { MoreHorizontal, Download, Database } from 'lucide-react'
import { customerFiles, type CustomerFile } from '@/lib/data'
import { cn } from '@/lib/utils'

const statusStyles: Record<CustomerFile['status'], string> = {
  Synced: 'bg-chart-3/10 text-chart-3',
  Syncing: 'bg-chart-4/10 text-chart-4',
  Stale: 'bg-muted text-muted-foreground',
}

const planStyles: Record<CustomerFile['plan'], string> = {
  Enterprise: 'bg-primary/12 text-primary ring-primary/25',
  Scale: 'bg-chart-2/12 text-chart-2 ring-chart-2/25',
  Growth: 'bg-chart-3/12 text-chart-3 ring-chart-3/25',
  Starter: 'bg-muted text-muted-foreground ring-border',
}

export function CustomerFiles() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Database className="size-4 text-muted-foreground" />
          <div>
            <h2 className="text-sm font-medium text-foreground">Customer database files</h2>
            <p className="text-xs text-muted-foreground">
              {customerFiles.length} datasets across 6 regions
            </p>
          </div>
        </div>
        <button
          type="button"
          suppressHydrationWarning
          className="flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Download className="size-3.5" />
          Export
        </button>
      </div>

      <div className="grid grid-cols-[1.6fr_0.8fr_0.9fr_0.7fr_0.8fr_auto] gap-4 border-b border-border px-5 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
        <span>Account</span>
        <span>Plan</span>
        <span className="text-right">Records</span>
        <span className="text-right">Size</span>
        <span>Status</span>
        <span className="sr-only">Actions</span>
      </div>

      <ul className="divide-y divide-border">
        {customerFiles.map((f) => (
          <li
            key={f.id}
            className="grid grid-cols-[1.6fr_0.8fr_0.9fr_0.7fr_0.8fr_auto] items-center gap-4 px-5 py-3 transition-colors hover:bg-secondary/40"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-foreground ring-1 ring-border">
                {f.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{f.company}</p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {f.id} · {f.region}
                </p>
              </div>
            </div>

            <div>
              <span
                className={cn(
                  'inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset',
                  planStyles[f.plan],
                )}
              >
                {f.plan}
              </span>
            </div>

            <span className="text-right text-sm tabular-nums text-foreground">{f.records}</span>
            <span className="text-right text-sm tabular-nums text-muted-foreground">{f.size}</span>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium',
                  statusStyles[f.status],
                )}
              >
                <span
                  className={cn(
                    'size-1.5 rounded-full',
                    f.status === 'Synced' && 'bg-chart-3',
                    f.status === 'Syncing' && 'animate-pulse bg-chart-4',
                    f.status === 'Stale' && 'bg-muted-foreground',
                  )}
                />
                {f.status}
              </span>
            </div>

            <div className="flex items-center gap-3 justify-self-end">
              <span className="hidden text-xs text-muted-foreground xl:inline">{f.updated}</span>
              <button
                type="button"
                suppressHydrationWarning
                aria-label={`Actions for ${f.company}`}
                className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
