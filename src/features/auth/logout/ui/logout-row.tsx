import { LogOut } from 'lucide-react'

import { SettingsRow } from '@/shared'

import { useLogoutMutation } from '../model/use-log-out-mutation'

export function LogoutRow() {
	const { logout, isLoadingLogout } = useLogoutMutation()

	return (
		<SettingsRow icon={<LogOut />} onClick={() => logout()}>
			{isLoadingLogout ? 'Выходим...' : 'Выход'}
		</SettingsRow>
	)
}
