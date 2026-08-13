import { useMutation } from '@tanstack/react-query'

import { signupService, TypeSignupSchema } from '@/features/auth'
import { toastMessageHandler } from '@/shared'

export function useSignupMutation() {
	const { mutate: signup, isPending: isLoadingSignup } = useMutation({
		mutationKey: ['register user'],
		mutationFn: (values: TypeSignupSchema) => signupService.signup(values),
		onSuccess(data: any) {
			toastMessageHandler(data)
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { signup, isLoadingSignup }
}
