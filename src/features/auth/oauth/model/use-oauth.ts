'use client'

import { type UseMutateAsyncFunction, useMutation } from '@tanstack/react-query'

import { api } from '@/shared'

import { AUTH_ENDPOINTS } from '../../model/auth-endpoints'
import type { OAuthProvider } from '../../model/auth.types'

export function useOauth(): {
	oauth: UseMutateAsyncFunction<{ url: string }, Error, OAuthProvider>
	isPending: boolean
} {
	const { mutateAsync: oauth, isPending } = useMutation<
		{ url: string },
		Error,
		OAuthProvider
	>({
		mutationKey: ['auth', 'oauth'],
		mutationFn: provider =>
			api.get<{ url: string }>(AUTH_ENDPOINTS.oauthConnect(provider))
	})

	return { oauth, isPending }
}
