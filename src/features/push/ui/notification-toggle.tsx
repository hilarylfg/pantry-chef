import { Bell } from 'lucide-react'

import { SettingsRow, Switch } from '@/shared'

import { usePushManager } from '../model/use-push-manager'

export function NotificationToggle() {
	const { subscription, subscribeToPush, unsubscribeFromPush } =
		usePushManager()

	return (
		<SettingsRow
			icon={<Bell />}
			rightElement={
				<Switch
					checked={Boolean(subscription)}
					onCheckedChange={checked =>
						checked ? subscribeToPush() : unsubscribeFromPush()
					}
				/>
			}
		>
			Уведомления
		</SettingsRow>
	)
}
