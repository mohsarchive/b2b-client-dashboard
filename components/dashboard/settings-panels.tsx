'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

function SettingsCard({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground text-pretty">
          {description}
        </p>
      </div>
      <div className="px-5 py-5">{children}</div>
      {footer && (
        <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">
          {footer}
        </div>
      )}
    </section>
  )
}

function SaveButton() {
  return (
    <button
      type="button"
      suppressHydrationWarning
      className="flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
    >
      Save changes
    </button>
  )
}

const preferences = [
  {
    label: 'Weekly digest',
    description: 'A summary of account activity delivered every Monday.',
    on: true,
  },
  {
    label: 'Pipeline alerts',
    description: 'Notify me when a deal moves to the closing stage.',
    on: true,
  },
  {
    label: 'At-risk warnings',
    description: 'Email me when an account health score drops below 50.',
    on: false,
  },
  {
    label: 'Product updates',
    description: 'Occasional news about new Helm features.',
    on: false,
  },
]

export function SettingsPanels() {
  const [prefs, setPrefs] = useState(preferences.map((p) => p.on))

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SettingsCard
        title="Profile"
        description="This information is visible to your teammates."
        footer={<SaveButton />}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-2 text-base font-semibold text-primary-foreground">
              AV
            </span>
            <button
              type="button"
              suppressHydrationWarning
              className="flex h-8 items-center rounded-md border border-border px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Change avatar
            </button>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" className="text-xs text-muted-foreground">
              Full name
            </Label>
            <Input
              id="name"
              defaultValue="Ava Chen"
              className="h-9 border-border bg-secondary/50"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-xs text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="ava@helm.io"
              className="h-9 border-border bg-secondary/50"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="role" className="text-xs text-muted-foreground">
              Role
            </Label>
            <Input
              id="role"
              defaultValue="Account Executive"
              className="h-9 border-border bg-secondary/50"
            />
          </div>
        </div>
      </SettingsCard>

      <div className="flex flex-col gap-6">
        <SettingsCard
          title="Workspace"
          description="Settings applied across the Helm workspace."
          footer={<SaveButton />}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="workspace"
                className="text-xs text-muted-foreground"
              >
                Workspace name
              </Label>
              <Input
                id="workspace"
                defaultValue="Helm"
                className="h-9 border-border bg-secondary/50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="domain"
                className="text-xs text-muted-foreground"
              >
                Primary domain
              </Label>
              <Input
                id="domain"
                defaultValue="helm.io"
                className="h-9 border-border bg-secondary/50"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-foreground">Plan</p>
                <p className="text-xs text-muted-foreground">
                  Enterprise · renews Sep 1, 2026
                </p>
              </div>
              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/30">
                Active
              </span>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Notifications"
          description="Choose what Helm emails you about."
        >
          <ul className="flex flex-col divide-y divide-border">
            {preferences.map((pref, i) => (
              <li
                key={pref.label}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {pref.label}
                  </p>
                  <p className="text-xs text-muted-foreground text-pretty">
                    {pref.description}
                  </p>
                </div>
                <Switch
                  checked={prefs[i]}
                  onCheckedChange={(v) =>
                    setPrefs((prev) =>
                      prev.map((p, idx) => (idx === i ? v : p)),
                    )
                  }
                />
              </li>
            ))}
          </ul>
        </SettingsCard>
      </div>
    </div>
  )
}
