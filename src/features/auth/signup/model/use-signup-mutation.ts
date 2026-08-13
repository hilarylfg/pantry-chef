'use client'

import { useMutation } from '@tanstack/react-query'

import { type IUser } from '@/entities/user'
import {
	AUTH_MUTATION_KEYS,
	signupService,
	TypeSignupSchema
} from '@/features/auth'
import { toastMessageHandler } from '@/shared'

export function useSignupMutation(): {
	signup: (variables: TypeSignupSchema) => void
	isLoadingSignup: boolean
} {
	const { mutate: signup, isPending: isLoadingSignup } = useMutation<
		IUser,
		Error,
		TypeSignupSchema
	>({
		mutationKey: AUTH_MUTATION_KEYS.signup,
		mutationFn: (values: TypeSignupSchema) => signupService.signup(values),
		onSuccess(data: IUser) {
			toastMessageHandler(data as unknown as Error)
		},
		onError: toastMessageHandler
	})

	return { signup, isLoadingSignup }
}
