import { LogOut } from 'lucide-react'

import { SettingsRow, toast } from '@/shared'

import { AUTH_MESSAGES } from '../../model/auth-messages'
import { useLogout } from '../model/use-logout'

export function LogoutRow() {
	const { logout, isPending } = useLogout()

	const onLogout = (): void => {
		logout(undefined, {
			onSuccess: () => {
				toast.add({ type: 'success', title: AUTH_MESSAGES.logout })
				window.location.reload()
			}
		})
	}

	return (
		<SettingsRow icon={<LogOut />} onClick={onLogout}>
			{isPending ? 'Выходим...' : 'Выход'}
		</SettingsRow>
	)
}
