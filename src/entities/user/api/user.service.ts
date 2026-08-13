import { IUser, TypeSettingsSchema } from '@/entities/user'
import { api } from '@/shared'

class UserService {
	public async findProfile() {
		return await api.get<IUser>('users/me')
	}

	public async updateProfile(body: TypeSettingsSchema) {
		return await api.patch<IUser>('users/me', body)
	}
}

export const userService = new UserService()
