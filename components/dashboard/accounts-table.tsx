'use client'

import { useMemo, useState } from 'react'
import { MoreHorizontal, Filter, X, Eye, Copy, UserRound } from 'lucide-react'
import { accounts, type Account } from '@/lib/data'
import { cn } from '@/lib/utils'

const statusStyles: Record<Account['status'], string> = {
  Active: 'bg-chart-3/10 text-chart-3',
  Onboarding: 'bg-chart-4/10 text-chart-4',
  'At risk': 'bg-chart-5/10 text-chart-5',
}

function healthColor(h: number) {
  if (h >= 80) return 'bg-chart-3'
  if (h >= 60) return 'bg-chart-4'
  return 'bg-chart-5'
}

export function AccountsTable() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [status, setStatus] = useState<'All' | Account['status']>('All')
  const [selected, setSelected] = useState<Account | null>(null)
  const [menuId, setMenuId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const visibleAccounts = useMemo(() => {
    if (status === 'All') return accounts
    return accounts.filter((account) => account.status === status)
  }, [status])

  const copyAccountId = async (id: string) => {
    try { await navigator.clipboard.writeText(id); setToast(`Copied ${id}`) }
    catch { setToast('Could not copy account ID') }
    setMenuId(null)
  }

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <h2 className="text-sm font-medium text-foreground">All accounts</h2>
          <p className="text-xs text-muted-foreground">{visibleAccounts.length} accounts · {accounts.filter((a) => a.status === 'At risk').length} at risk</p>
        </div>
        <div className="relative">
          <button type="button" aria-expanded={filterOpen} onClick={() => setFilterOpen(!filterOpen)} className={cn('flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-medium transition-colors hover:bg-secondary', status !== 'All' ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}>
            <Filter className="size-3.5" /> Filter{status !== 'All' ? `: ${status}` : ''}
          </button>
          {filterOpen && <div className="absolute right-0 top-10 z-40 w-44 rounded-lg border border-border bg-popover p-1.5 shadow-xl">
            {(['All', 'Active', 'Onboarding', 'At risk'] as const).map((option) => <button key={option} type="button" onClick={() => { setStatus(option); setFilterOpen(false) }} className={cn('flex w-full items-center rounded-md px-2.5 py-2 text-left text-xs hover:bg-accent', status === option && 'bg-accent text-primary')}>{option}</button>)}
          </div>}
        </div>
      </div>

      <div className="hidden grid-cols-[1.6fr_0.9fr_0.7fr_0.8fr_1fr_0.8fr_auto] gap-4 border-b border-border px-5 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 md:grid">
        <span>Account</span><span>Owner</span><span className="text-right">Seats</span><span className="text-right">MRR</span><span>Health</span><span>Status</span><span className="sr-only">Actions</span>
      </div>

      <ul className="divide-y divide-border">
        {visibleAccounts.map((a) => (
          <li key={a.id} className="grid grid-cols-2 items-center gap-4 px-5 py-3 transition-colors hover:bg-secondary/40 md:grid-cols-[1.6fr_0.9fr_0.7fr_0.8fr_1fr_0.8fr_auto]">
            <button type="button" onClick={() => setSelected(a)} className="flex min-w-0 items-center gap-3 text-left">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-foreground ring-1 ring-border">{a.initials}</span>
              <span className="min-w-0"><span className="block truncate text-sm font-medium text-foreground">{a.company}</span><span className="block truncate text-xs text-muted-foreground">{a.industry}</span></span>
            </button>
            <span className="hidden truncate text-sm text-muted-foreground md:block">{a.owner}</span>
            <span className="hidden text-right text-sm tabular-nums text-foreground md:block">{a.seats}</span>
            <span className="text-right text-sm tabular-nums text-foreground">{a.mrr}</span>
            <div className="hidden items-center gap-2 md:flex"><div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary"><div className={cn('h-full rounded-full', healthColor(a.health))} style={{ width: `${a.health}%` }} /></div><span className="text-xs tabular-nums text-muted-foreground">{a.health}</span></div>
            <div className="flex items-center justify-end md:justify-start"><span className={cn('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium', statusStyles[a.status])}><span className={cn('size-1.5 rounded-full', healthColor(a.health))} />{a.status}</span></div>
            <div className="relative hidden md:block">
              <button type="button" aria-label={`Actions for ${a.company}`} aria-expanded={menuId === a.id} onClick={() => setMenuId(menuId === a.id ? null : a.id)} className="flex size-7 items-center justify-center justify-self-end rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"><MoreHorizontal className="size-4" /></button>
              {menuId === a.id && <div className="absolute right-0 top-8 z-40 w-40 rounded-lg border border-border bg-popover p-1 shadow-xl"><button type="button" onClick={() => { setSelected(a); setMenuId(null) }} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs hover:bg-accent"><Eye className="size-3.5" /> View account</button><button type="button" onClick={() => copyAccountId(a.id)} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs hover:bg-accent"><Copy className="size-3.5" /> Copy ID</button><button type="button" onClick={() => { setToast(`Owner: ${a.owner}`); setMenuId(null) }} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs hover:bg-accent"><UserRound className="size-3.5" /> View owner</button></div>}
            </div>
          </li>
        ))}
      </ul>

      {selected && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true"><div className="w-full max-w-lg rounded-xl border border-border bg-card p-5 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs text-muted-foreground">Account {selected.id}</p><h3 className="mt-1 text-lg font-semibold text-foreground">{selected.company}</h3><p className="text-sm text-muted-foreground">{selected.industry} · {selected.plan}</p></div><button type="button" aria-label="Close account" onClick={() => setSelected(null)}><X className="size-5 text-muted-foreground" /></button></div><div className="mt-5 grid grid-cols-2 gap-3"><Info label="Owner" value={selected.owner} /><Info label="MRR" value={selected.mrr} /><Info label="Seats" value={String(selected.seats)} /><Info label="Health" value={`${selected.health}/100`} /><Info label="Status" value={selected.status} /><Info label="Account ID" value={selected.id} /></div><button type="button" onClick={() => setSelected(null)} className="mt-5 h-9 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground">Done</button></div></div>}
      {toast && <button type="button" onClick={() => setToast(null)} className="fixed bottom-5 right-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm text-foreground shadow-xl">{toast}</button>}
    </section>
  )
}

function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-lg border border-border bg-secondary/30 p-3"><p className="text-[11px] text-muted-foreground">{label}</p><p className="mt-1 text-sm font-medium text-foreground">{value}</p></div> }
