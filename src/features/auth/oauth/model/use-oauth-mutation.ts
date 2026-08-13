import { useMutation } from '@tanstack/react-query'

import { oauthService } from '@/features/auth'

export function useOauthMutation() {
	const { mutateAsync: oauth, isPending: isLoading } = useMutation({
		mutationKey: ['oauth by provider'],
		mutationFn: async (provider: 'google' | 'yandex' | 'apple') =>
			await oauthService.oauthByProvider(provider)
	})

	return { oauth, isLoading }
}
