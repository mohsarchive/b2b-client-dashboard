import { PageHeader } from '@/components/dashboard/page-header'
import { SupportContent } from '@/components/dashboard/support-content'

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Support"
        description="Get help, browse resources, and track your open requests."
      />
      <SupportContent />
    </div>
  )
}
