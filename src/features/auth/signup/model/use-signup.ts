'use client'

import { type UseMutateFunction, useMutation } from '@tanstack/react-query'

import { api } from '@/shared'

import { AUTH_ENDPOINTS } from '../../model/auth-endpoints'

import type { TypeSignupSchema } from './signup.schema'

export type RegisterResponse = { message: string }

export function useSignup(): {
	signup: UseMutateFunction<RegisterResponse, Error, TypeSignupSchema>
	isPending: boolean
} {
	const { mutate: signup, isPending } = useMutation<
		RegisterResponse,
		Error,
		TypeSignupSchema
	>({
		mutationKey: ['auth', 'signup'],
		mutationFn: values =>
			api.post<RegisterResponse>(AUTH_ENDPOINTS.register, values)
	})

	return { signup, isPending }
}
