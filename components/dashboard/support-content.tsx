import {
  BookOpen,
  MessageSquare,
  Mail,
  Video,
  ArrowUpRight,
} from 'lucide-react'

const resources = [
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Guides, API references, and integration walkthroughs.',
  },
  {
    icon: Video,
    title: 'Video tutorials',
    description: 'Short walkthroughs of every workspace feature.',
  },
  {
    icon: MessageSquare,
    title: 'Community',
    description: 'Ask questions and share workflows with other teams.',
  },
  {
    icon: Mail,
    title: 'Email support',
    description: 'Reach our team directly at support@helm.io.',
  },
]

const tickets = [
  {
    id: 'HELP-4821',
    subject: 'CSV export missing custom fields',
    status: 'Open',
    priority: 'High',
    updated: '2h ago',
  },
  {
    id: 'HELP-4790',
    subject: 'SSO login redirect loop for new members',
    status: 'In progress',
    priority: 'Medium',
    updated: '1d ago',
  },
  {
    id: 'HELP-4755',
    subject: 'Request: bulk reassign account owners',
    status: 'Resolved',
    priority: 'Low',
    updated: '4d ago',
  },
]

const statusStyles: Record<string, string> = {
  Open: 'bg-primary/15 text-primary ring-primary/30',
  'In progress': 'bg-chart-4/15 text-chart-4 ring-chart-4/30',
  Resolved: 'bg-chart-3/15 text-chart-3 ring-chart-3/30',
}

const priorityStyles: Record<string, string> = {
  High: 'text-destructive',
  Medium: 'text-chart-4',
  Low: 'text-muted-foreground',
}

export function SupportContent() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Need a hand?
          </h2>
          <p className="mt-1 max-w-md text-sm text-muted-foreground text-pretty">
            Enterprise plans include priority support with a 2-hour first
            response during business hours.
          </p>
        </div>
        <button
          type="button"
          suppressHydrationWarning
          className="flex h-10 shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <MessageSquare className="size-4" />
          Contact support
        </button>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((r) => (
          <button
            type="button"
            suppressHydrationWarning
            key={r.title}
            className="group flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40 hover:bg-secondary/40"
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/25">
              <r.icon className="size-4" />
            </span>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-foreground">
                {r.title}
                <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
              <p className="mt-1 text-xs text-muted-foreground text-pretty">
                {r.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <section className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Your requests
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Recent tickets from your workspace.
            </p>
          </div>
          <button
            type="button"
            suppressHydrationWarning
            className="flex h-8 items-center rounded-md border border-border px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            New request
          </button>
        </div>
        <ul className="divide-y divide-border">
          {tickets.map((t) => (
            <li
              key={t.id}
              className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-secondary/40"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {t.subject}
                </p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {t.id}
                </p>
              </div>
              <span
                className={`hidden text-xs font-medium sm:inline ${priorityStyles[t.priority]}`}
              >
                {t.priority}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusStyles[t.status]}`}
              >
                {t.status}
              </span>
              <span className="hidden w-16 text-right text-xs text-muted-foreground md:inline">
                {t.updated}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
