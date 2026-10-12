'use client'

import { type UseMutateFunction, useMutation } from '@tanstack/react-query'

import { api } from '@/shared'

import { AUTH_ENDPOINTS } from '../../model/auth-endpoints'

export function useVerification(): {
	verify: UseMutateFunction<void, Error, string>
	isPending: boolean
} {
	const { mutate: verify, isPending } = useMutation<void, Error, string>({
		mutationKey: ['auth', 'verification'],
		mutationFn: token =>
			api.post<void>(AUTH_ENDPOINTS.emailConfirmation, { token })
	})

	return { verify, isPending }
}
