import { useMutation } from '@tanstack/react-query'

import { toast, toastMessageHandler } from '@/shared'

import { AUTH_MESSAGES, AUTH_MUTATION_KEYS } from '../../model'
import { logoutService } from '../api/logout.service'

export function useLogoutMutation() {
	const { mutate: logout, isPending: isLoadingLogout } = useMutation<
		void,
		Error
	>({
		mutationKey: AUTH_MUTATION_KEYS.logout,
		mutationFn: () => logoutService.logout(),
		onSuccess() {
			toast.add({ type: 'success', title: AUTH_MESSAGES.logout })
			window.location.reload()
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { logout, isLoadingLogout }
}
