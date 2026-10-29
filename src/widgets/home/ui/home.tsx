import { type ReactElement } from 'react'

import { type IUser } from '@/entities/user'

import { ExpiringBanner } from './expiring-banner'
import { Greeting } from './greeting'
import { QuickActions } from './quick-actions'
import { Recommendations } from './recommendations'

interface Props {
	user: IUser | undefined
}

export function Home({ user }: Props): ReactElement {
	return (
		<>
			{user && <Greeting user={user} />}
			<ExpiringBanner />
			<QuickActions />
			<Recommendations />
		</>
	)
}
