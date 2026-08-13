import { type ReactElement, type ReactNode } from 'react'

import { AuthFooter, AuthHeader, AuthInner } from '@/widgets/auth'

export function AuthShell({ children }: { children: ReactNode }): ReactElement {
	return (
		<div className='flex flex-col w-full h-full'>
			<AuthHeader />
			<div className='flex flex-col my-auto'>
				<AuthInner />
				{children}
				<AuthFooter />
			</div>
		</div>
	)
}
