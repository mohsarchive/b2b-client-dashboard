'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { revenueSeries, segmentSeries } from '@/lib/data'

const revenueConfig = {
  mrr: { label: 'MRR', color: 'var(--chart-1)' },
  expansion: { label: 'Expansion', color: 'var(--chart-3)' },
} satisfies ChartConfig

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.55fr_0.45fr]">
      <section className="border-y border-border py-5">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">Recurring revenue</h2>
            <p className="mt-1 text-xs text-muted-foreground">Monthly recurring revenue and expansion, $K</p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
            <Legend color="var(--chart-1)" label="MRR" />
            <Legend color="var(--chart-3)" label="Expansion" />
          </div>
        </div>

        <ChartContainer config={revenueConfig} className="h-72 w-full">
          <AreaChart data={revenueSeries} margin={{ left: -18, right: 4, top: 8 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.55} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} width={42} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
            <ChartTooltip cursor={{ stroke: 'var(--border)' }} content={<ChartTooltipContent indicator="line" />} />
            <Area dataKey="mrr" type="monotone" stroke="var(--color-mrr)" strokeWidth={2.5} fill="none" isAnimationActive animationDuration={700} animationEasing="ease-out" />
            <Area dataKey="expansion" type="monotone" stroke="var(--color-expansion)" strokeWidth={1.8} fill="none" isAnimationActive animationDuration={700} animationEasing="ease-out" />
          </AreaChart>
        </ChartContainer>
      </section>

      <section className="border-y border-border py-5">
        <div className="mb-6">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">Revenue mix</h2>
          <p className="mt-1 text-xs text-muted-foreground">ARR by account tier</p>
        </div>
        <div className="space-y-5">
          {segmentSeries.map((item, index) => (
            <div key={item.segment}>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <span className="text-xs font-medium text-foreground">{item.segment}</span>
                <span className="text-xs tabular-nums text-muted-foreground">{item.value}%</span>
              </div>
              <div className="h-1 overflow-hidden bg-secondary">
                <div className="h-full bg-foreground" style={{ width: `${item.value}%` }} />
              </div>
              <span className="mt-1.5 block text-[10px] text-muted-foreground">{index === 0 ? 'Largest share of ARR' : index === 1 ? 'Established accounts' : 'Emerging segment'}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}
