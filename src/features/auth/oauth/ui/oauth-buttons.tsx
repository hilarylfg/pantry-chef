'use client'

import { useRouter } from 'next/navigation'
import { FaApple, FaGoogle, FaYandex } from 'react-icons/fa'

import { useOauthMutation } from '@/features/auth/oauth/model/use-oauth-mutation'
import { Button } from '@/shared'

export function OAuthButtons() {
	const router = useRouter()
	const { oauth, isLoading } = useOauthMutation()

	const onClick = async (provider: 'google' | 'yandex' | 'apple') => {
		const response = await oauth(provider)

		if (response) {
			router.push(response.url)
		}
	}

	return (
		<div className='grid grid-cols-3 gap-4 my-6'>
			<Button
				variant='outline'
				className='w-full h-10'
				disabled={isLoading}
				onClick={() => onClick('google')}
			>
				<FaGoogle className='size-5' />
				<span className='sr-only'>Register with Google</span>
			</Button>
			<Button
				variant='outline'
				className='w-full h-10'
				disabled={isLoading}
				onClick={() => onClick('apple')}
			>
				<FaApple className='size-5' />
				<span className='sr-only'>Register with Apple</span>
			</Button>
			<Button
				variant='outline'
				className='w-full h-10'
				disabled={isLoading}
				onClick={() => onClick('yandex')}
			>
				<FaYandex className='size-5' />
				<span className='sr-only'>Register with Yandex</span>
			</Button>
		</div>
	)
}
