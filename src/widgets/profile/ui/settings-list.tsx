import { AccountRow } from '@/features/account'
import { LogoutRow } from '@/features/auth'
import { FoodPreferencesRow } from '@/features/food-preferences'
import { NotificationToggle } from '@/features/notifications'
import { ThemeToggle } from '@/features/theme-switcher'

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
