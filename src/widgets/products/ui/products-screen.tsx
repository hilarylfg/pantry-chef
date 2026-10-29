import { Plus } from 'lucide-react'
import { type ReactElement } from 'react'

import { useProducts } from '@/entities/product'
import { Button, pluralizeRu } from '@/shared'

export function ProductsScreen(): ReactElement {
	const { products } = useProducts()

	return (
		<div className='flex items-center justify-between'>
			<div className='mb-2 flex flex-col gap-3'>
				<h2 className='text-2xl font-semibold'>Продукты</h2>
				<span className='text-xs text-muted-foreground'>
					{products &&
						pluralizeRu(products.length, 'продукт', 'продукта', 'продуктов')}
				</span>
			</div>
			<Button
				size='icon-lg'
				variant='secondary'
				aria-label='Добавить продукт'
			>
				<Plus className='size-5' />
			</Button>
		</div>
	)
}
