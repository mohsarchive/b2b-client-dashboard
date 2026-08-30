'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, Database, FileWarning, Sparkles } from 'lucide-react'
import { accounts, databases } from '@/lib/data'

const actions = [
  { label: 'Review at-risk accounts', detail: '2 accounts need attention', href: '/accounts?status=At%20risk', icon: AlertTriangle },
  { label: 'Check degraded systems', detail: '1 database is above 85% connections', href: '/databases', icon: Database },
  { label: 'Resolve stale files', detail: '2 customer datasets need a sync', href: '/client-files', icon: FileWarning },
  { label: 'Review this month’s pipeline', detail: '10 active opportunities', href: '/pipelines', icon: Clock3 },
]

export function ActionCenter() {
  const atRisk = accounts.filter((a) => a.status === 'At risk').length
  const degraded = databases.filter((d) => d.status === 'Degraded').length
  const stale = 2

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Recommended actions</h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">The fastest path from dashboard insight to action.</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-1">{atRisk + degraded + stale} priorities</span>
          <span className="hidden sm:inline">Updated just now</span>
        </div>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Link
              key={action.label}
              href={action.href}
              className="group relative bg-card p-5 transition-all duration-200 hover:bg-secondary/40 hover:shadow-inner"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-foreground">
                  <Icon className="size-4" />
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground" />
              </div>
              <p className="mt-4 text-sm font-medium text-foreground">{action.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{action.detail}</p>
            </Link>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border px-5 py-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><AlertTriangle className="size-3.5" />{atRisk} at risk</span>
        <span className="inline-flex items-center gap-1.5"><Database className="size-3.5" />{degraded} degraded</span>
        <span className="inline-flex items-center gap-1.5"><FileWarning className="size-3.5" />{stale} stale datasets</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-chart-3"><CheckCircle2 className="size-3.5" />All other systems healthy</span>
      </div>
    </section>
  )
}
