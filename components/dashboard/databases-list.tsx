'use client'

import { useEffect, useState } from 'react'
import { Database, MoreHorizontal, Plus, X, Copy, Eye } from 'lucide-react'
import { databases, type DbInstance } from '@/lib/data'
import { cn } from '@/lib/utils'

const statusStyles: Record<DbInstance['status'], string> = {
  Healthy: 'bg-chart-3/10 text-chart-3',
  Degraded: 'bg-chart-5/10 text-chart-5',
  Provisioning: 'bg-chart-4/10 text-chart-4',
}
const statusDot: Record<DbInstance['status'], string> = {
  Healthy: 'bg-chart-3',
  Degraded: 'bg-chart-5',
  Provisioning: 'animate-pulse bg-chart-4',
}

function loadColor(pct: number) {
  if (pct >= 85) return 'bg-chart-5'
  if (pct >= 60) return 'bg-chart-4'
  return 'bg-chart-3'
}

export function DatabasesList() {
  const [instances, setInstances] = useState<DbInstance[]>(databases)
  const [selected, setSelected] = useState<DbInstance | null>(null)
  const [menuId, setMenuId] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [name, setName] = useState('')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('helm.databases')
      if (saved) setInstances(JSON.parse(saved) as DbInstance[])
    } catch {
      // Keep the bundled demo data when storage is unavailable or invalid.
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem('helm.databases', JSON.stringify(instances))
    } catch {
      // Local state remains usable even when storage is unavailable.
    }
  }, [instances])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const copyName = async (db: DbInstance) => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(db.name)
      else {
        const area = document.createElement('textarea')
        area.value = db.name
        document.body.appendChild(area)
        area.select()
        document.execCommand('copy')
        area.remove()
      }
      setToast(`Copied ${db.name}`)
    } catch {
      setToast('Could not copy database name')
    }
    setMenuId(null)
  }

  const createInstance = () => {
    const cleanName = name.trim()
    if (!cleanName) {
      setToast('Enter an instance name first')
      return
    }

    const created: DbInstance = {
      id: `db-new-${Date.now()}`,
      name: cleanName,
      engine: 'PostgreSQL',
      version: '16.2',
      region: 'us-east-1',
      size: '0 GB',
      connections: 0,
      maxConnections: 200,
      status: 'Provisioning',
    }
    setInstances((current) => [created, ...current])
    setName('')
    setShowNew(false)
    setSelected(created)
    setToast(`${cleanName} created and queued for provisioning`)
  }

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Database className="size-4 text-muted-foreground" />
          <div>
            <h2 className="text-sm font-medium text-foreground">Database instances</h2>
            <p className="text-xs text-muted-foreground">
              {instances.length} instances · {instances.filter((d) => d.status === 'Healthy').length} healthy
            </p>
          </div>
        </div>
        <button type="button" onClick={() => setShowNew(true)} className="flex h-8 items-center gap-1.5 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground hover:opacity-90">
          <Plus className="size-3.5" />
          New instance
        </button>
      </div>

      <ul className="divide-y divide-border">
        {instances.map((db) => {
          const pct = Math.round((db.connections / db.maxConnections) * 100)
          return (
            <li key={db.id} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/40">
              <button type="button" onClick={() => setSelected(db)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-[10px] font-semibold text-foreground ring-1 ring-border">{db.engine.slice(0, 2).toUpperCase()}</span>
                <span className="min-w-0">
                  <span className="block truncate font-mono text-sm font-medium text-foreground">{db.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{db.engine} {db.version} · {db.region} · {db.size}</span>
                </span>
              </button>

              <div className="hidden w-40 shrink-0 flex-col gap-1 sm:flex">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground"><span>Connections</span><span>{db.connections}/{db.maxConnections}</span></div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"><div className={cn('h-full rounded-full', loadColor(pct))} style={{ width: `${pct}%` }} /></div>
              </div>

              <span className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium', statusStyles[db.status])}>
                <span className={cn('size-1.5 rounded-full', statusDot[db.status])} />
                {db.status}
              </span>

              <div className="relative">
                <button type="button" aria-label={`Actions for ${db.name}`} aria-expanded={menuId === db.id} onClick={() => setMenuId((current) => current === db.id ? null : db.id)} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground">
                  <MoreHorizontal className="size-4" />
                </button>
                {menuId === db.id && (
                  <div className="absolute right-0 top-8 z-40 w-36 rounded-lg border border-border bg-popover p-1 shadow-xl">
                    <button type="button" onClick={() => { setSelected(db); setMenuId(null) }} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs hover:bg-accent"><Eye className="size-3.5" />View details</button>
                    <button type="button" onClick={() => copyName(db)} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs hover:bg-accent"><Copy className="size-3.5" />Copy name</button>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Engine', `${selected.engine} ${selected.version}`],
              ['Region', selected.region],
              ['Size', selected.size],
              ['Connections', `${selected.connections}/${selected.maxConnections}`],
              ['Status', selected.status],
              ['ID', selected.id],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border bg-secondary/30 p-3">
                <p className="text-[11px] text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {showNew && (
        <Modal title="Create database instance" onClose={() => setShowNew(false)}>
          <p className="text-xs text-muted-foreground">Create a workspace instance. New instances are saved in this browser and start in Provisioning status.</p>
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') createInstance() }} placeholder="Instance name" className="mt-4 h-10 w-full rounded-md border border-input bg-input/30 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50" />
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={() => { setShowNew(false); setName('') }} className="h-9 rounded-md border border-border px-3 text-sm hover:bg-secondary">Cancel</button>
            <button type="button" onClick={createInstance} disabled={!name.trim()} className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">Create</button>
          </div>
        </Modal>
      )}

      {toast && <button type="button" onClick={() => setToast(null)} className="fixed bottom-5 right-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm text-foreground shadow-xl">{toast}</button>}
    </section>
  )
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card p-5 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <button type="button" onClick={onClose} aria-label="Close"><X className="size-5 text-muted-foreground" /></button>
        </div>
        {children}
      </div>
    </div>
  )
}
