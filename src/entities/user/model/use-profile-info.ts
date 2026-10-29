'use client'

import { useQuery } from '@tanstack/react-query'

import { userService } from '../api/user.service'
import { type IUser } from '../model/user.types'

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
