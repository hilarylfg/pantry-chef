'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { type ReactElement, useEffect } from 'react'

import { AUTH_MESSAGES, useVerificationMutation } from '@/features/auth'
import { HOME_PATH, Spinner, toast } from '@/shared'

export function EmailVerifyPage(): ReactElement {
	const router = useRouter()
	const searchParams = useSearchParams()
	const token = searchParams?.get('token')

	const { verification } = useVerificationMutation()

	useEffect(() => {
		if (!token) {
			toast.add({
				type: 'error',
				title: AUTH_MESSAGES.brokenLink
			})
			router.push(HOME_PATH)
			return
		}

		verification(token)
	}, [router, token, verification])

	return (
		<div className='h-full flex flex-col justify-center items-center gap-4'>
			<h1 className='text-xl'>Подтверждение почты...</h1>
			<Spinner className='size-12' />
		</div>
	)
}
