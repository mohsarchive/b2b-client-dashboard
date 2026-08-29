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
    <header className="flex flex-col gap-1">
      <div className="flex items-center gap-2.5">
        <h1 className="text-xl font-semibold tracking-tight text-foreground text-balance">
          {title}
        </h1>
        {live && (
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-chart-3" />
            Live
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground text-pretty">{description}</p>
    </header>
  )
}
