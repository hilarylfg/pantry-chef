'use client'

import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type ReactElement } from 'react'

import { Button, LogoMono } from '@/shared'

export function AuthHeader(): ReactElement {
	const router = useRouter()

	return (
		<div className='flex items-center justify-between'>
			<Button
				size='icon-lg'
				aria-label='Назад'
				onClick={() => router.back()}
			>
				<ArrowLeftIcon />
			</Button>
			<div className='flex items-center gap-2'>
				<LogoMono className='w-8' />
				<span className='font-extrabold'>PantryChef</span>
			</div>
		</div>
	)
}
