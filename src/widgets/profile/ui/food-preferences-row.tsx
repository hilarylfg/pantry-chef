import { Feather } from 'lucide-react'

import { SettingsRow } from '@/shared'

export function FoodPreferencesRow() {
	return (
		<SettingsRow
			icon={<Feather />}
			rightElement={<p className='text-muted-foreground'>Без орехов</p>}
		>
			Предпочтения в еде
		</SettingsRow>
	)
}
