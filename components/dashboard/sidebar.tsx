'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, BarChart3, BellRing, ChevronsUpDown, Database, FileBarChart, FileText, LayoutGrid, LifeBuoy, Settings, UserPlus, Users, Workflow, CreditCard, LogOut, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const nav = [
  { group: 'Workspace', items: [
    { icon: LayoutGrid, label: 'Overview', href: '/' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Users, label: 'Accounts', href: '/accounts' },
    { icon: Workflow, label: 'Pipelines', href: '/pipelines' },
  ]},
  { group: 'Operations', items: [
    { icon: BellRing, label: 'Alerts', href: '/alerts' },
    { icon: Activity, label: 'Activity', href: '/activity' },
    { icon: FileBarChart, label: 'Reports', href: '/reports' },
  ]},
  { group: 'Data', items: [
    { icon: Database, label: 'Databases', href: '/databases' },
    { icon: FileText, label: 'Client files', href: '/client-files' },
  ]},
]

export function Sidebar() {
  const pathname = usePathname()
  const [toast, setToast] = useState(false)

  return (
    <aside className="hidden w-[224px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-sidebar-foreground">Helm</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {nav.map((section) => (
          <div key={section.group} className="mb-7">
            <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">{section.group}</p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={cn('flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] transition-colors', active ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground')}>
                      <Icon className="size-3.5" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="mb-2 space-y-0.5">
          {[
            { icon: UserPlus, label: 'Team', href: '/team' },
            { icon: Settings, label: 'Settings', href: '/settings' },
            { icon: LifeBuoy, label: 'Support', href: '/support' },
          ].map((item) => {
            const Icon = item.icon
            return <Link key={item.href} href={item.href} className="flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"><Icon className="size-3.5" />{item.label}</Link>
          })}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger render={<button type="button" className="flex w-full items-center gap-2.5 border border-sidebar-border px-2.5 py-2 text-left outline-none hover:bg-sidebar-accent/60" />}>
            <span className="flex size-7 items-center justify-center border border-sidebar-border text-[10px] font-semibold text-sidebar-foreground">AC</span>
            <span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium text-sidebar-foreground">Ava Chen</span><span className="block truncate text-[10px] text-muted-foreground">Administrator</span></span>
            <ChevronsUpDown className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal"><span className="block text-sm font-medium text-foreground">Ava Chen</span><span className="block text-xs text-muted-foreground">Admin · Helm workspace</span></DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/settings" />}><User className="size-4" />Profile</DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/billing" />}><CreditCard className="size-4" />Billing</DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/settings" />}><Settings className="size-4" />Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => setToast(true)}><LogOut className="size-4" />Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {toast && <button type="button" onClick={() => setToast(false)} className="fixed bottom-5 left-5 z-[110] border border-border bg-popover px-4 py-3 text-sm text-foreground shadow-lg">Signed out of this demo workspace</button>}
    </aside>
  )
}
