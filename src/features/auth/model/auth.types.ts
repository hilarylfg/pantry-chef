export type AuthStep = 'login' | 'signup' | '2fa'

/** id OAuth-провайдеров, как их ждёт бэкенд в /auth/oauth/:provider. */
export const OAUTH_PROVIDERS = ['google', 'yandex', 'github'] as const

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number]

export interface TwoFactorCredentials {
	email: string
	password: string
}
