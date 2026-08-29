import { PageHeader } from '@/components/dashboard/page-header'
import { CustomerFiles } from '@/components/dashboard/customer-files'

export default function ClientFilesPage() {
  return (
    <>
      <PageHeader
        title="Client files"
        description="Customer database exports and their sync status across regions."
      />
      <CustomerFiles />
    </>
  )
}
