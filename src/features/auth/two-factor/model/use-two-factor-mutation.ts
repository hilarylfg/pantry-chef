'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { type IUser } from '@/entities/user'
import {
	AUTH_MESSAGES,
	AUTH_MUTATION_KEYS,
	loginService
} from '@/features/auth'
import { HOME_PATH, toast, toastMessageHandler } from '@/shared'

export function useTwoFactorMutation(
	email: string,
	password: string
): {
	verify: (code: string) => void
	isLoadingVerify: boolean
} {
	const router = useRouter()

	const { mutate: verify, isPending: isLoadingVerify } = useMutation<
		IUser,
		Error,
		string
	>({
		mutationKey: AUTH_MUTATION_KEYS.twoFactor,
		mutationFn: (code: string) =>
			loginService.login({ email, password, code }),
		onSuccess() {
			toast.add({ type: 'success', title: AUTH_MESSAGES.welcome })
			router.push(HOME_PATH)
		},
		onError: toastMessageHandler
	})

	return { verify, isLoadingVerify }
}
