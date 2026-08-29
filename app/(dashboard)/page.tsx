import { PageHeader } from '@/components/dashboard/page-header'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts'
import { CustomerFiles } from '@/components/dashboard/customer-files'

export default function OverviewPage() {
  return (
    <>
      <PageHeader
        title="Client intelligence"
        description="Real-time performance across your customer accounts and datasets."
        live
      />
      <MetricCards />
      <AnalyticsCharts />
      <CustomerFiles />
    </>
  )
}
