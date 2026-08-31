import { PageHeader } from '@/components/dashboard/page-header'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts'
import { CustomerFiles } from '@/components/dashboard/customer-files'
import { ActionCenter } from '@/components/dashboard/action-center'
import { ActivityFeed } from '@/components/dashboard/activity-feed'

export default function OverviewPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Client intelligence"
        description="A clear view of revenue, account health, and the work that needs attention."
        live
      />
      <MetricCards />
      <ActionCenter />
      <AnalyticsCharts />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
        <CustomerFiles />
        <ActivityFeed />
      </div>
    </div>
  )
}
