import { PageHeader } from '@/components/dashboard/page-header'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts'
import { AnalyticsPanels } from '@/components/dashboard/analytics-panels'

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Revenue, retention, and growth signals across the full customer base."
        live
      />
      <MetricCards />
      <AnalyticsCharts />
      <AnalyticsPanels />
    </>
  )
}
