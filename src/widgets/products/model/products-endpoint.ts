import {
	EXPIRING_SOON_DAYS,
	type ProductCategory,
	PRODUCTS_DEFAULTS,
	type ProductSortField
} from '@/entities/product'
import type { SortOrder } from '@/shared'

export const PRODUCTS_ENDPOINTS: Readonly<{
	list: (params: {
		category?: ProductCategory
		sort?: ProductSortField
		order?: SortOrder
		page?: number
		limit?: number
	}) => string
	byId: (id: string) => string
	expiring: (days?: number) => string
	consume: (id: string) => string
	barcode: (barcode: string) => string
}> = {
	list: ({
		category = PRODUCTS_DEFAULTS.category,
		sort = PRODUCTS_DEFAULTS.sort,
		order = PRODUCTS_DEFAULTS.order,
		page = PRODUCTS_DEFAULTS.page,
		limit = PRODUCTS_DEFAULTS.limit
	}) => {
		const query = new URLSearchParams({
			category,
			sort,
			order,
			page: String(page),
			limit: String(limit)
		})

		return `/products?${query.toString()}`
	},
	byId: (id: string) => `/products/${id}`,
	expiring: (days: number = EXPIRING_SOON_DAYS) =>
		`/products/expiring?days=${days}`,
	consume: (id: string) => `/products/${id}/consume`,
	barcode: (barcode: string) => `/products/barcode/${barcode}`
}
