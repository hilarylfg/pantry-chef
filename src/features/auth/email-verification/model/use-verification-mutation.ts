'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import {
	AUTH_MESSAGES,
	AUTH_MUTATION_KEYS,
	verificationService
} from '@/features/auth'
import { HOME_PATH, toast, toastMessageHandler } from '@/shared'

export function useVerificationMutation(): {
	verification: (token: string | null) => void
} {
	const router = useRouter()

	const { mutate: verification } = useMutation<void, Error, string | null>({
		mutationKey: AUTH_MUTATION_KEYS.verification,
		mutationFn: (token: string | null) =>
			verificationService.newVerification(token),
		onSuccess() {
			toast.add({
				type: 'success',
				title: AUTH_MESSAGES.emailVerified
			})
			router.push(HOME_PATH)
		},
		onError: toastMessageHandler
	})

	return { verification }
}
