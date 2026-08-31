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
    <header className="pb-7 sm:pb-9">
      <div className="flex items-end justify-between gap-8">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>Helm</span>
            <span className="text-muted-foreground/40">/</span>
            <span>{title}</span>
            {live && <span className="text-foreground">· Live</span>}
          </div>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.045em] text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.05]">{title}</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">{description}</p>
        </div>
        {live && (
          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Workspace status</p>
            <p className="mt-1 text-sm font-medium text-foreground">Operational</p>
          </div>
        )}
      </div>
    </header>
  )
}
