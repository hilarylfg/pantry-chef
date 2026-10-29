import type { SortOrder } from '@/shared'

import {
	type ProductCategory,
	PRODUCTS_DEFAULTS,
	type ProductSortField
} from '../model/product.constants'

export const PRODUCTS_ENDPOINTS: Readonly<{
	list: (params: {
		category?: ProductCategory
		sort?: ProductSortField
		order?: SortOrder
		page?: number
		limit?: number
	}) => string
	byId: (id: string) => string
	expiring: (days: number) => string
	consume: (id: string) => string
	barcode: (barcode: string) => string
}> = {
	list: ({
		category,
		sort = PRODUCTS_DEFAULTS.sort,
		order = PRODUCTS_DEFAULTS.order,
		page = PRODUCTS_DEFAULTS.page,
		limit = PRODUCTS_DEFAULTS.limit
	}) => {
		const query = new URLSearchParams({
			sort,
			order,
			page: String(page),
			limit: String(limit)
		})

		if (category) query.set('category', category)

		return `products?${query.toString()}`
	},
	byId: (id: string) => `products/${id}`,
	expiring: (days: number) => `products/expiring?days=${days}`,
	consume: (id: string) => `products/${id}/consume`,
	barcode: (barcode: string) => `products/barcode/${barcode}`
}
