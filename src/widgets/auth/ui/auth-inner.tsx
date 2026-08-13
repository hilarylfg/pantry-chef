import { cn } from '@/shared'
import { AuthStep, useAuthFlow } from '@/widgets/auth'

const TITLES: Record<AuthStep, string> = {
	login: 'С возвращением',
	signup: 'Создать аккаунт',
	'2fa': 'Введите код'
}

const SUBTITLES: Record<AuthStep, string> = {
	login: 'Войдите, чтобы продолжить готовить',
	signup: 'Это бесплатно — навсегда. Рецепты, план и покупки под рукой.',
	'2fa': 'Введите 6-значный код, отправленный на вашу почту'
}

export function AuthInner() {
	const { mode } = useAuthFlow()

	return (
		<>
			<h1
				className={cn(
					'mb-2 text-3xl font-extrabold',
					mode === '2fa' && 'text-center'
				)}
			>
				{TITLES[mode]}
			</h1>
			<p
				className={cn(
					'mb-4 text-sm',
					mode === '2fa' && 'text-center text-lg'
				)}
			>
				{SUBTITLES[mode]}
			</p>
		</>
	)
}
