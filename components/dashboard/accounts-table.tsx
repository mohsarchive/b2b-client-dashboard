'use client'

import { MoreHorizontal, Filter } from 'lucide-react'
import { accounts, type Account } from '@/lib/data'
import { cn } from '@/lib/utils'

const statusStyles: Record<Account['status'], string> = {
  Active: 'bg-chart-3/10 text-chart-3',
  Onboarding: 'bg-chart-4/10 text-chart-4',
  'At risk': 'bg-chart-5/10 text-chart-5',
}

function healthColor(h: number) {
  if (h >= 80) return 'bg-chart-3'
  if (h >= 60) return 'bg-chart-4'
  return 'bg-chart-5'
}

export function AccountsTable() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <h2 className="text-sm font-medium text-foreground">All accounts</h2>
          <p className="text-xs text-muted-foreground">
            {accounts.length} accounts · {accounts.filter((a) => a.status === 'At risk').length} at risk
          </p>
        </div>
        <button
          type="button"
          suppressHydrationWarning
          className="flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Filter className="size-3.5" />
          Filter
        </button>
      </div>

      <div className="hidden grid-cols-[1.6fr_0.9fr_0.7fr_0.8fr_1fr_0.8fr_auto] gap-4 border-b border-border px-5 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 md:grid">
        <span>Account</span>
        <span>Owner</span>
        <span className="text-right">Seats</span>
        <span className="text-right">MRR</span>
        <span>Health</span>
        <span>Status</span>
        <span className="sr-only">Actions</span>
      </div>

      <ul className="divide-y divide-border">
        {accounts.map((a) => (
          <li
            key={a.id}
            className="grid grid-cols-2 items-center gap-4 px-5 py-3 transition-colors hover:bg-secondary/40 md:grid-cols-[1.6fr_0.9fr_0.7fr_0.8fr_1fr_0.8fr_auto]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-foreground ring-1 ring-border">
                {a.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{a.company}</p>
                <p className="truncate text-xs text-muted-foreground">{a.industry}</p>
              </div>
            </div>

            <span className="hidden truncate text-sm text-muted-foreground md:block">{a.owner}</span>
            <span className="hidden text-right text-sm tabular-nums text-foreground md:block">{a.seats}</span>
            <span className="text-right text-sm tabular-nums text-foreground">{a.mrr}</span>

            <div className="hidden items-center gap-2 md:flex">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                <div className={cn('h-full rounded-full', healthColor(a.health))} style={{ width: `${a.health}%` }} />
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">{a.health}</span>
            </div>

            <div className="flex items-center justify-end md:justify-start">
              <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium', statusStyles[a.status])}>
                <span className={cn('size-1.5 rounded-full', healthColor(a.health))} />
                {a.status}
              </span>
            </div>

            <button
              type="button"
              suppressHydrationWarning
              aria-label={`Actions for ${a.company}`}
              className="hidden size-7 items-center justify-center justify-self-end rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:flex"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
