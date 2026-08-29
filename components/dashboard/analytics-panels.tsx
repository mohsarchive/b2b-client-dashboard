'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { retentionSeries, acquisitionSeries } from '@/lib/data'

const retentionConfig = {
  nrr: { label: 'Net retention', color: 'var(--chart-1)' },
  gross: { label: 'Gross retention', color: 'var(--chart-2)' },
} satisfies ChartConfig

const acquisitionConfig = {
  added: { label: 'Added', color: 'var(--chart-3)' },
  churned: { label: 'Churned', color: 'var(--chart-5)' },
} satisfies ChartConfig

export function AnalyticsPanels() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <section className="rounded-xl border border-border bg-card p-5">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-sm font-medium text-foreground">Retention trend</h2>
            <p className="text-xs text-muted-foreground">Net vs. gross revenue retention (%)</p>
          </div>
          <div className="flex items-center gap-4">
            <Legend color="var(--chart-1)" label="NRR" />
            <Legend color="var(--chart-2)" label="GRR" />
          </div>
        </div>
        <ChartContainer config={retentionConfig} className="h-60 w-full">
          <LineChart data={retentionSeries} margin={{ left: -12, right: 8, top: 4 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            />
            <YAxis
              domain={[90, 120]}
              tickLine={false}
              axisLine={false}
              width={40}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="nrr" type="monotone" stroke="var(--color-nrr)" strokeWidth={2} dot={false} />
            <Line dataKey="gross" type="monotone" stroke="var(--color-gross)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-sm font-medium text-foreground">Account movement</h2>
            <p className="text-xs text-muted-foreground">Accounts added vs. churned</p>
          </div>
          <div className="flex items-center gap-4">
            <Legend color="var(--chart-3)" label="Added" />
            <Legend color="var(--chart-5)" label="Churned" />
          </div>
        </div>
        <ChartContainer config={acquisitionConfig} className="h-60 w-full">
          <BarChart data={acquisitionSeries} margin={{ left: -12, right: 8, top: 4 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="added" fill="var(--color-added)" radius={[4, 4, 0, 0]} barSize={18} />
            <Bar dataKey="churned" fill="var(--color-churned)" radius={[4, 4, 0, 0]} barSize={18} />
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
