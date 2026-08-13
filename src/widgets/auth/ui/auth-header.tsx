import { ArrowLeftIcon } from 'lucide-react'

import { Button } from '@/shared'

export function AuthHeader() {
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
