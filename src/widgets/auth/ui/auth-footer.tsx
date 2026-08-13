import { OAuthButtons } from '@/features/auth'
import { AuthStep, useAuthFlow } from '@/widgets/auth'

export function AuthFooter() {
	const { switchTo, mode } = useAuthFlow()

	const nextMode: AuthStep = mode === 'login' ? 'signup' : 'login'

	return (
		<>
			{mode !== '2fa' && (
				<>
					<div className='flex items-center gap-3 my-2 after:content-[" "] after:flex-1 after:h-px after:bg-muted-foreground before:content-[" "] before:flex-1 before:h-px before:bg-muted-foreground'>
						<p className='text-xs text-muted-foreground'>
							или продолжить через
						</p>
					</div>
					<OAuthButtons />
					<span className='flex justify-center gap-1 text-sm'>
						{nextMode === 'login'
							? 'Уже с нами?'
							: 'Ещё нет аккаунта?'}
						<button
							className='text-primary cursor-pointer'
							onClick={() => switchTo(nextMode)}
						>
							{nextMode === 'login'
								? 'Войти'
								: 'Зарегистрироваться'}
						</button>
					</span>
				</>
			)}
		</>
	)
}
