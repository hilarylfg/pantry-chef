'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { type ReactElement, useEffect } from 'react'

import { HOME_PATH, Spinner, toast } from '@/shared'

import { AUTH_MESSAGES } from '../../model/auth-messages'
import { useVerification } from '../model/use-verification'

export function EmailVerifyPage(): ReactElement {
	const router = useRouter()
	const searchParams = useSearchParams()
	const token = searchParams?.get('token')

	const { verify } = useVerification()

	useEffect(() => {
		if (!token) {
			toast.add({
				type: 'error',
				title: AUTH_MESSAGES.brokenLink
			})
			router.push(HOME_PATH)
			return
		}

		verify(token, {
			onSuccess: () => {
				toast.add({
					type: 'success',
					title: AUTH_MESSAGES.emailVerified
				})
				router.push(HOME_PATH)
			}
		})
	}, [router, token, verify])

	return (
		<div className='flex h-full flex-col items-center justify-center gap-4'>
			<h1 className='text-xl'>Подтверждение почты...</h1>
			<Spinner className='size-12' />
		</div>
	)
}
