import { Suspense } from 'react'
import { PageHeader } from '@/components/dashboard/page-header'
import { AccountsTable } from '@/components/dashboard/accounts-table'

function AccountsFallback() {
  return <div className="h-64 rounded-xl border border-border bg-card/50" aria-hidden="true" />
}

export default function AccountsPage() {
  return (
    <>
      <PageHeader
        title="Accounts"
        description="Every customer account with owner, spend, and health at a glance."
      />
      <Suspense fallback={<AccountsFallback />}>
        <AccountsTable />
      </Suspense>
    </>
  )
}
