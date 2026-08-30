import Link from 'next/link'
import { ArrowLeft, CheckCircle2, FileDown, MessageSquareText, Settings2, UserRound } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'

const events = [
  ['Account health changed', 'Verdant Health dropped from 61 to 48', '34 min ago', UserRound],
  ['Sync completed', 'Lumen Robotics customer dataset finished syncing', '48 min ago', CheckCircle2],
  ['Report exported', 'Monthly performance report was downloaded', '1 hr ago', FileDown],
  ['Support activity', 'A support request was updated', '2 hrs ago', MessageSquareText],
  ['Settings updated', 'Workspace preferences were saved', '3 hrs ago', Settings2],
]

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5" />Back to overview</Link>
      <PageHeader title="Activity" description="A clear audit trail of the changes and actions happening across the workspace." />
      <section className="overflow-hidden rounded-2xl border border-border bg-card/80">
        {events.map(([title, detail, time, Icon]) => {
          const EventIcon = Icon as typeof UserRound
          return <div key={title as string} className="flex items-start gap-4 border-b border-border px-5 py-4 last:border-b-0"><span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground"><EventIcon className="size-4" /></span><div className="min-w-0 flex-1"><p className="text-sm font-medium text-foreground">{title}</p><p className="mt-0.5 text-xs text-muted-foreground">{detail}</p></div><time className="shrink-0 text-xs text-muted-foreground">{time}</time></div>
        })}
      </section>
    </div>
  )
}
