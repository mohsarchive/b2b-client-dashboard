'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { accounts, databases } from '@/lib/data'

export function ActionCenter() {
  const atRisk = accounts.filter((a) => a.status === 'At risk').length
  const degraded = databases.filter((d) => d.status === 'Degraded').length
  const stale = 2

  const actions = [
    { eyebrow: 'Customer health', title: 'Review at-risk accounts', detail: `${atRisk} ${atRisk === 1 ? 'account needs' : 'accounts need'} attention`, href: '/accounts?status=At%20risk' },
    { eyebrow: 'Infrastructure', title: 'Check degraded systems', detail: `${degraded} ${degraded === 1 ? 'database is' : 'databases are'} above the connection threshold`, href: '/databases' },
    { eyebrow: 'Data quality', title: 'Resolve stale files', detail: `${stale} customer datasets need a sync`, href: '/client-files' },
    { eyebrow: 'Revenue', title: 'Review current pipeline', detail: '10 active opportunities this month', href: '/pipelines' },
  ]

  const priorityCount = atRisk + degraded + stale

  return (
    <section className="border-y border-border">
      <div className="flex items-baseline justify-between gap-4 py-4">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">Needs attention</h2>
          <p className="mt-1 text-xs text-muted-foreground">The work most likely to matter next.</p>
        </div>
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{priorityCount} open</span>
      </div>

      <div className="border-t border-border">
        {actions.map((action, index) => (
          <Link
            key={action.title}
            href={action.href}
            className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-border py-4 last:border-b-0 hover:bg-secondary/35"
          >
            <span className="text-xs tabular-nums text-muted-foreground/60">{String(index + 1).padStart(2, '0')}</span>
            <span className="min-w-0">
              <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">{action.eyebrow}</span>
              <span className="mt-1 block truncate text-sm font-medium text-foreground">{action.title}</span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">{action.detail}</span>
            </span>
            <ArrowRight className="size-4 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        ))}
      </div>
    </section>
  )
}
