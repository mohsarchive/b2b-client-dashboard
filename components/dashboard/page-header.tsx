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
    <header className="premium-enter border-b border-border pb-5 sm:pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Workspace</span>
            {live && (
              <span className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-foreground" />
                Live
              </span>
            )}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        {live && (
          <div className="hidden border-l border-border pl-4 text-right sm:block">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</p>
            <p className="mt-0.5 text-xs font-medium text-foreground">Synced</p>
          </div>
        )}
      </div>
    </header>
  )
}
