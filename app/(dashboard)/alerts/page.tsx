'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BellRing, Check, Plus, Trash2, Zap, X } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'

type Rule = { id: string; name: string; event: string; enabled: boolean }
const starterRules: Rule[] = [
  { id: 'health-low', name: 'At-risk account alert', event: 'Account health falls below 60', enabled: true },
  { id: 'db-degraded', name: 'Database degradation alert', event: 'Database status becomes Degraded', enabled: true },
  { id: 'stale-files', name: 'Stale data reminder', event: 'Customer file is stale for 24 hours', enabled: false },
]

export default function AlertsPage() {
  const [rules, setRules] = useState<Rule[]>(starterRules)
  const [showNew, setShowNew] = useState(false)
  const [name, setName] = useState('')
  const [event, setEvent] = useState('Account health falls below 70')
  const [toast, setToast] = useState('')
  useEffect(() => { try { const saved = localStorage.getItem('helm.alert.rules'); if (saved) setRules(JSON.parse(saved)) } catch {} }, [])
  useEffect(() => { if (!showNew) return; const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowNew(false) }; document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey) }, [showNew])
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(''), 2200); return () => window.clearTimeout(timer) }, [toast])
  const save = (next: Rule[]) => { setRules(next); try { localStorage.setItem('helm.alert.rules', JSON.stringify(next)) } catch {} }
  const add = () => {
    const cleanName = name.trim(); const cleanEvent = event.trim()
    if (!cleanName || !cleanEvent) return
    if (rules.some((rule) => rule.name.toLowerCase() === cleanName.toLowerCase())) { setToast('A rule with that name already exists'); return }
    save([{ id: `rule-${Date.now()}`, name: cleanName, event: cleanEvent, enabled: true }, ...rules])
    setName(''); setEvent('Account health falls below 70'); setShowNew(false); setToast('Rule created')
  }
  return <div className="space-y-6">
    <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5" />Back to overview</Link>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><PageHeader title="Alerts & automation" description="Turn important changes into proactive notifications for your team." /><button type="button" onClick={() => setShowNew(true)} className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground"><Plus className="size-3.5" />New rule</button></div>
    <section className="grid gap-3 md:grid-cols-2">
      {rules.map((rule) => <div key={rule.id} className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm"><div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground"><BellRing className="size-4" /></span><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><h2 className="text-sm font-semibold text-foreground">{rule.name}</h2><button type="button" aria-label={`${rule.enabled ? 'Disable' : 'Enable'} ${rule.name}`} onClick={() => { save(rules.map((r) => r.id === rule.id ? { ...r, enabled: !r.enabled } : r)); setToast(rule.enabled ? 'Rule paused' : 'Rule enabled') }} className={`flex size-7 items-center justify-center rounded-full border ${rule.enabled ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-secondary text-muted-foreground'}`}><Check className="size-3.5" /></button></div><p className="mt-1 text-xs text-muted-foreground">When {rule.event.toLowerCase()}.</p><div className="mt-3 flex items-center justify-between"><span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground"><Zap className="size-3" />{rule.enabled ? 'Active' : 'Paused'}</span><button type="button" onClick={() => { save(rules.filter((r) => r.id !== rule.id)); setToast('Rule deleted') }} className="text-muted-foreground hover:text-destructive" aria-label={`Delete ${rule.name}`}><Trash2 className="size-3.5" /></button></div></div></div></div>)}
    </section>
    {showNew && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowNew(false) }}><div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl"><div className="flex items-start justify-between"><div><h2 className="text-base font-semibold text-foreground">Create automation rule</h2><p className="mt-1 text-xs text-muted-foreground">Define a signal your team should act on.</p></div><button type="button" onClick={() => setShowNew(false)} aria-label="Close"><X className="size-4 text-muted-foreground" /></button></div><input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Rule name" className="mt-4 h-10 w-full rounded-md border border-input bg-input/30 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50" /><input value={event} onChange={(e) => setEvent(e.target.value)} placeholder="Trigger condition" className="mt-3 h-10 w-full rounded-md border border-input bg-input/30 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50" /><div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setShowNew(false)} className="h-9 rounded-md border border-border px-3 text-sm">Cancel</button><button type="button" onClick={add} disabled={!name.trim() || !event.trim()} className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground disabled:opacity-50">Create rule</button></div></div></div>}
    {toast && <div role="status" className="fixed bottom-5 right-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm text-foreground shadow-xl">{toast}</div>}
  </div>
}
