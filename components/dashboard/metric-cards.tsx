'use client'

import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { metrics } from '@/lib/data'

export function MetricCards() {
  return (
    <section aria-label="Key metrics" className="grid border-y border-border bg-card sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => {
        const positive = metric.delta >= 0
        return (
          <article
            key={metric.id}
            className={cn(
              'px-5 py-4 sm:px-6 sm:py-5',
              index > 0 && 'border-t border-border sm:border-l sm:border-t-0',
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {metric.label}
                </p>
                <p className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-foreground tabular-nums">
                  {metric.value}
                </p>
              </div>
              <span
                className={cn(
                  'mt-0.5 inline-flex items-center gap-0.5 text-[11px] font-medium',
                  positive ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {Math.abs(metric.delta)}%
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">vs previous period</p>
          </article>
        )
      })}
    </section>
  )
}
