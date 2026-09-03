import { useTheme } from '@teispace/next-themes'
import { Moon } from 'lucide-react'

import { SettingsRow, Switch } from '@/shared'

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()

	return (
		<SettingsRow
			icon={<Moon />}
			rightElement={
				<Switch
					onCheckedChange={() =>
						setTheme(theme === 'dark' ? 'light' : 'dark')
					}
				/>
			}
		>
			Темная тема
		</SettingsRow>
	)
}
