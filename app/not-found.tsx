import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 py-16 text-foreground">
      <div className="w-full max-w-md text-center">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">404</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          That workspace view does not exist. Return to the overview to continue.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="size-3.5" />
          Back to overview
        </Link>
      </div>
    </main>
  )
}
