'use client'

import { type UseMutateFunction, useMutation } from '@tanstack/react-query'

import { type IUser } from '@/entities/user'
import { api } from '@/shared'

import { AUTH_ENDPOINTS } from '../../model/auth-endpoints'

import type { TypeSignupSchema } from './signup.schema'

export function useSignup(): {
	signup: UseMutateFunction<IUser, Error, TypeSignupSchema>
	isPending: boolean
} {
	const { mutate: signup, isPending } = useMutation<
		IUser,
		Error,
		TypeSignupSchema
	>({
		mutationKey: ['auth', 'signup'],
		mutationFn: values => api.post<IUser>(AUTH_ENDPOINTS.register, values)
	})

	return { signup, isPending }
}
