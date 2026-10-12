import { LogoutRow } from '@/features/auth'
import { NotificationToggle } from '@/features/push'
import { ThemeToggle } from '@/features/theme-switcher'

import { AccountRow } from './account-row'
import { FoodPreferencesRow } from './food-preferences-row'

export function SettingsList() {
	return (
		<div className='flex flex-col'>
			<NotificationToggle />
			<ThemeToggle />
			<FoodPreferencesRow />
			<AccountRow />
			<LogoutRow />
		</div>
	)
}
