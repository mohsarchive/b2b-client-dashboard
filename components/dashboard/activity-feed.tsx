'use client'

import { Activity, ArrowRight, CheckCircle2, FileDown, MessageSquareText, Settings2, UserRound } from 'lucide-react'
import Link from 'next/link'

const activity = [
  { icon: CheckCircle2, label: 'Lumen Robotics sync completed', meta: 'Client files · 8 min ago', href: '/client-files' },
  { icon: UserRound, label: 'Verdant Health flagged at risk', meta: 'Accounts · 34 min ago', href: '/accounts?status=At%20risk' },
  { icon: FileDown, label: 'Monthly performance report exported', meta: 'Analytics · 1 hr ago', href: '/analytics' },
  { icon: MessageSquareText, label: 'Support request updated', meta: 'Support · 2 hrs ago', href: '/support' },
  { icon: Settings2, label: 'Workspace preferences saved', meta: 'Settings · 3 hrs ago', href: '/settings' },
]

export function ActivityFeed() {
  return (
    <section className="rounded-2xl border border-border bg-card/80 shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2"><Activity className="size-4 text-muted-foreground" /><h2 className="text-sm font-semibold text-foreground">Recent activity</h2></div>
        <Link href="/activity" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">View all<ArrowRight className="size-3.5" /></Link>
      </div>
      <div className="divide-y divide-border">
        {activity.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.label} href={item.href} className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/40">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground"><Icon className="size-3.5" /></span>
              <span className="min-w-0 flex-1"><span className="block truncate text-sm text-foreground">{item.label}</span><span className="block text-xs text-muted-foreground">{item.meta}</span></span>
              <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
