'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Database, FileText, Settings, Users } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'

const steps = [
  { id: 'company', title: 'Complete company profile', detail: 'Confirm your workspace name and preferences.', href: '/settings', icon: Settings },
  { id: 'team', title: 'Invite your team', detail: 'Add customer-success, sales, and operations teammates.', href: '/settings', icon: Users },
  { id: 'data', title: 'Connect your first dataset', detail: 'Provision a database and make customer data available.', href: '/databases', icon: Database },
  { id: 'report', title: 'Create your first client report', detail: 'Turn the current intelligence view into a shareable report.', href: '/', icon: FileText },
]

export default function OnboardingPage() {
  const [done, setDone] = useState<Record<string, boolean>>({})
  useEffect(() => { try { setDone(JSON.parse(localStorage.getItem('helm.onboarding') || '{}')) } catch {} }, [])
  const toggle = (id: string) => setDone((current) => { const next = { ...current, [id]: !current[id] }; try { localStorage.setItem('helm.onboarding', JSON.stringify(next)) } catch {}; return next })
  const completed = Object.values(done).filter(Boolean).length
  return (
    <div className="space-y-6">
      <PageHeader title="Workspace setup" description="Turn the dashboard into a working operating system for your client team." />
      <section className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
        <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Setup progress</p><p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{completed}/{steps.length}</p></div><span className="text-xs text-muted-foreground">{Math.round((completed / steps.length) * 100)}% complete</span></div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${(completed / steps.length) * 100}%` }} /></div>
      </section>
      <div className="grid gap-3 md:grid-cols-2">
        {steps.map((step) => { const Icon = step.icon; return <div key={step.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-start gap-4"><button type="button" aria-label={`Mark ${step.title} ${done[step.id] ? 'incomplete' : 'complete'}`} onClick={() => toggle(step.id)} className={`flex size-9 shrink-0 items-center justify-center rounded-full border ${done[step.id] ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-secondary text-muted-foreground'}`}><Check className="size-4" /></button><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><Icon className="size-4 text-muted-foreground" /><h2 className="text-sm font-semibold text-foreground">{step.title}</h2></div><p className="mt-1 text-xs text-muted-foreground">{step.detail}</p><Link href={step.href} className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">Open<ArrowRight className="size-3.5" /></Link></div></div></div> })}
      </div>
    </div>
  )
}
