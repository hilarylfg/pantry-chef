import { api } from '@/shared'

class OauthService {
	public async oauthByProvider(provider: 'google' | 'yandex' | 'apple') {
		return await api.get<{ url: string }>(`auth/oauth/connect/${provider}`)
	}
}

export const oauthService = new OauthService()
