import Link from 'next/link'
import { ArrowLeft, Check, CreditCard, FileText, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'

const features = ['Unlimited client accounts', 'Advanced saved filters', 'Executive reporting', 'Alerts & automation', 'Audit activity history', 'Priority support']

export default function BillingPage() {
  return <div className="space-y-6">
    <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5" />Back to overview</Link>
    <PageHeader title="Plan & billing" description="Manage the commercial side of your workspace and keep your team aligned on plan usage." />
    <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
      <section className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Current plan</p><h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Enterprise</h2><p className="mt-1 text-sm text-muted-foreground">Built for teams running a high-value customer portfolio.</p></div><span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">Active</span></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{features.map((feature) => <div key={feature} className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 p-3 text-sm text-foreground"><Check className="size-4 text-primary" />{feature}</div>)}</div></section>
      <aside className="space-y-3"><div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm"><div className="flex items-center gap-2"><CreditCard className="size-4 text-muted-foreground" /><h2 className="text-sm font-semibold text-foreground">Payment method</h2></div><p className="mt-3 text-sm text-foreground">Corporate card ending in 4242</p><button type="button" className="mt-4 h-9 w-full rounded-md border border-border text-xs font-medium text-foreground hover:bg-secondary">Update payment method</button></div><div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm"><div className="flex items-center gap-2"><FileText className="size-4 text-muted-foreground" /><h2 className="text-sm font-semibold text-foreground">Invoices</h2></div><p className="mt-1 text-xs text-muted-foreground">Download invoices and receipts for your finance team.</p><button type="button" className="mt-4 h-9 w-full rounded-md border border-border text-xs font-medium text-foreground hover:bg-secondary">View invoices</button></div><div className="rounded-2xl border border-border bg-secondary/40 p-5"><div className="flex items-center gap-2"><ShieldCheck className="size-4 text-chart-3" /><p className="text-xs font-medium text-foreground">Commercial settings are protected</p></div><p className="mt-1 text-[11px] text-muted-foreground">Billing actions should be connected to your payment provider before production use.</p></div></aside>
    </div>
  </div>
}
