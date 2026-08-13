import { IUser } from '@/entities/user'
import { AUTH_ENDPOINTS, TypeLoginSchema } from '@/features/auth'
import { api } from '@/shared'

class LoginService {
	public async login(body: TypeLoginSchema): Promise<IUser> {
		return await api.post<IUser>(AUTH_ENDPOINTS.login, body)
	}
}

export const loginService = new LoginService()
