import { PageHeader } from '@/components/dashboard/page-header'
import { SettingsPanels } from '@/components/dashboard/settings-panels'

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Manage your profile, workspace, and notification preferences."
      />
      <SettingsPanels />
    </div>
  )
}
