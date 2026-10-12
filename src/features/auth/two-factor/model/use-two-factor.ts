'use client'

import { type UseMutateFunction, useMutation } from '@tanstack/react-query'

import { type IUser } from '@/entities/user'
import { api } from '@/shared'

import { AUTH_ENDPOINTS } from '../../model/auth-endpoints'

export function useTwoFactor(
	email: string,
	password: string
): {
	verify: UseMutateFunction<IUser, Error, string>
	isPending: boolean
} {
	const { mutate: verify, isPending } = useMutation<IUser, Error, string>({
		mutationKey: ['auth', 'two-factor'],
		mutationFn: code =>
			api.post<IUser>(AUTH_ENDPOINTS.login, { email, password, code })
	})

	return { verify, isPending }
}
