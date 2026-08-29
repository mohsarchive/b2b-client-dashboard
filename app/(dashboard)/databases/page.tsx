import { PageHeader } from '@/components/dashboard/page-header'
import { DatabasesList } from '@/components/dashboard/databases-list'

export default function DatabasesPage() {
  return (
    <>
      <PageHeader
        title="Databases"
        description="Live status, load, and capacity across your managed instances."
        live
      />
      <DatabasesList />
    </>
  )
}
