'use client'

import { type UseMutateFunction, useMutation } from '@tanstack/react-query'

import { type IUser } from '@/entities/user'
import { api } from '@/shared'

import { AUTH_ENDPOINTS } from '../../model/auth-endpoints'

import type { TypeLoginSchema } from './login.schema'

/** Бэкенд отвечает либо сессией с пользователем, либо челленджем 2FA. */
export type LoginResponse = { user: IUser } | { message: string }

export function useLogin(): {
	login: UseMutateFunction<LoginResponse, Error, TypeLoginSchema>
	isPending: boolean
} {
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
