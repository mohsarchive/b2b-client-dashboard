import { PageHeader } from '@/components/dashboard/page-header'
import { AccountsTable } from '@/components/dashboard/accounts-table'

export default function AccountsPage() {
  return (
    <>
      <PageHeader
        title="Accounts"
        description="Every customer account with owner, spend, and health at a glance."
      />
      <AccountsTable />
    </>
  )
}
