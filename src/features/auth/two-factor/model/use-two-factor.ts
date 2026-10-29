'use client'

import { type UseMutateFunction, useMutation } from '@tanstack/react-query'

import { type IUser } from '@/entities/user'
import { api } from '@/shared'

import { AUTH_ENDPOINTS } from '../../model/auth-endpoints'

export function useTwoFactor(
	email: string,
	password: string
): {
	verify: UseMutateFunction<{ user: IUser }, Error, string>
	isPending: boolean
} {
	const { mutate: verify, isPending } = useMutation<
		{ user: IUser },
		Error,
		string
	>({
		mutationKey: ['auth', 'two-factor'],
		mutationFn: code =>
			api.post<{ user: IUser }>(AUTH_ENDPOINTS.login, {
				email,
				password,
				code
			})
	})

	return { verify, isPending }
}
