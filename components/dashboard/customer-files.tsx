'use client'

import { useState } from 'react'
import { MoreHorizontal, Download, Database, X, Eye, Copy } from 'lucide-react'
import { customerFiles, type CustomerFile } from '@/lib/data'
import { cn } from '@/lib/utils'

const statusStyles: Record<CustomerFile['status'], string> = { Synced: 'bg-chart-3/10 text-chart-3', Syncing: 'bg-chart-4/10 text-chart-4', Stale: 'bg-muted text-muted-foreground' }
const planStyles: Record<CustomerFile['plan'], string> = { Enterprise: 'bg-primary/12 text-primary ring-primary/25', Scale: 'bg-chart-2/12 text-chart-2 ring-chart-2/25', Growth: 'bg-chart-3/12 text-chart-3 ring-chart-3/25', Starter: 'bg-muted text-muted-foreground ring-border' }

export function CustomerFiles() {
  const [selected, setSelected] = useState<CustomerFile | null>(null)
  const [menuId, setMenuId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const exportFiles = () => {
    const csv = ['id,company,plan,records,size,region,status,updated', ...customerFiles.map((f) => [f.id, f.company, f.plan, f.records, f.size, f.region, f.status, f.updated].join(','))].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a'); a.href = url; a.download = 'customer-files.csv'; a.click(); URL.revokeObjectURL(url)
    setToast('Customer files exported')
  }

  const copyId = async (id: string) => { try { await navigator.clipboard.writeText(id); setToast(`Copied ${id}`) } catch { setToast('Could not copy ID') }; setMenuId(null) }

  return <section className="overflow-hidden rounded-xl border border-border bg-card">
    <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4"><div className="flex items-center gap-2.5"><Database className="size-4 text-muted-foreground" /><div><h2 className="text-sm font-medium text-foreground">Customer database files</h2><p className="text-xs text-muted-foreground">{customerFiles.length} datasets across 6 regions</p></div></div><button type="button" onClick={exportFiles} className="flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"><Download className="size-3.5" />Export</button></div>
    <div className="grid grid-cols-[1.6fr_0.8fr_0.9fr_0.7fr_0.8fr_auto] gap-4 border-b border-border px-5 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70"><span>Account</span><span>Plan</span><span className="text-right">Records</span><span className="text-right">Size</span><span>Status</span><span className="sr-only">Actions</span></div>
    <ul className="divide-y divide-border">{customerFiles.map((f) => <li key={f.id} className="grid grid-cols-[1.6fr_0.8fr_0.9fr_0.7fr_0.8fr_auto] items-center gap-4 px-5 py-3 hover:bg-secondary/40"><button type="button" onClick={() => setSelected(f)} className="flex min-w-0 items-center gap-3 text-left"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-foreground ring-1 ring-border">{f.initials}</span><span className="min-w-0"><span className="block truncate text-sm font-medium text-foreground">{f.company}</span><span className="block truncate font-mono text-xs text-muted-foreground">{f.id} · {f.region}</span></span></button><span className={cn('inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', planStyles[f.plan])}>{f.plan}</span><span className="text-right text-sm tabular-nums text-foreground">{f.records}</span><span className="text-right text-sm tabular-nums text-muted-foreground">{f.size}</span><span className={cn('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium', statusStyles[f.status])}><span className={cn('size-1.5 rounded-full', f.status === 'Synced' ? 'bg-chart-3' : f.status === 'Syncing' ? 'animate-pulse bg-chart-4' : 'bg-muted-foreground')} />{f.status}</span><div className="relative flex items-center gap-3 justify-self-end"><span className="hidden text-xs text-muted-foreground xl:inline">{f.updated}</span><button type="button" aria-label={`Actions for ${f.company}`} onClick={() => setMenuId(menuId === f.id ? null : f.id)} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"><MoreHorizontal className="size-4" /></button>{menuId === f.id && <div className="absolute right-0 top-8 z-40 w-36 rounded-lg border border-border bg-popover p-1 shadow-xl"><button type="button" onClick={() => { setSelected(f); setMenuId(null) }} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs hover:bg-accent"><Eye className="size-3.5" />View file</button><button type="button" onClick={() => copyId(f.id)} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs hover:bg-accent"><Copy className="size-3.5" />Copy ID</button></div>}</div></li>)}</ul>
    {selected && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-lg rounded-xl border border-border bg-card p-5 shadow-2xl"><div className="flex justify-between"><div><p className="font-mono text-xs text-muted-foreground">{selected.id}</p><h3 className="mt-1 text-lg font-semibold text-foreground">{selected.company}</h3></div><button type="button" onClick={() => setSelected(null)} aria-label="Close"><X className="size-5 text-muted-foreground" /></button></div><div className="mt-5 grid grid-cols-2 gap-3">{[['Plan', selected.plan], ['Records', selected.records], ['Size', selected.size], ['Region', selected.region], ['Status', selected.status], ['Updated', selected.updated]].map(([label, value]) => <div key={label} className="rounded-lg border border-border bg-secondary/30 p-3"><p className="text-[11px] text-muted-foreground">{label}</p><p className="mt-1 text-sm font-medium text-foreground">{value}</p></div>)}</div><button type="button" onClick={() => setSelected(null)} className="mt-5 h-9 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground">Done</button></div></div>}
    {toast && <button type="button" onClick={() => setToast(null)} className="fixed bottom-5 right-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm text-foreground shadow-xl">{toast}</button>}
  </section>
}
