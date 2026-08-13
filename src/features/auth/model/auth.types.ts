export type AuthStep = 'login' | 'signup' | '2fa'

export type OAuthProvider = 'google' | 'yandex' | 'apple'

export interface TwoFactorCredentials {
	email: string
	password: string
}
