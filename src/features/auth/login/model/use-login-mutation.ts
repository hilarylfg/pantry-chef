'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { type IUser } from '@/entities/user'
import {
	AUTH_MESSAGES,
	AUTH_MUTATION_KEYS,
	loginService,
	TypeLoginSchema,
	useAuthFlow
} from '@/features/auth'
import { HOME_PATH, toast, toastMessageHandler } from '@/shared'

interface TwoFactorChallenge {
	message: string
}

type LoginResponse = IUser | TwoFactorChallenge

export function useLoginMutation(): {
	login: (variables: TypeLoginSchema) => void
	isLoadingLogin: boolean
	isError: boolean
} {
	const router = useRouter()
	const { requestTwoFactor } = useAuthFlow()

	const {
		mutate: login,
		isPending: isLoadingLogin,
		isError
	} = useMutation<LoginResponse, Error, TypeLoginSchema>({
		mutationKey: AUTH_MUTATION_KEYS.login,
		mutationFn: (values: TypeLoginSchema) => loginService.login(values),
		onSuccess(data, variables) {
			if ('message' in data) {
				requestTwoFactor(variables.email, variables.password)
			} else {
				toast.add({
					type: 'success',
					title: AUTH_MESSAGES.loginSuccess
				})
				router.push(HOME_PATH)
			}
		},
		onError: toastMessageHandler
	})

	return { login, isLoadingLogin, isError }
}
