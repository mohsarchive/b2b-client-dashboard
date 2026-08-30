'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { revenueSeries, segmentSeries } from '@/lib/data'

const revenueConfig = {
  mrr: { label: 'MRR', color: 'var(--chart-1)' },
  expansion: { label: 'Expansion', color: 'var(--chart-2)' },
} satisfies ChartConfig

const segmentConfig = {
  value: { label: 'Share', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <section className="premium-surface premium-enter rounded-xl p-5 lg:col-span-2">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-foreground">Recurring revenue</h2>
              <span className="rounded-full bg-chart-3/10 px-1.5 py-0.5 text-[10px] font-medium text-chart-3">Growing</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Monthly recurring vs. expansion revenue (in $K)</p>
          </div>
          <div className="flex items-center gap-4">
            <Legend color="var(--chart-1)" label="MRR" />
            <Legend color="var(--chart-2)" label="Expansion" />
          </div>
        </div>

        <ChartContainer config={revenueConfig} className="h-64 w-full">
          <AreaChart data={revenueSeries} margin={{ left: -12, right: 8, top: 6 }}>
            <defs>
              <linearGradient id="g-mrr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-mrr)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--color-mrr)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g-exp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-expansion)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--color-expansion)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} width={48} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
            <ChartTooltip cursor={{ stroke: 'var(--border)' }} content={<ChartTooltipContent indicator="dot" />} />
            <Area dataKey="expansion" type="monotone" stroke="var(--color-expansion)" strokeWidth={2} fill="url(#g-exp)" stackId="a" isAnimationActive animationDuration={850} animationEasing="ease-out" />
            <Area dataKey="mrr" type="monotone" stroke="var(--color-mrr)" strokeWidth={2.2} fill="url(#g-mrr)" stackId="a" isAnimationActive animationDuration={1000} animationEasing="ease-out" />
          </AreaChart>
        </ChartContainer>
      </section>

      <section className="premium-surface premium-enter rounded-xl p-5" style={{ animationDelay: '70ms' }}>
        <div className="mb-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-foreground">Revenue by segment</h2>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">ARR mix</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Share of ARR by account tier</p>
        </div>

        <ChartContainer config={segmentConfig} className="h-64 w-full">
          <BarChart data={segmentSeries} layout="vertical" margin={{ left: 8, right: 16 }}>
            <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 4" />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="segment" tickLine={false} axisLine={false} width={82} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
            <ChartTooltip cursor={{ fill: 'var(--foreground)', opacity: 0.035 }} content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={[0, 6, 6, 0]} barSize={22} isAnimationActive animationDuration={900} animationEasing="ease-out" />
          </BarChart>
        </ChartContainer>
      </section>
    </div>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}
