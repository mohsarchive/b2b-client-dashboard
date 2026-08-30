'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BellRing, CheckCircle2, FileText, MessageSquareText, Plus, ShieldAlert } from 'lucide-react'
import { useParams } from 'next/navigation'
import { accounts } from '@/lib/data'
import { PageHeader } from '@/components/dashboard/page-header'

export default function AccountWorkspacePage() {
  const params = useParams<{ id: string }>()
  const account = accounts.find((item) => item.id === params.id) ?? accounts[0]
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const isRisk = account.status === 'At risk' || account.health < 60

  const scoreLabel = useMemo(() => account.health >= 80 ? 'Healthy' : account.health >= 60 ? 'Watch' : 'Needs attention', [account.health])

  const addNote = () => { const clean = note.trim(); if (!clean) return; setNotes((n) => [clean, ...n]); setNote('') }

  return <div className="space-y-6"><Link href="/accounts" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5" />Back to accounts</Link><PageHeader title={account.company} description={`${account.industry} · ${account.plan} · ${account.owner}`} />
    {isRisk && <section className="flex items-start gap-3 rounded-xl border border-chart-5/30 bg-chart-5/5 p-4"><ShieldAlert className="mt-0.5 size-5 text-chart-5" /><div><p className="text-sm font-semibold">Account needs attention</p><p className="mt-1 text-xs text-muted-foreground">Health is {account.health}/100. Review recent activity, contact the owner, and create a follow-up task.</p></div></section>}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Kpi label="Health" value={`${account.health}/100`} meta={scoreLabel} /><Kpi label="MRR" value={account.mrr} meta="Recurring revenue" /><Kpi label="Seats" value={String(account.seats)} meta="Licensed seats" /><Kpi label="Status" value={account.status} meta={`Owner: ${account.owner}`} /></div>
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><section className="rounded-2xl border border-border bg-card"><div className="border-b border-border px-5 py-4"><h2 className="text-sm font-medium">Customer activity</h2><p className="text-xs text-muted-foreground">Signals that help your team decide what to do next.</p></div><div className="divide-y divide-border">{[['Health score', `Current score ${account.health}/100`, 'Today', BellRing], ['Data sync', 'Customer dataset synchronized', '2h ago', CheckCircle2], ['Report', 'Monthly report available', 'Yesterday', FileText], ['Customer conversation', 'Success review completed', '2d ago', MessageSquareText]].map(([title, detail, time, Icon]) => { const I = Icon as typeof CheckCircle2; return <div className="flex items-center gap-3 px-5 py-4" key={title as string}><span className="flex size-9 items-center justify-center rounded-lg bg-secondary"><I className="size-4 text-muted-foreground" /></span><div className="min-w-0 flex-1"><p className="text-sm font-medium">{title as string}</p><p className="text-xs text-muted-foreground">{detail as string}</p></div><span className="text-xs text-muted-foreground">{time as string}</span></div> })}</div></section>
      <section className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center gap-2"><MessageSquareText className="size-4 text-primary" /><div><h2 className="text-sm font-medium">Team notes</h2><p className="text-xs text-muted-foreground">Capture context for the next customer touchpoint.</p></div></div><textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add an internal note…" className="mt-4 min-h-24 w-full rounded-lg border border-input bg-input/20 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/40" /><button type="button" onClick={addNote} className="mt-2 flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground"><Plus className="size-3.5" />Add note</button><div className="mt-4 space-y-2">{notes.map((n, i) => <div key={`${n}-${i}`} className="rounded-lg border border-border bg-secondary/30 p-3 text-xs text-muted-foreground">{n}</div>)}</div></section>
    </div>
    {message && <div className="fixed bottom-5 right-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm shadow-xl">{message}</div>}
  </div>
}

function Kpi({ label, value, meta }: { label: string; value: string; meta: string }) { return <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-[11px] text-muted-foreground">{meta}</p></div> }
