import { IUser } from '@/entities/user'
import { AUTH_ENDPOINTS, TypeSignupSchema } from '@/features/auth'
import { api } from '@/shared'

class SignupService {
	public async signup(body: TypeSignupSchema): Promise<IUser> {
		return await api.post<IUser>(AUTH_ENDPOINTS.register, body)
	}
}

export const signupService = new SignupService()
