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
    <header className="border-b border-border pb-5 sm:pb-6">
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
            <span>Helm</span>
            <span className="text-muted-foreground/40">/</span>
            <span>{title}</span>
            {live && <span className="border-l border-border pl-2 text-foreground">Live</span>}
          </div>
          <h1 className="text-[26px] font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">{title}</h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        {live && (
          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Status</p>
            <p className="mt-1 text-xs font-medium text-foreground">Operational</p>
          </div>
        )}
      </div>
    </header>
  )
}
