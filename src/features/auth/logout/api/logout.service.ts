import { api } from '@/shared'

import { AUTH_ENDPOINTS } from '../../model'

class LogoutService {
	public async logout(): Promise<void> {
		await api.post(AUTH_ENDPOINTS.logout)
	}
}

export const logoutService = new LogoutService()
