import { Suspense, type ReactElement } from 'react'

import { EmailVerifyPage } from '@/features/auth'
import { Spinner } from '@/shared'

export default function VerifyPage(): ReactElement {
	return (
		<div className='flex h-svh flex-col items-center bg-background p-6 md:p-10'>
			<Suspense
				fallback={
					<div className='h-full w-full flex flex-col justify-center items-center gap-4'>
						<Spinner className='size-12' />
					</div>
				}
			>
				<EmailVerifyPage />
			</Suspense>
		</div>
	)
}
