'use client'

import { Area, AreaChart } from 'recharts'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { ChartContainer } from '@/components/ui/chart'
import { metrics } from '@/lib/data'
import { cn } from '@/lib/utils'

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m) => {
        const positive = m.delta >= 0
        return (
          <div
            key={m.id}
            className="group relative flex flex-col gap-3 bg-card p-5 transition-colors hover:bg-card/60"
          >
            <div className="flex items-start justify-between">
              <p className="text-[13px] text-muted-foreground">{m.label}</p>
              <span
                className={cn(
                  'flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium',
                  positive
                    ? 'bg-chart-3/10 text-chart-3'
                    : 'bg-chart-5/10 text-chart-5',
                )}
              >
                {positive ? (
                  <ArrowUpRight className="size-3" />
                ) : (
                  <ArrowDownRight className="size-3" />
                )}
                {Math.abs(m.delta)}%
              </span>
            </div>

            <div className="flex items-end justify-between gap-2">
              <p className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
                {m.value}
              </p>
              <ChartContainer
                config={{ v: { label: m.label, color: m.color } }}
                className="h-10 w-24"
              >
                <AreaChart data={m.spark} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
                  <defs>
                    <linearGradient id={`fill-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-v)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-v)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="v"
                    type="monotone"
                    stroke="var(--color-v)"
                    strokeWidth={1.75}
                    fill={`url(#fill-${m.id})`}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        )
      })}
    </div>
  )
}
