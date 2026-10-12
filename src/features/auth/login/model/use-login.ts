'use client'

import { useMutation } from '@tanstack/react-query'

import { type IUser } from '@/entities/user'
import { api } from '@/shared'

import { AUTH_ENDPOINTS } from '../../model/auth-endpoints'

import type { TypeLoginSchema } from './login.schema'

export type LoginResponse = IUser | { message: string }

export function useLogin() {
	const { mutate: login, isPending } = useMutation<
		LoginResponse,
		Error,
		TypeLoginSchema
	>({
		mutationKey: ['auth', 'login'],
		mutationFn: values =>
			api.post<LoginResponse>(AUTH_ENDPOINTS.login, values)
	})

	return { login, isPending }
}
