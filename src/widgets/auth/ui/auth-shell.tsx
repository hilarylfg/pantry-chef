import { type ReactElement, type ReactNode } from 'react'

import { AuthFooter, AuthHeader, AuthInner } from '@/widgets/auth'

export function AuthShell({ children }: { children: ReactNode }): ReactElement {
	return (
		<div className='flex h-full w-full flex-col'>
			<AuthHeader />
			<div className='my-auto flex flex-col'>
				<AuthInner />
				{children}
				<AuthFooter />
			</div>
		</div>
	)
}
