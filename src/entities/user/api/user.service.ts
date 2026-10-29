import { api } from '@/shared'

import { type TypeSettingsSchema } from '../model/settings.schema'
import { type IUser } from '../model/user.types'

const PROFILE_ENDPOINT: string = 'users/me'

class UserService {
	public async findProfile(): Promise<IUser> {
		return await api.get<IUser>(PROFILE_ENDPOINT)
	}

	public async updateProfile(body: TypeSettingsSchema): Promise<IUser> {
		return await api.patch<IUser>(PROFILE_ENDPOINT, body)
	}
}

export const userService = new UserService()
