import { type ReactElement } from 'react'

import { type AuthStep, OAuthButtons } from '@/features/auth'

interface Props {
	mode: AuthStep
	onSwitch: (mode: AuthStep) => void
}

export function AuthFooter({ mode, onSwitch }: Props): ReactElement | null {
	if (mode === '2fa') {
		return null
	}

	const nextMode: AuthStep = mode === 'login' ? 'signup' : 'login'

	return (
		<>
			<div className='after:content-[" "] before:content-[" "] my-2 flex items-center gap-3 before:h-px before:flex-1 before:bg-muted-foreground after:h-px after:flex-1 after:bg-muted-foreground'>
				<p className='text-xs text-muted-foreground'>
					или продолжить через
				</p>
			</div>
			<OAuthButtons />
			<span className='flex justify-center gap-1 text-sm'>
				{nextMode === 'login' ? 'Уже с нами?' : 'Ещё нет аккаунта?'}
				<button
					className='cursor-pointer text-primary'
					onClick={() => onSwitch(nextMode)}
				>
					{nextMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
				</button>
			</span>
		</>
	)
}
