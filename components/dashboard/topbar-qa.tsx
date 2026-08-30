'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Search, Bell, Plus, SlidersHorizontal, X, Check, FileText, Menu,
  LayoutGrid, BarChart3, Users, Workflow, Database, FileText as FileIcon,
  Settings, LifeBuoy, Trash2, Activity, ShieldCheck, ArrowRight,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { accounts, customerFiles, databases, metrics, pipelineStages } from '@/lib/data'

type CustomFilter = {
  id: string
  name: string
  field: 'status' | 'owner' | 'industry' | 'plan' | 'health'
  operator: 'equals' | 'contains' | 'gte' | 'lte'
  value: string
}

type Destination = { href: string; label: string; kind: string }

const titles: Record<string, string> = {
  '/': 'Overview', '/analytics': 'Analytics', '/accounts': 'Accounts', '/pipelines': 'Pipelines',
  '/databases': 'Databases', '/client-files': 'Client files', '/activity': 'Activity',
  '/alerts': 'Alerts & automation', '/reports': 'Reports', '/team': 'Team & access',
  '/settings': 'Settings', '/support': 'Support', '/billing': 'Billing', '/onboarding': 'Onboarding',
}

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutGrid },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/accounts', label: 'Accounts', icon: Users },
  { href: '/pipelines', label: 'Pipelines', icon: Workflow },
  { href: '/databases', label: 'Databases', icon: Database },
  { href: '/client-files', label: 'Client files', icon: FileIcon },
  { href: '/activity', label: 'Activity', icon: Activity },
  { href: '/alerts', label: 'Alerts', icon: Bell },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/team', label: 'Team', icon: ShieldCheck },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/support', label: 'Support', icon: LifeBuoy },
]

const destinations: Destination[] = [
  ...Object.entries(titles).map(([href, label]) => ({ href, label, kind: 'Page' })),
  ...accounts.map((a) => ({ href: `/accounts/${a.id}`, label: a.company, kind: 'Account' })),
  ...customerFiles.map((f) => ({ href: '/client-files', label: f.company, kind: 'File' })),
  ...databases.map((d) => ({ href: '/databases', label: d.name, kind: 'Database' })),
  ...pipelineStages.flatMap((s) => s.deals.map((d) => ({ href: '/pipelines', label: d.company, kind: 'Deal' }))),
]

const notificationItems = [
  { text: 'Verdant Health is at risk', href: '/accounts?status=At%20risk' },
  { text: 'Atlas Freight report is ready', href: '/analytics' },
  { text: 'Lumen Robotics sync completed', href: '/client-files' },
]

function getCurrentTitle(pathname: string) {
  if (titles[pathname]) return titles[pathname]
  if (pathname.startsWith('/accounts/')) return 'Account workspace'
  return 'Overview'
}

export function TopbarQA() {
  const pathname = usePathname()
  const router = useRouter()
  const current = getCurrentTitle(pathname)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [reportName, setReportName] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [onlyRisk, setOnlyRisk] = useState(false)
  const [readNotifications, setReadNotifications] = useState(false)
  const [customFilters, setCustomFilters] = useState<CustomFilter[]>([])
  const [customBuilderOpen, setCustomBuilderOpen] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [filterField, setFilterField] = useState<CustomFilter['field']>('status')
  const [filterOperator, setFilterOperator] = useState<CustomFilter['operator']>('equals')
  const [filterValue, setFilterValue] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      setReadNotifications(window.localStorage.getItem('helm.notifications.read') === '1')
      const saved = window.localStorage.getItem('helm.custom-filters')
      if (saved) setCustomFilters(JSON.parse(saved) as CustomFilter[])
    } catch {}
  }, [])

  useEffect(() => {
    try { window.localStorage.setItem('helm.custom-filters', JSON.stringify(customFilters)) } catch {}
  }, [customFilters])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return destinations.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 8)
  }, [query])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (searchRef.current && !searchRef.current.contains(target)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.querySelector<HTMLInputElement>('input')?.focus()
        setSearchOpen(true)
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setFilterOpen(false)
        setNotificationsOpen(false)
        setReportOpen(false)
        setMenuOpen(false)
        setCustomBuilderOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const go = (href: string) => {
    router.push(href)
    setSearchOpen(false)
    setFilterOpen(false)
    setNotificationsOpen(false)
    setReportOpen(false)
    setMenuOpen(false)
  }

  const submitSearch = (value: string) => {
    const clean = value.trim()
    if (!clean) return
    const match = destinations.find((item) => item.label.toLowerCase() === clean.toLowerCase())
    go(match?.href ?? `/accounts?search=${encodeURIComponent(clean)}`)
  }

  const applyCustomFilter = (filter: CustomFilter) => {
    const params = new URLSearchParams({
      customField: filter.field,
      customOperator: filter.operator,
      customValue: filter.value,
    })
    go(`/accounts?${params.toString()}`)
    setToast(`Applied “${filter.name}”`)
  }

  const saveCustomFilter = () => {
    const value = filterValue.trim()
    if (!value) {
      setToast('Enter a filter value first')
      return
    }
    const name = filterName.trim() || `${filterField} ${filterOperator} ${value}`
    const next: CustomFilter = { id: `cf-${Date.now()}`, name, field: filterField, operator: filterOperator, value }
    setCustomFilters((current) => [next, ...current])
    setFilterName('')
    setFilterValue('')
    setCustomBuilderOpen(false)
    setToast(`Saved “${name}”`)
  }

  const createReport = () => {
    const name = reportName.trim() || `${current} report`
    const rows = [['Metric', 'Value', 'Change'], ...metrics.map((m) => [m.label, m.value, `${m.delta}%`])]
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')
    const blob = new Blob([`Helm report\n${name}\nGenerated from ${current}\n\n${csv}\n`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'helm-report'}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    setReportOpen(false)
    setReportName('')
    setToast('Report downloaded')
  }

  const markNotificationsRead = () => {
    setReadNotifications(true)
    try { window.localStorage.setItem('helm.notifications.read', '1') } catch {}
    setNotificationsOpen(false)
    setToast('Notifications marked as read')
  }

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-sm sm:gap-4 sm:px-5">
        <button type="button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden">
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>

        <div className="min-w-0"><div className="flex items-center gap-2 text-sm"><span className="hidden text-muted-foreground sm:inline">Workspace</span><span className="hidden text-muted-foreground/40 sm:inline">/</span><span className="truncate font-medium text-foreground">{current}</span></div></div>

        <div ref={searchRef} className="relative ml-auto hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => { setQuery(e.target.value); setSearchOpen(true) }} onFocus={() => setSearchOpen(true)} onKeyDown={(e) => { if (e.key === 'Enter') submitSearch(query) }} placeholder="Search anything…" aria-label="Search anything" className="h-9 border-border bg-secondary/50 pl-9 pr-16 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring" />
          <span className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground lg:inline">⌘K</span>
          {query && <button type="button" aria-label="Clear search" onClick={() => { setQuery(''); setSearchOpen(false) }} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground lg:hidden"><X className="size-3.5" /></button>}
          {searchOpen && query.trim() && <div className="premium-pop absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-xl">
            {results.length ? results.map((result) => <button key={`${result.kind}-${result.label}`} type="button" onClick={() => go(result.href)} className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left hover:bg-accent"><Search className="size-3.5 text-muted-foreground" /><span className="min-w-0 flex-1 truncate text-sm text-foreground">{result.label}</span><span className="text-[10px] text-muted-foreground">{result.kind}</span></button>) : <p className="px-2.5 py-2 text-xs text-muted-foreground">Press Enter to search accounts.</p>}
          </div>}
        </div>

        <button type="button" onClick={() => setReportOpen(true)} className="hidden h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90 sm:flex"><Plus className="size-3.5" />New report</button>

        <div className="relative">
          <button type="button" aria-label="Open filters" aria-expanded={filterOpen} onClick={() => { setFilterOpen((v) => !v); setNotificationsOpen(false) }} className="relative flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"><SlidersHorizontal className="size-4" /></button>
          {filterOpen && <div className="premium-pop absolute right-0 top-11 z-50 w-[min(24rem,calc(100vw-1.5rem))] rounded-xl border border-border bg-popover p-3 shadow-2xl">
            <div className="mb-3 flex items-center justify-between"><div><p className="text-sm font-medium text-foreground">Filters</p><p className="text-[11px] text-muted-foreground">Create reusable account views.</p></div><button type="button" onClick={() => setFilterOpen(false)} aria-label="Close filters"><X className="size-4 text-muted-foreground" /></button></div>
            <button type="button" onClick={() => go('/accounts?status=At%20risk')} className="mb-2 flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left hover:bg-accent"><span className="text-sm text-foreground">At-risk accounts</span><ArrowRight className="size-3.5 text-muted-foreground" /></button>
            {customFilters.length > 0 && <div className="mb-3 border-t border-border pt-3"><p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Saved filters</p>{customFilters.map((filter) => <div key={filter.id} className="flex items-center gap-1"><button type="button" onClick={() => applyCustomFilter(filter)} className="min-w-0 flex-1 rounded-md px-2.5 py-2 text-left hover:bg-accent"><span className="block truncate text-xs font-medium text-foreground">{filter.name}</span><span className="block truncate text-[10px] text-muted-foreground">{filter.field} {filter.operator} {filter.value}</span></button><button type="button" aria-label={`Delete ${filter.name}`} onClick={() => setCustomFilters((all) => all.filter((item) => item.id !== filter.id))} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary"><Trash2 className="size-3.5" /></button></div>)}</div>}
            <button type="button" onClick={() => setCustomBuilderOpen((v) => !v)} className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border py-2 text-xs font-medium text-foreground hover:bg-secondary"><Plus className="size-3.5" />Create custom filter</button>
            {customBuilderOpen && <div className="mt-3 rounded-lg border border-border bg-secondary/30 p-3"><div className="grid grid-cols-2 gap-2"><label className="text-[11px] text-muted-foreground">Field<select value={filterField} onChange={(e) => { const next = e.target.value as CustomFilter['field']; setFilterField(next); setFilterOperator(next === 'health' ? 'gte' : 'equals') }} className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-xs text-foreground"><option value="status">Status</option><option value="owner">Owner</option><option value="industry">Industry</option><option value="plan">Plan</option><option value="health">Health score</option></select></label><label className="text-[11px] text-muted-foreground">Condition<select value={filterOperator} onChange={(e) => setFilterOperator(e.target.value as CustomFilter['operator'])} className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-xs text-foreground">{filterField === 'health' ? <><option value="gte">At least</option><option value="lte">At most</option></> : <><option value="equals">Equals</option><option value="contains">Contains</option></>}</select></label></div><Input value={filterValue} onChange={(e) => setFilterValue(e.target.value)} placeholder={filterField === 'health' ? 'e.g. 75' : 'e.g. Enterprise'} className="mt-2 h-9" /><Input value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="Filter name (optional)" className="mt-2 h-9" /><button type="button" onClick={saveCustomFilter} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-primary py-2 text-xs font-medium text-primary-foreground"><Save className="size-3.5" />Save filter</button></div>}
          </div>}
        </div>

        <div className="relative">
          <button type="button" aria-label="Open notifications" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen((v) => !v); setFilterOpen(false) }} className="relative flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"><Bell className="size-4" />{!readNotifications && <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-foreground" />}</button>
          {notificationsOpen && <div className="premium-pop absolute right-0 top-11 z-50 w-80 rounded-xl border border-border bg-popover p-2 shadow-2xl"><div className="flex items-center justify-between border-b border-border px-2.5 py-2"><div><p className="text-sm font-medium text-foreground">Notifications</p><p className="text-[11px] text-muted-foreground">Recent workspace activity</p></div><button type="button" onClick={markNotificationsRead} className="text-[11px] font-medium text-muted-foreground hover:text-foreground">Mark read</button></div>{notificationItems.map((item) => <Link key={item.text} href={item.href} onClick={() => setNotificationsOpen(false)} className="flex items-center gap-3 rounded-md px-2.5 py-2.5 hover:bg-accent"><span className="size-1.5 shrink-0 rounded-full bg-foreground" /><span className="text-xs text-foreground">{item.text}</span></Link>)}</div>}
        </div>
      </header>

      {menuOpen && <div className="premium-pop fixed inset-x-0 top-16 z-30 border-b border-border bg-background/95 p-3 backdrop-blur lg:hidden"><div className="mb-3"><Input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submitSearch(query) }} placeholder="Search accounts, files…" aria-label="Mobile search" className="h-9" /></div><nav className="grid grid-cols-2 gap-1">{navItems.map((item) => { const Icon = item.icon; const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`)); return <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-xs font-medium ${active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}><Icon className="size-3.5" />{item.label}</Link> })}</nav><button type="button" onClick={() => { setMenuOpen(false); setReportOpen(true) }} className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-xs font-medium text-primary-foreground"><Plus className="size-3.5" />New report</button></div>}

      {reportOpen && <div className="premium-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true"><div className="premium-pop w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Export</p><h2 className="mt-1 text-base font-semibold text-foreground">Create report</h2><p className="mt-1 text-xs text-muted-foreground">Download the current headline metrics.</p></div><button type="button" aria-label="Close report dialog" onClick={() => setReportOpen(false)}><X className="size-5 text-muted-foreground" /></button></div><Input autoFocus value={reportName} onChange={(e) => setReportName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') createReport() }} placeholder="Report name" className="mt-5 h-10" /><div className="mt-4 flex gap-2"><button type="button" onClick={() => setReportOpen(false)} className="h-9 flex-1 rounded-md border border-border text-sm">Cancel</button><button type="button" onClick={createReport} className="h-9 flex-1 rounded-md bg-primary text-sm font-medium text-primary-foreground">Download report</button></div></div></div>}

      {toast && <div role="status" className="premium-toast fixed bottom-5 right-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm text-foreground shadow-xl">{toast}</div>}
    </>
  )
}
