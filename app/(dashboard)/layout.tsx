import type { ReactNode } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { TopbarQA } from '@/components/dashboard/topbar-qa'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopbarQA />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10 lg:py-10 xl:px-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
