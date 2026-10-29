export enum UserRole {
	Regular = 'REGULAR',
	Admin = 'ADMIN'
}

export enum AuthMethod {
	Credentials = 'CREDENTIALS',
	Google = 'GOOGLE',
	Yandex = 'YANDEX',
	Github = 'GITHUB'
}

export interface IAccount {
	id: string
	createdAt: string
	updatedAt: string
	type: string
	provider: string
	providerAccountId: string
}

/**
 * Публичный профиль — ровно то, что бэкенд отдаёт в users/me, auth/login
 * и PATCH users/me: select без пароля и OAuth-токенов.
 */
export interface IUser {
	id: string
	createdAt: string
	updatedAt: string
	email: string
	displayName: string
	picture: string
	role: UserRole
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: AuthMethod
	accounts: IAccount[]
}
