'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Bell, Plus, SlidersHorizontal, X, Check, FileText } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { accounts, customerFiles, databases, metrics, pipelineStages } from '@/lib/data'

const titles: Record<string, string> = {
  '/': 'Overview',
  '/analytics': 'Analytics',
  '/accounts': 'Accounts',
  '/pipelines': 'Pipelines',
  '/databases': 'Databases',
  '/client-files': 'Client files',
  '/settings': 'Settings',
  '/support': 'Support',
}

const destinations = [
  ...Object.entries(titles).map(([href, label]) => ({ href, label, kind: 'Page' })),
  ...accounts.map((a) => ({ href: '/accounts', label: a.company, kind: 'Account' })),
  ...customerFiles.map((f) => ({ href: '/client-files', label: f.company, kind: 'File' })),
  ...databases.map((d) => ({ href: '/databases', label: d.name, kind: 'Database' })),
  ...pipelineStages.flatMap((s) => s.deals.map((d) => ({ href: '/pipelines', label: d.company, kind: 'Deal' }))),
]

const notificationItems = [
  'Verdant Health is at risk',
  'Atlas Freight report is ready',
  'Lumen Robotics sync completed',
]

export function Topbar() {
  const pathname = usePathname()
  const router = useRouter()
  const current = titles[pathname] ?? 'Overview'
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportName, setReportName] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [onlyRisk, setOnlyRisk] = useState(false)
  const [readNotifications, setReadNotifications] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      setReadNotifications(window.localStorage.getItem('helm.notifications.read') === '1')
    } catch {
      // localStorage may be unavailable in privacy-restricted browsers.
    }
  }, [])

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

  const submitSearch = (value: string) => {
    const clean = value.trim()
    if (!clean) return
    const match = destinations.find((item) => item.label.toLowerCase() === clean.toLowerCase())
    router.push(match ? match.href : `/accounts?search=${encodeURIComponent(clean)}`)
    setSearchOpen(false)
  }

  const markNotificationsRead = () => {
    setReadNotifications(true)
    try {
      window.localStorage.setItem('helm.notifications.read', '1')
    } catch {
      // Ignore storage failures; the UI state still updates for this session.
    }
    setNotificationsOpen(false)
    setToast('All notifications marked as read')
  }

  const createReport = () => {
    const name = reportName.trim() || `${current} report`
    const rows = [
      ['Metric', 'Value', 'Change'],
      ...metrics.map((metric) => [metric.label, metric.value, `${metric.delta}%`]),
    ]
    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
      .join('\n')
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
    setToast('Report created and downloaded')
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-5 backdrop-blur-xl">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Workspace</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="font-medium text-foreground">{current}</span>
        </div>
      </div>

      <div ref={searchRef} className="relative ml-auto hidden max-w-xs flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSearchOpen(true) }}
          onFocus={() => setSearchOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submitSearch(query)
            if (e.key === 'Escape') setSearchOpen(false)
          }}
          placeholder="Search accounts, files…"
          aria-label="Search accounts and files"
          className="h-9 border-border bg-secondary/50 pl-9 pr-8 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
        />
        {query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"><X className="size-3.5" /></button>}
        {searchOpen && query.trim() && (
          <div className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-xl">
            {results.length ? results.map((result) => (
              <button key={`${result.kind}-${result.label}`} type="button" onClick={() => { submitSearch(result.label) }} className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left hover:bg-accent">
                <Search className="size-3.5 text-muted-foreground" />
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">{result.label}</span>
                <span className="text-[10px] text-muted-foreground">{result.kind}</span>
              </button>
            )) : <p className="px-2.5 py-2 text-xs text-muted-foreground">Press Enter to search accounts.</p>}
          </div>
        )}
      </div>

      <div className="relative">
        <button type="button" aria-label="Open filters" aria-expanded={filterOpen} onClick={() => { setFilterOpen((open) => !open); setNotificationsOpen(false) }} className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <SlidersHorizontal className="size-4" />
        </button>
        {filterOpen && (
          <div className="absolute right-0 top-11 z-50 w-64 rounded-lg border border-border bg-popover p-3 shadow-xl">
            <div className="mb-3 flex items-center justify-between"><p className="text-sm font-medium text-foreground">Quick filters</p><button type="button" onClick={() => setFilterOpen(false)} aria-label="Close filters"><X className="size-4 text-muted-foreground" /></button></div>
            <label className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-accent">
              <input type="checkbox" checked={onlyRisk} onChange={(e) => setOnlyRisk(e.target.checked)} className="size-4 accent-[var(--primary)]" />
              <span className="text-sm text-foreground">At-risk accounts only</span>
            </label>
            {onlyRisk && <button type="button" onClick={() => { router.push('/accounts?status=At%20risk'); setFilterOpen(false) }} className="mt-2 w-full rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">View filtered accounts</button>}
            {onlyRisk && <button type="button" onClick={() => setOnlyRisk(false)} className="mt-2 w-full rounded-md border border-border px-3 py-2 text-xs text-muted-foreground hover:bg-secondary">Clear filter</button>}
          </div>
        )}
      </div>

      <div className="relative">
        <button type="button" aria-label="Open notifications" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen((open) => !open); setFilterOpen(false) }} className="relative flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="size-4" />
          {!readNotifications && <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />}
        </button>
        {notificationsOpen && (
          <div className="absolute right-0 top-11 z-50 w-80 rounded-lg border border-border bg-popover p-3 shadow-xl">
            <div className="mb-2 flex items-center justify-between"><p className="text-sm font-medium text-foreground">Notifications</p><span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">{readNotifications ? '0 new' : `${notificationItems.length} new`}</span></div>
            {notificationItems.map((text) => <button key={text} type="button" onClick={() => setToast(text)} className="flex w-full items-start gap-3 rounded-md p-2.5 text-left hover:bg-accent"><span className={cnDot(readNotifications)} /><span className="text-xs text-foreground">{text}</span></button>)}
            <button type="button" onClick={markNotificationsRead} className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-md border border-border py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground"><Check className="size-3.5" /> Mark all as read</button>
          </div>
        )}
      </div>

      <button type="button" onClick={() => setReportOpen(true)} className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
        <Plus className="size-4" /><span className="hidden sm:inline">New report</span>
      </button>

      {reportOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="report-title">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between"><div><h2 id="report-title" className="text-base font-semibold text-foreground">Create report</h2><p className="mt-1 text-xs text-muted-foreground">Generate a CSV summary for the current dashboard view.</p></div><button type="button" aria-label="Close" onClick={() => setReportOpen(false)}><X className="size-4 text-muted-foreground" /></button></div>
            <div className="mb-4 flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"><FileText className="size-5 text-primary" /><div><p className="text-sm font-medium text-foreground">{current}</p><p className="text-xs text-muted-foreground">Includes the current headline metrics</p></div></div>
            <Input autoFocus value={reportName} onChange={(e) => setReportName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') createReport() }} placeholder="Report name" className="h-10" />
            <div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setReportOpen(false)} className="h-9 rounded-md border border-border px-3 text-sm text-foreground hover:bg-secondary">Cancel</button><button type="button" onClick={createReport} className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground">Create report</button></div>
          </div>
        </div>
      )}

      {toast && <div role="status" className="fixed bottom-5 right-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm text-foreground shadow-xl">{toast}</div>}
    </header>
  )
}

function cnDot(read: boolean) {
  return `mt-0.5 size-2 shrink-0 rounded-full ${read ? 'bg-muted-foreground/40' : 'bg-primary'}`
}
