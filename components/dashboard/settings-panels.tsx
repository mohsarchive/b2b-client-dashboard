'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

type SettingsState = {
  name: string
  email: string
  role: string
  workspace: string
  domain: string
  avatar: string
  prefs: boolean[]
}

const defaultSettings: SettingsState = {
  name: 'Ava Chen',
  email: 'ava@helm.io',
  role: 'Account Executive',
  workspace: 'Helm',
  domain: 'helm.io',
  avatar: 'AV',
  prefs: [true, true, false, false],
}

const preferences = [
  { label: 'Weekly digest', description: 'A summary of account activity delivered every Monday.' },
  { label: 'Pipeline alerts', description: 'Notify me when a deal moves to the closing stage.' },
  { label: 'At-risk warnings', description: 'Email me when an account health score drops below 50.' },
  { label: 'Product updates', description: 'Occasional news about new Helm features.' },
]

export function SettingsPanels() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('helm.settings')
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<SettingsState>
        setSettings({
          ...defaultSettings,
          ...parsed,
          prefs: Array.isArray(parsed.prefs) ? parsed.prefs.slice(0, preferences.length) : defaultSettings.prefs,
        })
      }
    } catch {
      // Use defaults when stored settings are unavailable or invalid.
    }
  }, [])

  useEffect(() => {
    if (toast) {
      const timer = window.setTimeout(() => setToast(null), 2200)
      return () => window.clearTimeout(timer)
    }
  }, [toast])

  const update = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  const save = (section: string) => {
    try {
      window.localStorage.setItem('helm.settings', JSON.stringify(settings))
    } catch {
      // The current state remains active for this session.
    }
    setToast(`${section} changes saved`)
  }

  const setPreference = (index: number, checked: boolean) => {
    const prefs = settings.prefs.map((value, idx) => idx === index ? checked : value)
    update('prefs', prefs)
    try {
      window.localStorage.setItem('helm.settings', JSON.stringify({ ...settings, prefs }))
    } catch {
      // Session state still updates.
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SettingsCard
        title="Profile"
        description="This information is visible to your teammates."
        footer={<button type="button" onClick={() => save('Profile')} className="flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">Save changes</button>}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-2 text-base font-semibold text-primary-foreground">{settings.avatar}</span>
            <button
              type="button"
              onClick={() => {
                const next = window.prompt('Enter up to 2 initials for your avatar', settings.avatar)
                if (!next?.trim()) return
                const avatar = next.trim().replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()
                if (avatar) {
                  update('avatar', avatar)
                  setToast('Avatar updated')
                }
              }}
              className="flex h-8 items-center rounded-md border border-border px-3 text-xs font-medium text-foreground hover:bg-secondary"
            >Change avatar</button>
          </div>
          <Field id="name" label="Full name" value={settings.name} onChange={(value) => update('name', value)} />
          <Field id="email" label="Email" value={settings.email} onChange={(value) => update('email', value)} type="email" />
          <Field id="role" label="Role" value={settings.role} onChange={(value) => update('role', value)} />
        </div>
      </SettingsCard>

      <div className="flex flex-col gap-6">
        <SettingsCard
          title="Workspace"
          description="Settings applied across the Helm workspace."
          footer={<button type="button" onClick={() => save('Workspace')} className="flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">Save changes</button>}
        >
          <div className="flex flex-col gap-4">
            <Field id="workspace" label="Workspace name" value={settings.workspace} onChange={(value) => update('workspace', value)} />
            <Field id="domain" label="Primary domain" value={settings.domain} onChange={(value) => update('domain', value)} />
            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
              <div><p className="text-sm font-medium text-foreground">Plan</p><p className="text-xs text-muted-foreground">Enterprise · renews Sep 1, 2026</p></div>
              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/30">Active</span>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title="Notifications" description="Choose what Helm emails you about">
          <ul className="flex flex-col divide-y divide-border">
            {preferences.map((pref, i) => (
              <li key={pref.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0"><p className="text-sm font-medium text-foreground">{pref.label}</p><p className="text-xs text-muted-foreground text-pretty">{pref.description}</p></div>
                <Switch checked={settings.prefs[i] ?? false} onCheckedChange={(checked) => setPreference(i, checked)} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">Notification preferences are saved in this browser.</p>
        </SettingsCard>
      </div>

      {toast && <button type="button" onClick={() => setToast(null)} className="fixed bottom-5 right-5 z-[110] rounded-lg border border-border bg-popover px-4 py-3 text-sm text-foreground shadow-xl">{toast}</button>}
    </div>
  )
}

function SettingsCard({ title, description, children, footer }: { title: string; description: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return <section className="rounded-xl border border-border bg-card"><div className="border-b border-border px-5 py-4"><h2 className="text-sm font-semibold text-foreground">{title}</h2><p className="mt-0.5 text-xs text-muted-foreground text-pretty">{description}</p></div><div className="px-5 py-5">{children}</div>{footer && <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">{footer}</div>}</section>
}

function Field({ id, label, value, onChange, type = 'text' }: { id: string; label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <div className="flex flex-col gap-1.5"><Label htmlFor={id} className="text-xs text-muted-foreground">{label}</Label><Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="h-9 border-border bg-secondary/50" /></div>
}
