'use client'

import { useCallback, useMemo, useState } from 'react'

import { LoginForm, SignupForm, TwoFactorForm } from '@/features/auth'
import { Tabs, TabsContent } from '@/shared'
import { AuthFlowApi, AuthShell, AuthStep, FlowContext } from '@/widgets/auth'

export interface TwoFactorCredentials {
	email: string
	password: string
}

export function AuthForm() {
	const [mode, setMode] = useState<AuthStep>('login')
	const [credentials, setCredentials] = useState<TwoFactorCredentials | null>(
		null
	)

	const switchTo = useCallback((next: AuthStep) => setMode(next), [])

	const requestTwoFactor = useCallback((email: string, password: string) => {
		setCredentials({ email, password })
		setMode('2fa')
	}, [])

	const value = useMemo<AuthFlowApi>(
		() => ({ mode, credentials, switchTo, requestTwoFactor }),
		[mode, credentials, switchTo, requestTwoFactor]
	)

	return (
		<FlowContext.Provider value={value}>
			<AuthShell>
				<Tabs value={mode}>
					<TabsContent value='login'>
						<LoginForm />
					</TabsContent>
					<TabsContent value='signup'>
						<SignupForm />
					</TabsContent>
					<TabsContent value='2fa'>
						{credentials && (
							<TwoFactorForm
								email={credentials?.email}
								password={credentials?.password}
							/>
						)}
					</TabsContent>
				</Tabs>
			</AuthShell>
		</FlowContext.Provider>
	)
}
