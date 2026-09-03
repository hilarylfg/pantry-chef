import { ReactNode } from 'react'

import { cn } from '../lib/clsx'

export function SettingsRow({
	children,
	icon,
	onClick,
	rightElement
}: {
	onClick?: () => void
	children: ReactNode
	icon: ReactNode
	rightElement?: ReactNode
}) {
	return (
		<div className='flex items-center gap-4 border-b border-b-border px-1 py-4 last:border-none'>
			<button
				onClick={onClick}
				className={cn(
					'flex items-center gap-4 border-none p-0',
					onClick && 'cursor-pointer'
				)}
				disabled={!onClick}
			>
				<div className='rounded-sm bg-surface-2 p-2 *:size-5'>
					{icon}
				</div>
				<h2 className='font-semibold'>{children}</h2>
			</button>

			{rightElement && (
				<div className='flex flex-1 justify-end'>{rightElement}</div>
			)}
		</div>
	)
}
