'use client'

import { useMutation } from '@tanstack/react-query'

import {
	AUTH_MUTATION_KEYS,
	type OAuthProvider,
	oauthService
} from '@/features/auth'
import { toastMessageHandler } from '@/shared'

export function useOauthMutation(): {
	oauth: (provider: OAuthProvider) => Promise<{ url: string }>
	isLoading: boolean
} {
	const { mutateAsync: oauth, isPending: isLoading } = useMutation<
		{ url: string },
		Error,
		OAuthProvider
	>({
		mutationKey: AUTH_MUTATION_KEYS.oauth,
		mutationFn: async (provider: OAuthProvider) =>
			await oauthService.oauthByProvider(provider),
		onError: toastMessageHandler
	})

	return { oauth, isLoading }
}
