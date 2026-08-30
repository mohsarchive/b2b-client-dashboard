'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, BarChart3, Users, Database, FileText, Workflow, Settings, LifeBuoy, ChevronsUpDown, Hexagon, User, CreditCard, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const nav = [{ group: 'Workspace', items: [{ icon: LayoutGrid, label: 'Overview', href: '/' }, { icon: BarChart3, label: 'Analytics', href: '/analytics' }, { icon: Users, label: 'Accounts', href: '/accounts' }, { icon: Workflow, label: 'Pipelines', href: '/pipelines' }] }, { group: 'Data', items: [{ icon: Database, label: 'Databases', href: '/databases' }, { icon: FileText, label: 'Client files', href: '/client-files' }] }]

export function Sidebar() {
  const pathname = usePathname()
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        const input = document.querySelector<HTMLInputElement>('input[aria-label="Search accounts and files"]')
        input?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => { if (!toast) return; const t = window.setTimeout(() => setToast(null), 2500); return () => window.clearTimeout(t) }, [toast])

  return <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex"><div className="flex h-16 items-center gap-2.5 px-5"><div className="flex size-7 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30"><Hexagon className="size-4 text-primary" /></div><span className="text-[15px] font-semibold tracking-tight text-sidebar-foreground">Helm</span><kbd className="ml-auto rounded border border-sidebar-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd></div><nav className="flex-1 overflow-y-auto px-3 py-2">{nav.map((section) => <div key={section.group} className="mb-5"><p className="px-2 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">{section.group}</p><ul className="flex flex-col gap-0.5">{section.items.map((item) => { const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href); return <li key={item.label}><Link href={item.href} className={cn('group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors', isActive ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground')}><item.icon className={cn('size-4 transition-colors', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-sidebar-foreground')} />{item.label}</Link></li> })}</ul></div>)}</nav><div className="border-t border-sidebar-border p-3"><ul className="mb-2 flex flex-col gap-0.5">{[{ icon: Settings, label: 'Settings', href: '/settings' }, { icon: LifeBuoy, label: 'Support', href: '/support' }].map((item) => { const isActive = pathname.startsWith(item.href); return <li key={item.label}><Link href={item.href} className={cn('group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors', isActive ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground')}><item.icon className={cn('size-4', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-sidebar-foreground')} />{item.label}</Link></li> })}</ul><DropdownMenu><DropdownMenuTrigger render={<button type="button" className="flex w-full items-center gap-2.5 rounded-md p-2 text-left outline-none transition-colors hover:bg-sidebar-accent/60 focus-visible:ring-1 focus-visible:ring-sidebar-ring" />}><span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-2 text-xs font-semibold text-primary-foreground">AV</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-sidebar-foreground">Ava Chen</span><span className="block truncate text-xs text-muted-foreground">ava@helm.io</span></span><ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" /></DropdownMenuTrigger><DropdownMenuContent align="end" side="top" className="w-56"><DropdownMenuGroup><DropdownMenuLabel className="font-normal"><span className="block text-sm font-medium text-foreground">Ava Chen</span><span className="block text-xs text-muted-foreground">Admin · Helm workspace</span></DropdownMenuLabel></DropdownMenuGroup><DropdownMenuSeparator /><DropdownMenuItem render={<Link href="/settings" />}><User className="size-4" />Profile</DropdownMenuItem><DropdownMenuItem render={<Link href="/settings" />}><CreditCard className="size-4" />Billing</DropdownMenuItem><DropdownMenuItem render={<Link href="/settings" />}><Settings className="size-4" />Settings</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem variant="destructive" onClick={() => setToast('You have been logged out of this demo workspace')}><LogOut className="size-4" />Log out</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>{toast && <button type="button" onClick={() => setToast(null)} className="fixed bottom-5 left-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm text-foreground shadow-xl">{toast}</button>}</aside>
}
