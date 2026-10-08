import { useQuery } from '@tanstack/react-query'

import { type IUser, userService } from '@/entities/user'

const PROFILE_QUERY_KEY = ['profile']

export function useProfileInfo(): {
	user: IUser | undefined
	isLoading: boolean
} {
	const { data: user, isLoading } = useQuery({
		queryKey: PROFILE_QUERY_KEY,
		queryFn: () => userService.findProfile()
	})

	return {
		user,
		isLoading
	}
}
