import Link from 'next/link'
import { BellRing, CreditCard, Rocket, UsersRound } from 'lucide-react'

const tools = [
  { title: 'Workspace setup', detail: 'Finish onboarding and invite your team', href: '/onboarding', icon: Rocket },
  { title: 'Alerts & automation', detail: 'Turn account signals into action', href: '/alerts', icon: BellRing },
  { title: 'Activity log', detail: 'Review changes across the workspace', href: '/activity', icon: UsersRound },
  { title: 'Plan & billing', detail: 'Review your commercial settings', href: '/billing', icon: CreditCard },
]

export function WorkspaceTools() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <p className="text-xs font-medium text-foreground">Quick access</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Common workspace actions</p>
      </div>
      <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-secondary/45"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors group-hover:text-foreground">
                <Icon className="size-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-medium text-foreground">{tool.title}</span>
                <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">{tool.detail}</span>
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
