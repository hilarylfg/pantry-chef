import { ArrowLeftIcon } from 'lucide-react'
import { type ReactElement } from 'react'

import { Button, LogoMono } from '@/shared'

export function AuthHeader(): ReactElement {
	return (
		<div className='flex items-center justify-between'>
			<Button size='icon-lg'>
				<ArrowLeftIcon />
			</Button>
			<div className='flex items-center gap-2'>
				<LogoMono className='w-8' />
				<span className='font-extrabold'>PantryChef</span>
			</div>
		</div>
	)
}
