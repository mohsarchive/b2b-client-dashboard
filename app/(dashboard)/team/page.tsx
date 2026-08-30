'use client'

import { useEffect, useMemo, useState } from 'react'
import { Mail, Plus, ShieldCheck, X } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'

type Member = { id: string; name: string; email: string; role: 'Admin' | 'Manager' | 'Viewer'; status: 'Active' | 'Invited' }

const seed: Member[] = [
  { id: 'm-1', name: 'Ava Chen', email: 'ava@helm.io', role: 'Admin', status: 'Active' },
  { id: 'm-2', name: 'Marcus Reed', email: 'marcus@helm.io', role: 'Manager', status: 'Active' },
  { id: 'm-3', name: 'Priya Nair', email: 'priya@helm.io', role: 'Viewer', status: 'Active' },
]

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>(seed)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Member['role']>('Viewer')
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => { try { const saved = localStorage.getItem('helm.team'); if (saved) setMembers(JSON.parse(saved)) } catch {} }, [])
  useEffect(() => { try { localStorage.setItem('helm.team', JSON.stringify(members)) } catch {} }, [members])
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(''), 2400); return () => window.clearTimeout(timer) }, [toast])

  const active = useMemo(() => members.filter((m) => m.status === 'Active').length, [members])

  const invite = () => {
    const clean = email.trim().toLowerCase()
    if (!/^\S+@\S+\.\S+$/.test(clean)) { setToast('Enter a valid work email'); return }
    if (members.some((m) => m.email.toLowerCase() === clean)) { setToast('That teammate is already in the workspace'); return }
    setMembers((current) => [...current, { id: `m-${Date.now()}`, name: clean.split('@')[0].replace(/[._-]+/g, ' '), email: clean, role, status: 'Invited' }])
    setEmail(''); setRole('Viewer'); setOpen(false); setToast(`Invite created for ${clean}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Team & access" description="Invite teammates and control who can view, manage, and administer the workspace." />
      <div className="grid gap-4 sm:grid-cols-3"><Kpi label="Team members" value={String(members.length)} /><Kpi label="Active" value={String(active)} /><Kpi label="Pending invites" value={String(members.filter((m) => m.status === 'Invited').length)} /></div>
      <section className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4"><div><h2 className="text-sm font-medium text-foreground">Workspace members</h2><p className="text-xs text-muted-foreground">Role-based access for your customer operations team.</p></div><button type="button" onClick={() => setOpen(true)} className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground"><Plus className="size-3.5" />Invite member</button></div>
        <div className="divide-y divide-border">{members.map((member) => <div key={member.id} className="flex items-center gap-3 px-5 py-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold">{member.name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-foreground">{member.name}</p><p className="truncate text-xs text-muted-foreground">{member.email}</p></div><span className="hidden items-center gap-1 rounded-full border border-border bg-secondary/40 px-2 py-1 text-[11px] text-muted-foreground sm:inline-flex"><ShieldCheck className="size-3" />{member.role}</span><span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] text-primary">{member.status}</span></div>)}</div>
      </section>
      {toast && <button type="button" onClick={() => setToast('')} className="fixed bottom-5 right-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm shadow-xl" aria-label="Dismiss message">{toast}</button>}
      {open && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl"><div className="flex items-start justify-between"><div><h3 className="text-base font-semibold">Invite teammate</h3><p className="mt-1 text-xs text-muted-foreground">Invite access is saved to this demo workspace.</p></div><button type="button" onClick={() => setOpen(false)} aria-label="Close"><X className="size-4" /></button></div><label className="mt-5 block text-xs font-medium text-muted-foreground">Work email<input value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') invite(); if (e.key === 'Escape') setOpen(false) }} autoFocus type="email" placeholder="name@company.com" className="mt-1.5 h-10 w-full rounded-md border border-input bg-input/30 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" /></label><label className="mt-4 block text-xs font-medium text-muted-foreground">Role<select value={role} onChange={(e) => setRole(e.target.value as Member['role'])} className="mt-1.5 h-10 w-full rounded-md border border-input bg-input/30 px-3 text-sm outline-none"><option>Viewer</option><option>Manager</option><option>Admin</option></select></label><div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setOpen(false)} className="h-9 rounded-md border border-border px-3 text-sm">Cancel</button><button type="button" onClick={invite} className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground"><Mail className="mr-1.5 inline size-3.5" />Send invite</button></div></div></div>}
    </div>
  )
}

function Kpi({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</p></div> }
