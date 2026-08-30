export function PageHeader({
  title,
  description,
  live,
}: {
  title: string
  description: string
  live?: boolean
}) {
  return (
    <header className="premium-enter relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/[0.08] via-card/90 to-card px-5 py-5 sm:px-6 sm:py-6">
      <div className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <div className="mb-2.5 flex items-center gap-2.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/80">Executive workspace</span>
            {live && (
              <span className="flex items-center gap-1.5 rounded-full border border-chart-3/20 bg-chart-3/10 px-2 py-0.5 text-[10px] font-medium text-chart-3">
                <span className="size-1.5 animate-pulse rounded-full bg-chart-3" />
                Live
              </span>
            )}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground text-pretty">
            {description}
          </p>
        </div>
        {live && (
          <div className="hidden shrink-0 rounded-lg border border-border bg-background/50 px-3 py-2 text-right sm:block">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Data status</p>
            <p className="mt-0.5 text-xs font-medium text-foreground">Synchronized</p>
          </div>
        )}
      </div>
    </header>
  )
}
