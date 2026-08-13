import { AUTH_ENDPOINTS, OAuthProvider } from '@/features/auth'
import { api } from '@/shared'

class OauthService {
	public async oauthByProvider(
		provider: OAuthProvider
	): Promise<{ url: string }> {
		return await api.get<{ url: string }>(
			AUTH_ENDPOINTS.oauthConnect(provider)
		)
	}
}

export const oauthService = new OauthService()
