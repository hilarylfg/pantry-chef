'use client'

import { useMutation } from '@tanstack/react-query'

import { api } from '@/shared'

import { AUTH_ENDPOINTS } from '../../model/auth-endpoints'

export function useLogout() {
	const { mutate: logout, isPending } = useMutation<void, Error>({
		mutationKey: ['auth', 'logout'],
		mutationFn: () => api.post<void>(AUTH_ENDPOINTS.logout)
	})

	return { logout, isPending }
}
