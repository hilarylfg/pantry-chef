'use client'

import { cn, LogoMono } from '@/shared'

import { useMinDuration } from '../model/use-min-duration'

function LogoLoader({
	isLoading,
	children,
	className,
	...props
}: {
	isLoading: boolean
	children?: React.ReactNode
} & React.ComponentProps<'div'>): React.ReactElement {
	const showLoader = useMinDuration(isLoading)

	if (!showLoader) {
		return <>{children}</>
	}

	return (
		<div
			data-slot='logo-loader'
			role='status'
			aria-label='Загрузка'
			className={cn('flex flex-1 items-center justify-center', className)}
			{...props}
		>
			<div className='relative w-28'>
				<LogoMono className='w-full text-foreground/20' />
				<div
					aria-hidden='true'
					className='absolute inset-0 animate-logo'
					style={{
						maskImage:
							'linear-gradient(105deg, transparent 40%, black 50%, transparent 60%)',
						WebkitMaskImage:
							'linear-gradient(105deg, transparent 40%, black 50%, transparent 60%)',
						maskSize: '300% 100%',
						WebkitMaskSize: '300% 100%',
						maskRepeat: 'no-repeat',
						WebkitMaskRepeat: 'no-repeat'
					}}
				>
					<LogoMono className='size-full text-primary' />
				</div>
			</div>
		</div>
	)
}

export { LogoLoader }
