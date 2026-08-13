import { IUser } from '@/entities/user'
import { TypeLoginSchema } from '@/features/auth'
import { api } from '@/shared'

class LoginService {
	public async login(body: TypeLoginSchema) {
		return await api.post<IUser>('auth/login', body)
	}
}

export const loginService = new LoginService()
