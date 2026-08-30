import { PageHeader } from '@/components/dashboard/page-header'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts'
import { CustomerFiles } from '@/components/dashboard/customer-files'
import { ActionCenter } from '@/components/dashboard/action-center'
import { ActivityFeed } from '@/components/dashboard/activity-feed'

export default function OverviewPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Client intelligence"
        description="Know what is happening, what needs attention, and what to do next."
        live
      />
      <MetricCards />
      <ActionCenter />
      <AnalyticsCharts />
      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <CustomerFiles />
        <ActivityFeed />
      </div>
    </div>
  )
}
