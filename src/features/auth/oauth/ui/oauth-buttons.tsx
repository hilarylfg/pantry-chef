'use client'

import { useRouter } from 'next/navigation'
import { type ReactElement } from 'react'
import { FaApple, FaGoogle, FaYandex } from 'react-icons/fa'

import { type OAuthProvider, useOauthMutation } from '@/features/auth'
import { Button } from '@/shared'

const OAUTH_PROVIDERS: ReadonlyArray<{
	provider: OAuthProvider
	icon: ReactElement
}> = [
	{ provider: 'google', icon: <FaGoogle className='size-5' /> },
	{ provider: 'apple', icon: <FaApple className='size-5' /> },
	{ provider: 'yandex', icon: <FaYandex className='size-5' /> }
]

const PROVIDER_BUTTON_LABELS: Readonly<Record<OAuthProvider, string>> = {
	google: 'Register with Google',
	apple: 'Register with Apple',
	yandex: 'Register with Yandex'
}

export function OAuthButtons(): ReactElement {
	const router = useRouter()
	const { oauth, isLoading } = useOauthMutation()

	const onClick = async (provider: OAuthProvider): Promise<void> => {
		try {
			const response = await oauth(provider)

			if (response) {
				router.push(response.url)
			}
		} catch {
			// Error toast is surfaced by the mutation's onError handler.
		}
	}

	return (
		<div className='grid grid-cols-3 gap-4 my-6'>
			{OAUTH_PROVIDERS.map(({ provider, icon }) => (
				<Button
					key={provider}
					variant='outline'
					className='w-full h-10'
					disabled={isLoading}
					onClick={() => onClick(provider)}
				>
					{icon}
					<span className='sr-only'>
						{PROVIDER_BUTTON_LABELS[provider]}
					</span>
				</Button>
			))}
		</div>
	)
}
