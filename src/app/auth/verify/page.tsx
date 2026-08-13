import type { ReactElement } from 'react'

import { EmailVerifyPage } from '@/features/auth'

export default function VerifyPage(): ReactElement {
	return (
		<div className='flex h-svh flex-col items-center bg-background p-6 md:p-10'>
			<EmailVerifyPage />
		</div>
	)
}
