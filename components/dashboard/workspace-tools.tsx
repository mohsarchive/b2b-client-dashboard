import Link from 'next/link'

const tools = [
  { title: 'Onboarding', detail: 'Workspace setup', href: '/onboarding' },
  { title: 'Alerts', detail: 'Rules and triggers', href: '/alerts' },
  { title: 'Activity', detail: 'Recent changes', href: '/activity' },
  { title: 'Billing', detail: 'Plan and usage', href: '/billing' },
]

export function WorkspaceTools() {
  return (
    <nav aria-label="Workspace shortcuts" className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-4">
      {tools.map((tool, index) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="group flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <span className="tabular-nums text-muted-foreground/50">0{index + 1}</span>
          <span>{tool.title}</span>
          <span className="hidden text-muted-foreground/50 sm:inline">{tool.detail}</span>
        </Link>
      ))}
    </nav>
  )
}
