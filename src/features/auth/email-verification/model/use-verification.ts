'use client'

import { useMutation } from '@tanstack/react-query'

import { api } from '@/shared'

import { AUTH_ENDPOINTS } from '../../model/auth-endpoints'

export function useVerification() {
	const { mutate: verify } = useMutation<void, Error, string>({
		mutationKey: ['auth', 'verification'],
		mutationFn: token =>
			api.post<void>(AUTH_ENDPOINTS.emailConfirmation, { token })
	})

	return { verify }
}
