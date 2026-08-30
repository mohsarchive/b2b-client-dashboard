'use client'

import { useEffect, useState } from 'react'
import { CalendarRange, Download, FileText, Play, Plus, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'
import { metrics } from '@/lib/data'

type Report = { id: string; name: string; cadence: 'Manual' | 'Weekly' | 'Monthly'; scope: string }

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [name, setName] = useState('')
  const [cadence, setCadence] = useState<Report['cadence']>('Manual')
  const [scope, setScope] = useState('Executive overview')

  useEffect(() => { try { const saved = localStorage.getItem('helm.reports'); if (saved) setReports(JSON.parse(saved)) } catch {} }, [])
  useEffect(() => { try { localStorage.setItem('helm.reports', JSON.stringify(reports)) } catch {} }, [reports])

  const add = () => {
    const clean = name.trim()
    if (!clean) return
    setReports((r) => [{ id: `r-${Date.now()}`, name: clean, cadence, scope }, ...r])
    setName('')
  }

  const download = (reportName: string) => {
    const csv = [['Metric', 'Value', 'Change'], ...metrics.map((m) => [m.label, m.value, `${m.delta}%`])].map((r) => r.join(',')).join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = `${reportName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`; a.click()
  }

  return <div className="space-y-6"><PageHeader title="Reports" description="Build reusable client-ready reports, export them on demand, and define a delivery cadence." />
    <section className="rounded-2xl border border-border bg-card p-5"><div className="mb-4 flex items-center gap-2"><FileText className="size-4 text-primary" /><div><h2 className="text-sm font-medium">Create a report</h2><p className="text-xs text-muted-foreground">Saved reports remain available in this workspace.</p></div></div><div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]"><input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') add() }} placeholder="e.g. Monthly executive review" className="h-10 rounded-md border border-input bg-input/30 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" /><select value={scope} onChange={(e) => setScope(e.target.value)} className="h-10 rounded-md border border-input bg-input/30 px-3 text-sm outline-none"><option>Executive overview</option><option>Revenue & retention</option><option>Customer health</option><option>Operations</option></select><select value={cadence} onChange={(e) => setCadence(e.target.value as Report['cadence'])} className="h-10 rounded-md border border-input bg-input/30 px-3 text-sm outline-none"><option>Manual</option><option>Weekly</option><option>Monthly</option></select><button type="button" onClick={add} className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"><Plus className="mr-1 inline size-4" />Create</button></div></section>
    <section className="overflow-hidden rounded-2xl border border-border bg-card"><div className="border-b border-border px-5 py-4"><h2 className="text-sm font-medium">Saved reports</h2></div>{reports.length ? <div className="divide-y divide-border">{reports.map((r) => <div key={r.id} className="flex flex-wrap items-center gap-3 px-5 py-4"><span className="flex size-9 items-center justify-center rounded-lg bg-secondary"><CalendarRange className="size-4 text-muted-foreground" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.scope} · {r.cadence} delivery</p></div><button type="button" onClick={() => download(r.name)} className="flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs hover:bg-secondary"><Download className="size-3.5" />Export</button><button type="button" onClick={() => setReports((all) => all.filter((x) => x.id !== r.id))} className="flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs text-muted-foreground hover:bg-secondary"><Trash2 className="size-3.5" />Delete</button></div>)}</div> : <div className="px-5 py-10 text-center"><p className="text-sm font-medium">No saved reports yet</p><p className="mt-1 text-xs text-muted-foreground">Create one above to make recurring client reporting easier.</p></div>}</section>
    <div className="flex items-center gap-2 text-xs text-muted-foreground"><Play className="size-3.5 text-primary" />Report schedules are workspace-local in this demo; connect a server scheduler for real email delivery.</div>
  </div>
}
