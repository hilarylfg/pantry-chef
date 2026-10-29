import { ChevronRight, ClockAlert } from 'lucide-react'
import { type ReactElement } from 'react'

import { useExpiringProducts } from '@/entities/product'
import { pluralizeRu } from '@/shared'

export function ExpiringBanner(): ReactElement | null {
	const { expiringProducts } = useExpiringProducts()

	if (!expiringProducts || expiringProducts.length === 0) return null

	return (
		<div className='flex w-full gap-3 rounded-lg bg-[color-mix(in_oklab,var(--late),var(--surface)_88%)] p-4'>
			<div className='my-auto flex size-10 items-center justify-center rounded-lg bg-[color-mix(in_oklab,var(--late),var(--surface)_76%)]'>
				<ClockAlert className='size-5 text-[color-mix(in_oklab,var(--late),var(--foreground)_20%)]' />
			</div>
			<div>
				<p className='font-extrabold'>
					{expiringProducts.length}{' '}
					{pluralizeRu(
						expiringProducts.length,
						'продукт просит',
						'продукта просят',
						'продуктов просят'
					)}{' '}
					внимания
				</p>
				<div className='flex gap-2'>
					{expiringProducts.slice(0, 1).map(product => (
						<p
							key={product.id}
							className='w-fit rounded-lg border-border bg-surface px-2 py-1 text-[11px] font-bold text-muted-foreground'
						>
							{product.name}
						</p>
					))}
					{expiringProducts.length > 1 && (
						<p className='w-fit rounded-lg border-border bg-surface px-2 py-1 text-[11px] font-bold text-muted-foreground'>
							{expiringProducts.length - 1}+
						</p>
					)}
				</div>
			</div>
			<div className='ml-auto flex items-center'>
				<ChevronRight className='size-4 text-[color-mix(in_oklab,var(--late),var(--foreground)_20%)]' />
			</div>
		</div>
	)
}
