'use client'

import { createContext, useContext } from 'react'

import { AuthStep } from '@/widgets/auth'

export interface AuthFlowApi {
	mode: AuthStep
	switchTo: (mode: AuthStep) => void
	requestTwoFactor: (email: string, password: string) => void
}

export const FlowContext = createContext<AuthFlowApi | null>(null)

export function useAuthFlow() {
	const ctx = useContext(FlowContext)
	if (!ctx) throw new Error('useFlow must be used inside <AuthFlowProvider>')
	return ctx
}
