'use client'

import { Plus } from 'lucide-react'
import { pipelineStages } from '@/lib/data'

export function PipelineBoard() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {pipelineStages.map((stage) => {
        const total = stage.deals.length
        return (
          <section
            key={stage.id}
            className="flex flex-col rounded-xl border border-border bg-card/60"
          >
            <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: stage.accent }}
                />
                <h2 className="text-sm font-medium text-foreground">{stage.name}</h2>
                <span className="rounded-full bg-secondary px-1.5 text-[11px] tabular-nums text-muted-foreground">
                  {total}
                </span>
              </div>
              <button
                type="button"
                suppressHydrationWarning
                aria-label={`Add deal to ${stage.name}`}
                className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Plus className="size-3.5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-3">
              {stage.deals.map((deal) => (
                <article
                  key={deal.id}
                  className="group cursor-pointer rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{deal.company}</p>
                    <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                      {deal.value}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-muted-foreground ring-1 ring-border">
                      {deal.owner}
                    </span>
                    <span className="text-xs text-muted-foreground">{deal.age} in stage</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
