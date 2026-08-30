'use client'

import { Area, AreaChart } from 'recharts'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { ChartContainer } from '@/components/ui/chart'
import { metrics } from '@/lib/data'
import { cn } from '@/lib/utils'

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m, index) => {
        const positive = m.delta >= 0
        return (
          <article
            key={m.id}
            className="premium-surface premium-enter group relative overflow-hidden rounded-xl p-5"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-muted-foreground">{m.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground tabular-nums">{m.value}</p>
              </div>
              <span
                className={cn(
                  'flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset',
                  positive
                    ? 'bg-chart-3/10 text-chart-3 ring-chart-3/20'
                    : 'bg-chart-5/10 text-chart-5 ring-chart-5/20',
                )}
              >
                {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {Math.abs(m.delta)}%
              </span>
            </div>

            <div className="mt-4 flex items-end justify-between gap-2">
              <p className="text-[11px] text-muted-foreground/70">vs. previous period</p>
              <ChartContainer config={{ v: { label: m.label, color: m.color } }} className="h-10 w-28 opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                <AreaChart data={m.spark} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
                  <defs>
                    <linearGradient id={`fill-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-v)" stopOpacity={0.38} />
                      <stop offset="100%" stopColor="var(--color-v)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="v"
                    type="monotone"
                    stroke="var(--color-v)"
                    strokeWidth={2}
                    fill={`url(#fill-${m.id})`}
                    isAnimationActive
                    animationDuration={900}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </article>
        )
      })}
    </div>
  )
}
