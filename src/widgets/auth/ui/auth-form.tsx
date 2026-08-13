'use client'

import { type ReactElement, useCallback, useMemo, useState } from 'react'

import {
	type AuthFlowApi,
	type AuthStep,
	FlowContext,
	LoginForm,
	SignupForm,
	type TwoFactorCredentials,
	TwoFactorForm
} from '@/features/auth'
import { Tabs, TabsContent } from '@/shared'
import { AuthShell } from '@/widgets/auth'

export function AuthForm(): ReactElement {
	const [mode, setMode] = useState<AuthStep>('login')
	const [credentials, setCredentials] = useState<TwoFactorCredentials | null>(
		null
	)

	const switchTo = useCallback((next: AuthStep): void => setMode(next), [])

	const requestTwoFactor = useCallback(
		(email: string, password: string): void => {
			setCredentials({ email, password })
			setMode('2fa')
		},
		[]
	)

	const value = useMemo<AuthFlowApi>(
		() => ({ mode, switchTo, requestTwoFactor }),
		[mode, switchTo, requestTwoFactor]
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
								email={credentials.email}
								password={credentials.password}
							/>
						)}
					</TabsContent>
				</Tabs>
			</AuthShell>
		</FlowContext.Provider>
	)
}
