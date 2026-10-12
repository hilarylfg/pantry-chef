'use client'

import { type ReactElement, useState } from 'react'

import {
	type AuthStep,
	LoginForm,
	SignupForm,
	type TwoFactorCredentials,
	TwoFactorForm
} from '@/features/auth'

import { AuthFooter } from './auth-footer'
import { AuthShell } from './auth-shell'

export function AuthForm(): ReactElement {
	const [mode, setMode] = useState<AuthStep>('login')
	const [credentials, setCredentials] = useState<TwoFactorCredentials | null>(
		null
	)

	const startTwoFactor = (email: string, password: string): void => {
		setCredentials({ email, password })
		setMode('2fa')
	}

	return (
		<AuthShell
			mode={mode}
			subtitle={
				mode === '2fa'
					? `Отправили шесть цифр на ${credentials?.email ?? ''}`
					: undefined
			}
		>
			{mode === 'login' && <LoginForm onTwoFactor={startTwoFactor} />}
			{mode === 'signup' && <SignupForm />}
			{mode === '2fa' && credentials !== null && (
				<TwoFactorForm {...credentials} />
			)}
			<AuthFooter mode={mode} onSwitch={setMode} />
		</AuthShell>
	)
}
