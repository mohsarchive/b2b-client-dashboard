'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Bell, Plus, SlidersHorizontal, X, Check, FileText, Menu, LayoutGrid, BarChart3, Users, Workflow, Database, FileText as FileIcon, Settings, LifeBuoy, Trash2, Save } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { accounts, customerFiles, databases, metrics, pipelineStages } from '@/lib/data'

type CustomFilter = { id: string; name: string; field: 'status' | 'owner' | 'industry' | 'plan' | 'health'; operator: 'equals' | 'contains' | 'gte' | 'lte'; value: string }

const titles: Record<string, string> = { '/': 'Overview', '/analytics': 'Analytics', '/accounts': 'Accounts', '/pipelines': 'Pipelines', '/databases': 'Databases', '/client-files': 'Client files', '/settings': 'Settings', '/support': 'Support' }
const navItems = [
  { href: '/', label: 'Overview', icon: LayoutGrid }, { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/accounts', label: 'Accounts', icon: Users }, { href: '/pipelines', label: 'Pipelines', icon: Workflow },
  { href: '/databases', label: 'Databases', icon: Database }, { href: '/client-files', label: 'Client files', icon: FileIcon },
  { href: '/settings', label: 'Settings', icon: Settings }, { href: '/support', label: 'Support', icon: LifeBuoy },
]
const destinations = [
  ...Object.entries(titles).map(([href, label]) => ({ href, label, kind: 'Page' })),
  ...accounts.map((a) => ({ href: '/accounts', label: a.company, kind: 'Account' })),
  ...customerFiles.map((f) => ({ href: '/client-files', label: f.company, kind: 'File' })),
  ...databases.map((d) => ({ href: '/databases', label: d.name, kind: 'Database' })),
  ...pipelineStages.flatMap((s) => s.deals.map((d) => ({ href: '/pipelines', label: d.company, kind: 'Deal' }))),
]
const notificationItems = [
  { text: 'Verdant Health is at risk', href: '/accounts?status=At%20risk' },
  { text: 'Atlas Freight report is ready', href: '/analytics' },
  { text: 'Lumen Robotics sync completed', href: '/client-files' },
]
const filterFields = [
  { value: 'status', label: 'Status', operators: ['equals'] },
  { value: 'owner', label: 'Owner', operators: ['equals', 'contains'] },
  { value: 'industry', label: 'Industry', operators: ['equals', 'contains'] },
  { value: 'plan', label: 'Plan', operators: ['equals', 'contains'] },
  { value: 'health', label: 'Health score', operators: ['gte', 'lte'] },
] as const

export function Topbar() {
  const pathname = usePathname()
  const router = useRouter()
  const current = titles[pathname] ?? 'Overview'
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
    return destinations.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 7)
  }, [query])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 2500)
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
        setSearchOpen(false); setFilterOpen(false); setNotificationsOpen(false); setReportOpen(false); setMenuOpen(false); setCustomBuilderOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const submitSearch = (value: string) => {
    const clean = value.trim()
    if (!clean) return
    const match = destinations.find((item) => item.label.toLowerCase() === clean.toLowerCase())
    router.push(match ? match.href : `/accounts?search=${encodeURIComponent(clean)}`)
    setSearchOpen(false); setMenuOpen(false)
  }

  const clearQuickFilter = () => {
    setOnlyRisk(false); setFilterOpen(false)
    if (pathname.startsWith('/accounts')) router.replace('/accounts')
  }

  const applyCustomFilter = (filter: CustomFilter) => {
    const params = new URLSearchParams()
    params.set('customField', filter.field); params.set('customOperator', filter.operator); params.set('customValue', filter.value)
    router.push(`/accounts?${params.toString()}`)
    setFilterOpen(false); setCustomBuilderOpen(false); setMenuOpen(false)
    setToast(`Applied “${filter.name}”`)
  }

  const saveCustomFilter = () => {
    const name = filterName.trim() || `${filterField} ${filterOperator} ${filterValue || 'filter'}`
    if (!filterValue.trim()) return
    const next: CustomFilter = { id: `cf-${Date.now()}`, name, field: filterField, operator: filterOperator, value: filterValue.trim() }
    setCustomFilters((current) => [next, ...current])
    setFilterName(''); setFilterValue(''); setCustomBuilderOpen(false)
    setToast(`Saved “${name}”`)
  }

  const markNotificationsRead = () => {
    setReadNotifications(true)
    try { window.localStorage.setItem('helm.notifications.read', '1') } catch {}
    setNotificationsOpen(false); setToast('All notifications marked as read')
  }

  const createReport = () => {
    const name = reportName.trim() || `${current} report`
    const rows = [['Metric', 'Value', 'Change'], ...metrics.map((metric) => [metric.label, metric.value, `${metric.delta}%`])]
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')
    const blob = new Blob([`Helm report\n${name}\nGenerated from ${current}\n\n${csv}\n`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url
    link.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'helm-report'}.csv`; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url)
    setReportOpen(false); setReportName(''); setToast('Report created and downloaded')
  }

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 sm:gap-4 sm:px-5">
        <button type="button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden">{menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}</button>
        <div className="min-w-0"><div className="flex items-center gap-2 text-sm"><span className="hidden text-muted-foreground sm:inline">Workspace</span><span className="hidden text-muted-foreground/40 sm:inline">/</span><span className="truncate font-medium text-foreground">{current}</span></div></div>
        <div ref={searchRef} className="relative ml-auto hidden max-w-xs flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => { setQuery(e.target.value); setSearchOpen(true) }} onFocus={() => setSearchOpen(true)} onKeyDown={(e) => { if (e.key === 'Enter') submitSearch(query); if (e.key === 'Escape') setSearchOpen(false) }} placeholder="Search accounts, files…" aria-label="Search accounts and files" className="h-9 border-border bg-secondary/50 pl-9 pr-8 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring" />
          {query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"><X className="size-3.5" /></button>}
          {searchOpen && query.trim() && <div className="premium-pop absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-xl">{results.length ? results.map((result) => <button key={`${result.kind}-${result.label}`} type="button" onClick={() => submitSearch(result.label)} className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left hover:bg-accent"><Search className="size-3.5 text-muted-foreground" /><span className="min-w-0 flex-1 truncate text-sm text-foreground">{result.label}</span><span className="text-[10px] text-muted-foreground">{result.kind}</span></button>) : <p className="px-2.5 py-2 text-xs text-muted-foreground">Press Enter to search accounts.</p>}</div>}
        </div>
        <div className="relative">
          <button type="button" aria-label="Open filters" aria-expanded={filterOpen} onClick={() => { setFilterOpen((open) => !open); setNotificationsOpen(false) }} className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"><SlidersHorizontal className="size-4" /></button>
          {filterOpen && <div className="premium-pop absolute right-0 top-11 z-50 w-[min(24rem,calc(100vw-1.5rem))] rounded-xl border border-border bg-popover p-3 shadow-2xl">
            <div className="mb-3 flex items-center justify-between"><div><p className="text-sm font-medium text-foreground">Filters</p><p className="text-[11px] text-muted-foreground">Build and save reusable account filters.</p></div><button type="button" onClick={() => setFilterOpen(false)} aria-label="Close filters"><X className="size-4 text-muted-foreground" /></button></div>
            <label className="mb-2 flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-accent"><input type="checkbox" checked={onlyRisk} onChange={(e) => setOnlyRisk(e.target.checked)} className="size-4 accent-[var(--primary)]" /><span className="text-sm text-foreground">At-risk accounts only</span></label>
            {onlyRisk && <button type="button" onClick={() => { router.push('/accounts?status=At%20risk'); setFilterOpen(false) }} className="mb-3 w-full rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">View filtered accounts</button>}
            {customFilters.length > 0 && <div className="mb-3 border-t border-border pt-3"><p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Saved custom filters</p><div className="space-y-1">{customFilters.map((filter) => <div key={filter.id} className="flex items-center gap-1"><button type="button" onClick={() => applyCustomFilter(filter)} className="min-w-0 flex-1 rounded-md px-2.5 py-2 text-left hover:bg-accent"><span className="block truncate text-xs font-medium text-foreground">{filter.name}</span><span className="block truncate text-[10px] text-muted-foreground">{filter.field} {filter.operator} {filter.value}</span></button><button type="button" aria-label={`Delete ${filter.name}`} onClick={() => setCustomFilters((current) => current.filter((item) => item.id !== filter.id))} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-3.5" /></button></div>)}</div></div>}
            <button type="button" onClick={() => setCustomBuilderOpen((open) => !open)} className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border py-2 text-xs font-medium text-foreground hover:bg-secondary"><Plus className="size-3.5" />Create custom filter</button>
            {customBuilderOpen && <div className="mt-3 rounded-lg border border-border bg-secondary/30 p-3"><div className="grid grid-cols-2 gap-2"><label className="text-[11px] text-muted-foreground">Field<select value={filterField} onChange={(e) => { const next = e.target.value as CustomFilter['field']; setFilterField(next); setFilterOperator(next === 'health' ? 'gte' : 'equals') }} className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-xs text-foreground"><option value="status">Status</option><option value="owner">Owner</option><option value="industry">Industry</option><option value="plan">Plan</option><option value="health">Health score</option></select></label><label className="text-[11px] text-muted-foreground">Condition<select value={filterOperator} onChange={(e) => setFilterOperator(e.target.value as CustomFilter['operator'])} className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-xs text-foreground">{filterField === 'health' ? <><option value="gte">At least</option><option value="lte">At most</option></> : <><option value="equals">Equals</option><option value="contains">Contains</option></>}</select></label></div><Input value={filterValue} onChange={(e) => setFilterValue(e.target.value)} placeholder={filterField === 'health' ? 'e.g. 75' : `e.g. ${filterField === 'status' ? 'Active' : 'Enterprise'}`} className="mt-2 h-9" /><Input value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="Filter name (optional)" className="mt-2 h-9" /><button type="button" onClick={saveCustomFilter} disabled={!filterValue.trim()} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-primary py-2 text-xs font-medium text-primary-foreground disabled:opacity-50"><Save className="size-3.5" />Save filter</button></div>}
            {(onlyRisk || customFilters.length) > 0 && <button type="button" onClick={clearQuickFilter} className="mt-2 w-full rounded-md border border-border px-3 py-2 text-xs text-muted-foreground hover:bg-secondary">Clear quick filter</button>}
          </div>}
        </div>
        <div className="relative"><button type="button" aria-label="Open notifications" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen((open) => !open); setFilterOpen(false) }} className="relative flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"><Bell className="size-4" />{!readNotifications && <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />}</button>{notificationsOpen && <div className="premium-pop absolute right-0 top-11 z-50 w-80 max-w-[calc(100vw-1.5rem)] rounded-lg border border-border bg-popover p-3 shadow-xl"><div className="mb-2 flex items-center justify-between"><p className="text-sm font-medium text-foreground">Notifications</p><span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">{readNotifications ? '0 new' : `${notificationItems.length} new`}</span></div>{notificationItems.map((item) => <button key={item.text} type="button" onClick={() => { router.push(item.href); setNotificationsOpen(false) }} className="flex w-full items-start gap-3 rounded-md p-2.5 text-left hover:bg-accent"><span className={cnDot(readNotifications)} /><span className="text-xs text-foreground">{item.text}</span></button>)}<button type="button" onClick={markNotificationsRead} className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-md border border-border py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground"><Check className="size-3.5" /> Mark all as read</button></div>}</div>
        <button type="button" onClick={() => setReportOpen(true)} className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"><Plus className="size-4" /><span className="hidden sm:inline">New report</span></button>
      </header>
      {reportOpen && <div className="premium-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="report-title"><div className="premium-pop w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl"><div className="mb-4 flex items-start justify-between"><div><h2 id="report-title" className="text-base font-semibold text-foreground">Create report</h2><p className="mt-1 text-xs text-muted-foreground">Generate a CSV summary for the current dashboard view.</p></div><button type="button" aria-label="Close" onClick={() => setReportOpen(false)}><X className="size-4 text-muted-foreground" /></button></div><div className="mb-4 flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"><FileText className="size-5 text-primary" /><div><p className="text-sm font-medium text-foreground">{current}</p><p className="text-xs text-muted-foreground">Includes the current headline metrics</p></div></div><Input autoFocus value={reportName} onChange={(e) => setReportName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') createReport() }} placeholder="Report name" className="h-10" /><div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setReportOpen(false)} className="h-9 rounded-md border border-border px-3 text-sm text-foreground hover:bg-secondary">Cancel</button><button type="button" onClick={createReport} className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground">Create report</button></div></div></div>}
      {menuOpen && <div className="premium-backdrop fixed inset-0 z-[90] bg-black/40 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation" onClick={() => setMenuOpen(false)}><nav className="premium-pop h-full w-[min(20rem,86vw)] border-r border-border bg-sidebar p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="mb-5 flex items-center gap-2.5"><div className="flex size-8 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30"><LayoutGrid className="size-4 text-primary" /></div><div><p className="text-sm font-semibold text-sidebar-foreground">Helm</p><p className="text-[11px] text-muted-foreground">Workspace navigation</p></div></div><div className="flex flex-col gap-1">{navItems.map((item) => { const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href); return <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${active ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'}`}><item.icon className={`size-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />{item.label}</Link> })}</div></nav></div>}
      {toast && <button type="button" onClick={() => setToast(null)} className="premium-toast fixed bottom-5 right-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm text-foreground shadow-xl">{toast}</button>}
    </>
  )
}

function cnDot(read: boolean) { return `mt-0.5 size-2 shrink-0 rounded-full ${read ? 'bg-muted-foreground/40' : 'bg-primary'}` }
