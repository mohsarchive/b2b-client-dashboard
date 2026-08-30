'use client'

import { useState } from 'react'
import { Plus, X, ArrowRight } from 'lucide-react'
import { pipelineStages, type Deal } from '@/lib/data'

export function PipelineBoard() {
  const [deals, setDeals] = useState(() => pipelineStages.map((stage) => ({ ...stage, deals: [...stage.deals] })))
  const [selected, setSelected] = useState<Deal | null>(null)
  const [stageForNew, setStageForNew] = useState<string | null>(null)
  const [company, setCompany] = useState('')
  const [value, setValue] = useState('')

  const addDeal = () => {
    const stage = deals.find((s) => s.id === stageForNew)
    if (!stage || !company.trim()) return
    const cleanCompany = company.trim()
    const deal: Deal = { id: `d-new-${Date.now()}`, company: cleanCompany, initials: cleanCompany.split(/\s+/).map((x) => x[0]).join('').slice(0, 2).toUpperCase(), value: value.trim() || '$0', owner: 'AV', age: '0d' }
    setDeals((current) => current.map((s) => s.id === stage.id ? { ...s, deals: [...s.deals, deal] } : s))
    setCompany(''); setValue(''); setStageForNew(null)
  }

  return <>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{deals.map((stage) => <section key={stage.id} className="flex flex-col rounded-xl border border-border bg-card/60"><div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3"><div className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ backgroundColor: stage.accent }} /><h2 className="text-sm font-medium text-foreground">{stage.name}</h2><span className="rounded-full bg-secondary px-1.5 text-[11px] tabular-nums text-muted-foreground">{stage.deals.length}</span></div><button type="button" aria-label={`Add deal to ${stage.name}`} onClick={() => setStageForNew(stage.id)} className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"><Plus className="size-3.5" /></button></div><div className="flex flex-1 flex-col gap-2 p-3">{stage.deals.map((deal) => <button key={deal.id} type="button" onClick={() => setSelected(deal)} className="group rounded-lg border border-border bg-card p-3 text-left hover:border-primary/40"><div className="flex items-start justify-between gap-2"><p className="text-sm font-medium text-foreground">{deal.company}</p><span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">{deal.value}</span></div><div className="mt-3 flex items-center justify-between"><span className="flex size-6 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-muted-foreground ring-1 ring-border">{deal.owner}</span><span className="text-xs text-muted-foreground">{deal.age} in stage</span></div></button>)}</div></section>)}</div>
    {selected && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl"><div className="flex justify-between"><div><p className="text-xs text-muted-foreground">Deal</p><h3 className="mt-1 text-lg font-semibold text-foreground">{selected.company}</h3></div><button type="button" onClick={() => setSelected(null)} aria-label="Close"><X className="size-5 text-muted-foreground" /></button></div><div className="mt-5 grid grid-cols-2 gap-3"><Info label="Value" value={selected.value} /><Info label="Owner" value={selected.owner} /><Info label="Age" value={selected.age} /><Info label="ID" value={selected.id} /></div><button type="button" onClick={() => setSelected(null)} className="mt-5 h-9 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground">Done</button></div></div>}
    {stageForNew && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl"><div className="flex items-start justify-between"><div><h3 className="text-base font-semibold text-foreground">Add deal</h3><p className="text-xs text-muted-foreground">Add a deal to {deals.find((s) => s.id === stageForNew)?.name}.</p></div><button type="button" onClick={() => setStageForNew(null)} aria-label="Close"><X className="size-5 text-muted-foreground" /></button></div><input autoFocus value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className="mt-4 h-10 w-full rounded-md border border-input bg-input/30 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50" /><input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Deal value (e.g. $25K)" className="mt-3 h-10 w-full rounded-md border border-input bg-input/30 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50" /><div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setStageForNew(null)} className="h-9 rounded-md border border-border px-3 text-sm hover:bg-secondary">Cancel</button><button type="button" onClick={addDeal} disabled={!company.trim()} className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">Add deal<ArrowRight className="size-3.5" /></button></div></div></div>}
  </>
}
function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-lg border border-border bg-secondary/30 p-3"><p className="text-[11px] text-muted-foreground">{label}</p><p className="mt-1 text-sm font-medium text-foreground">{value}</p></div> }
