import { ArrowLeftIcon } from 'lucide-react'
import { type ReactElement } from 'react'

import { Button } from '@/shared'

export function AuthHeader(): ReactElement {
	return (
		<div className='flex items-center justify-between'>
			<Button size='icon-lg'>
				<ArrowLeftIcon />
			</Button>
			<div className='flex items-center gap-2'>
				<img src='/logo/logo.svg' alt='Logo' />
				<span className='font-extrabold'>PantryChef</span>
			</div>
		</div>
	)
}
