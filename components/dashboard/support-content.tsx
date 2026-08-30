'use client'

import { useEffect, useState } from 'react'
import { BookOpen, MessageSquare, Mail, Video, ArrowUpRight, X, Play, CheckCircle2 } from 'lucide-react'

type Resource = { icon: typeof BookOpen; title: string; description: string; href?: string }
type Ticket = { id: string; subject: string; message?: string; status: string; priority: string; updated: string }

const resources: Resource[] = [
  { icon: BookOpen, title: 'Documentation', description: 'Project guides and implementation reference.', href: 'https://github.com/mohsarchive/b2b-client-dashboard#readme' },
  { icon: Video, title: 'Video tutorials', description: 'Walk through the dashboard and its workflows.' },
  { icon: MessageSquare, title: 'Community', description: 'Open discussions, bugs, and feature ideas.', href: 'https://github.com/mohsarchive/b2b-client-dashboard/issues' },
  { icon: Mail, title: 'Email support', description: 'Reach the support team at support@helm.io.', href: 'mailto:support@helm.io' },
]
const defaultTickets: Ticket[] = [
  { id: 'HELP-4821', subject: 'CSV export missing custom fields', status: 'Open', priority: 'High', updated: '2h ago' },
  { id: 'HELP-4790', subject: 'SSO login redirect loop for new members', status: 'In progress', priority: 'Medium', updated: '1d ago' },
  { id: 'HELP-4755', subject: 'Request: bulk reassign account owners', status: 'Resolved', priority: 'Low', updated: '4d ago' },
]
const statusStyles: Record<string, string> = { Open: 'bg-primary/10 text-primary ring-primary/20', 'In progress': 'bg-secondary text-foreground ring-border', Resolved: 'bg-secondary text-muted-foreground ring-border' }
const priorityStyles: Record<string, string> = { High: 'text-foreground', Medium: 'text-muted-foreground', Low: 'text-muted-foreground' }

export function SupportContent() {
  const [modal, setModal] = useState<'support' | 'request' | 'resource' | null>(null)
  const [resource, setResource] = useState<Resource | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>(defaultTickets)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => { try { const saved = window.localStorage.getItem('helm.support.tickets'); if (saved) setTickets(JSON.parse(saved) as Ticket[]) } catch {} }, [])
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(null), 2400); return () => window.clearTimeout(timer) }, [toast])
  useEffect(() => { if (!modal) return; const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(null) }; document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey) }, [modal])

  const openResource = (item: Resource) => {
    setResource(item)
    if (item.href) {
      window.open(item.href, item.href.startsWith('mailto:') ? '_self' : '_blank', 'noopener,noreferrer')
      setToast(`${item.title} opened`)
      return
    }
    setModal('resource')
  }

  const submitRequest = () => {
    const cleanSubject = subject.trim()
    if (!cleanSubject) return
    const ticket: Ticket = { id: `HELP-${Math.floor(5000 + Math.random() * 900)}`, subject: cleanSubject, message: message.trim(), status: 'Open', priority: 'Medium', updated: 'just now' }
    const next = [ticket, ...tickets]
    setTickets(next)
    try { window.localStorage.setItem('helm.support.tickets', JSON.stringify(next)) } catch {}
    setSubject(''); setMessage(''); setModal(null); setToast(`${ticket.id} submitted`)
  }

  return <div className="flex flex-col gap-6">
    <section className="premium-enter flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center"><div><h2 className="text-base font-semibold text-foreground">Need a hand?</h2><p className="mt-1 max-w-md text-sm text-muted-foreground">Get guidance on workflows, reporting, filters, and workspace operations.</p></div><button type="button" onClick={() => setModal('support')} className="flex h-10 shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"><MessageSquare className="size-4" />Contact support</button></section>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{resources.map((r, index) => <button key={r.title} type="button" onClick={() => openResource(r)} className="premium-enter group flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 text-left hover:border-border hover:bg-secondary/40" style={{ animationDelay: `${index * 45}ms` }}><span className="flex size-9 items-center justify-center rounded-md bg-secondary text-foreground"><r.icon className="size-4" /></span><div><p className="flex items-center gap-1 text-sm font-medium text-foreground">{r.title}<ArrowUpRight className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></p><p className="mt-1 text-xs text-muted-foreground">{r.description}</p></div></button>)}</div>
    <section className="premium-enter rounded-xl border border-border bg-card"><div className="flex items-center justify-between border-b border-border px-5 py-4"><div><h2 className="text-sm font-semibold text-foreground">Your requests</h2><p className="mt-0.5 text-xs text-muted-foreground">Recent tickets from your workspace.</p></div><button type="button" onClick={() => setModal('request')} className="flex h-8 items-center rounded-md border border-border px-3 text-xs font-medium text-foreground hover:bg-secondary">New request</button></div><ul className="divide-y divide-border">{tickets.map((t) => <li key={t.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/40"><button type="button" onClick={() => { setSubject(t.subject); setMessage(t.message ?? ''); setModal('request') }} className="min-w-0 flex-1 text-left"><p className="truncate text-sm font-medium text-foreground">{t.subject}</p><p className="mt-0.5 font-mono text-xs text-muted-foreground">{t.id}</p></button><span className={`hidden text-xs font-medium sm:inline ${priorityStyles[t.priority]}`}>{t.priority}</span><span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusStyles[t.status] ?? statusStyles.Open}`}>{t.status}</span><span className="hidden w-16 text-right text-xs text-muted-foreground md:inline">{t.updated}</span></li>)}</ul></section>
    {modal && <div className="premium-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(null) }}><div className="premium-pop w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl"><div className="flex items-start justify-between"><div><h3 className="text-base font-semibold text-foreground">{modal === 'support' ? 'Contact support' : modal === 'request' ? 'Support request' : resource?.title}</h3><p className="mt-1 text-xs text-muted-foreground">{modal === 'resource' ? resource?.description : 'Requests are stored in this browser for this demo workspace.'}</p></div><button type="button" onClick={() => setModal(null)} aria-label="Close"><X className="size-5 text-muted-foreground" /></button></div>{modal === 'resource' ? <><div className="my-5 space-y-3"><div className="rounded-lg border border-border bg-secondary/30 p-4"><div className="flex items-center gap-2"><Play className="size-4" /><p className="text-sm font-medium">2-minute prototype walkthrough</p></div><p className="mt-1 text-xs text-muted-foreground">Use the sidebar to move from Overview to Accounts, then open an account workspace. From Filters, save a custom view and use Reports to export a client-ready snapshot.</p></div><div className="grid gap-2 text-xs text-muted-foreground"><span className="inline-flex items-center gap-2"><CheckCircle2 className="size-3.5" />Review the Overview action center</span><span className="inline-flex items-center gap-2"><CheckCircle2 className="size-3.5" />Create and apply a custom account filter</span><span className="inline-flex items-center gap-2"><CheckCircle2 className="size-3.5" />Open an account workspace and export a report</span></div></div><button type="button" onClick={() => setModal(null)} className="h-9 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground">Done</button></> : <><input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="mt-5 h-10 w-full rounded-md border border-input bg-input/30 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50" /><textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe the issue…" rows={5} className="mt-3 w-full rounded-md border border-input bg-input/30 p-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50" /><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => setModal(null)} className="h-9 rounded-md border border-border text-sm text-foreground hover:bg-secondary">Cancel</button><button type="button" disabled={!subject.trim()} onClick={submitRequest} className="h-9 rounded-md bg-primary text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">Submit request</button></div></>}</div></div>}
    {toast && <div role="status" className="premium-toast fixed bottom-5 right-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm text-foreground shadow-xl">{toast}</div>}
  </div>
}
