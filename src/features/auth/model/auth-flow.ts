'use client'

import { createContext, useContext } from 'react'

import type { AuthStep } from './auth.types'

export interface AuthFlowApi {
	mode: AuthStep
	switchTo: (mode: AuthStep) => void
	requestTwoFactor: (email: string, password: string) => void
}

export const FlowContext = createContext<AuthFlowApi | null>(null)

export function useAuthFlow(): AuthFlowApi {
	const ctx = useContext(FlowContext)

	if (!ctx) {
		throw new Error('useAuthFlow must be used inside <AuthFlowProvider>')
	}

	return ctx
}
