'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { loginService } from '@/features/auth'
import { toast, toastMessageHandler } from '@/shared'

export function useTwoFactorMutation(email: string, password: string) {
	const router = useRouter()

	const { mutate: verify, isPending: isLoadingVerify } = useMutation({
		mutationKey: ['2fa'],
		mutationFn: (code: string) =>
			loginService.login({ email, password, code }),
		onSuccess() {
			toast.add({ type: 'success', title: 'Добро пожаловать' })
			router.push('/')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { verify, isLoadingVerify }
}
