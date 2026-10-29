import { type ReactElement, type ReactNode } from 'react'

import { type AuthStep } from '@/features/auth'
import { cn } from '@/shared'

import { AuthHeader } from './auth-header'

const TITLES: Readonly<Record<AuthStep, string>> = {
	login: 'С возвращением',
	signup: 'Создать аккаунт',
	'2fa': 'Введите код'
}

const SUBTITLES: Readonly<Record<Exclude<AuthStep, '2fa'>, string>> = {
	login: 'Войдите, чтобы продолжить готовить',
	signup: 'Это бесплатно — навсегда. Рецепты, план и покупки под рукой.'
}

interface Props {
	mode: AuthStep
	subtitle?: string
	children: ReactNode
}

export function AuthShell({ mode, subtitle, children }: Props): ReactElement {
	const is2Fa = mode === '2fa'

	return (
		<div className='flex h-full w-full flex-col'>
			<AuthHeader />
			<div className='my-auto flex flex-col'>
				<h1
					className={cn(
						'mb-2 text-3xl font-extrabold',
						is2Fa && 'text-center'
					)}
				>
					{TITLES[mode]}
				</h1>
				<p
					className={cn(
						'mb-4 text-sm',
						is2Fa && 'text-center text-lg'
					)}
				>
					{subtitle ?? SUBTITLES[mode as Exclude<AuthStep, '2fa'>]}
				</p>
				{children}
			</div>
		</div>
	)
}
