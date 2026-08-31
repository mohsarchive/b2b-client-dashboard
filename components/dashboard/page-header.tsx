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
    <header className="pb-8 sm:pb-10">
      <div className="max-w-4xl">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
          <span>Helm</span>
          <span className="text-muted-foreground/30">/</span>
          <span>{title}</span>
          {live && <span className="ml-1 text-foreground">Live</span>}
        </div>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl lg:text-[56px] lg:leading-[1.04]">{title}</h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted-foreground">{description}</p>
      </div>
    </header>
  )
}
