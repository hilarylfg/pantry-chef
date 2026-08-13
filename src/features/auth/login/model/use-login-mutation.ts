'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { loginService, TypeLoginSchema } from '@/features/auth'
import { toast, toastMessageHandler } from '@/shared'
import { useAuthFlow } from '@/widgets/auth'

export function useLoginMutation() {
	const router = useRouter()
	const { requestTwoFactor } = useAuthFlow()

	const {
		mutate: login,
		isPending: isLoadingLogin,
		isError
	} = useMutation({
		mutationKey: ['login user'],
		mutationFn: (values: TypeLoginSchema) => loginService.login(values),
		onSuccess(data: any, variables) {
			if (data?.message) {
				requestTwoFactor(variables.email, variables.password)
			} else {
				toast.add({
					type: 'success',
					title: 'Успешная авторизация'
				})
				router.push('/')
			}
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin, isError }
}
