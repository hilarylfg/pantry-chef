import type { OAuthProvider } from './auth.types'

export const AUTH_ENDPOINTS: Readonly<{
	login: string
	register: string
	emailConfirmation: string
	oauthConnect: (provider: OAuthProvider) => string
	logout: string
}> = {
	login: 'auth/login',
	register: 'auth/register',
	emailConfirmation: 'auth/email-confirmation',
	oauthConnect: (provider: OAuthProvider): string =>
		`auth/oauth/connect/${provider}`,
	logout: 'auth/logout'
}
