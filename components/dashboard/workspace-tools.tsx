import Link from 'next/link'
import { BellRing, CreditCard, Rocket, UsersRound } from 'lucide-react'

const tools = [
  { title: 'Workspace setup', detail: 'Finish onboarding and invite your team', href: '/onboarding', icon: Rocket },
  { title: 'Alerts & automation', detail: 'Turn signals into proactive actions', href: '/alerts', icon: BellRing },
  { title: 'Activity log', detail: 'See who changed what and when', href: '/activity', icon: UsersRound },
  { title: 'Plan & billing', detail: 'Review commercial settings', href: '/billing', icon: CreditCard },
]

export function WorkspaceTools() {
  return <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{tools.map((tool) => { const Icon = tool.icon; return <Link key={tool.href} href={tool.href} className="group rounded-2xl border border-border bg-card/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-card hover:shadow-sm"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground group-hover:text-foreground"><Icon className="size-4" /></span><div className="min-w-0"><p className="truncate text-sm font-medium text-foreground">{tool.title}</p><p className="truncate text-xs text-muted-foreground">{tool.detail}</p></div></div></Link> })}</section>
}
