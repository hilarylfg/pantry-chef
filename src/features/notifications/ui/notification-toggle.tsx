import { Bell } from 'lucide-react'

import { SettingsRow, Switch } from '@/shared'

export function NotificationToggle() {
	return (
		<SettingsRow icon={<Bell />} rightElement={<Switch />}>
			Уведомления
		</SettingsRow>
	)
}
