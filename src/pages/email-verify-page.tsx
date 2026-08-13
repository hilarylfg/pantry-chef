'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useVerificationMutation } from '@/features/auth'
import { Spinner, toast } from '@/shared'

export function EmailVerifyPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const token = searchParams?.get('token')

	const { verification } = useVerificationMutation()

	useEffect(() => {
		if (!token) {
			toast.add({
				type: 'error',
				title: 'Ссылка повреждена, проверьте ссылку'
			})
			router.push('/')
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
