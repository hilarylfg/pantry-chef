'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { verificationService } from '@/features/auth'
import { toast } from '@/shared'

export function useVerificationMutation() {
	const router = useRouter()

	const { mutate: verification } = useMutation({
		mutationKey: ['new verification'],
		mutationFn: (token: string | null) =>
			verificationService.newVerification(token),
		onSuccess() {
			toast.add({
				type: 'success',
				title: 'Почта успешно подтверждена'
			})
			router.push('/')
		},
		onError() {
			toast.add({
				type: 'error',
				title: 'Не удалось подтвердить почту, попробуйте еще раз авторизироваться'
			})
		}
	})

	return { verification }
}
