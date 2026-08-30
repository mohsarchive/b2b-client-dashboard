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
    <header className="premium-enter relative overflow-hidden rounded-2xl border border-border bg-card px-5 py-5 shadow-sm sm:px-6 sm:py-6">
      <div className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-foreground/[0.04] blur-3xl" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <div className="mb-2.5 flex items-center gap-2.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Executive workspace</span>
            {live && (
              <span className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                <span className="size-1.5 animate-pulse rounded-full bg-foreground" />
                Live
              </span>
            )}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground text-pretty">{description}</p>
        </div>
        {live && (
          <div className="hidden shrink-0 rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-right sm:block">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Data status</p>
            <p className="mt-0.5 text-xs font-semibold text-foreground">Synchronized</p>
          </div>
        )}
      </div>
    </header>
  )
}
