import { useTheme } from '@teispace/next-themes'
import { Moon } from 'lucide-react'

import { SettingsRow, Switch } from '@/shared'

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()

	return (
		<SettingsRow
			icon={<Moon />}
			rightElement={
				<Switch
					checked={resolvedTheme === 'dark'}
					onCheckedChange={() =>
						setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
					}
				/>
			}
		>
			Темная тема
		</SettingsRow>
	)
}
