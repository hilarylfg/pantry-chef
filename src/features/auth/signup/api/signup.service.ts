import { IUser } from '@/entities/user'
import { TypeSignupSchema } from '@/features/auth'
import { api } from '@/shared'

class SignupService {
	public async signup(body: TypeSignupSchema) {
		return await api.post<IUser>('auth/register', body)
	}
}

export const signupService = new SignupService()
