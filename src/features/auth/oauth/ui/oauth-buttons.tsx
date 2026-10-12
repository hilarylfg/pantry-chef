'use client'

import { useRouter } from 'next/navigation'
import { type ReactElement } from 'react'
import { FaGithub, FaGoogle, FaYandex } from 'react-icons/fa'

import { Button } from '@/shared'

import type { OAuthProvider } from '../../model/auth.types'
import { useOauth } from '../model/use-oauth'

const OAUTH_PROVIDERS: ReadonlyArray<{
	provider: OAuthProvider
	icon: ReactElement
}> = [
	{ provider: 'google', icon: <FaGoogle className='size-5' /> },
	{ provider: 'github', icon: <FaGithub className='size-5' /> },
	{ provider: 'yandex', icon: <FaYandex className='size-5' /> }
]

const PROVIDER_BUTTON_LABELS: Readonly<Record<OAuthProvider, string>> = {
	google: 'Register with Google',
	github: 'Register with Github',
	yandex: 'Register with Yandex'
}

export function OAuthButtons(): ReactElement {
	const router = useRouter()
	const { oauth, isPending } = useOauth()

	const onClick = (provider: OAuthProvider): void => {
		oauth(provider, {
			onSuccess: response => {
				router.push(response.url)
			}
		})
	}

	return (
		<div className='my-6 grid grid-cols-3 gap-4'>
			{OAUTH_PROVIDERS.map(({ provider, icon }) => (
				<Button
					key={provider}
					variant='outline'
					className='h-10 w-full'
					disabled={isPending}
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
