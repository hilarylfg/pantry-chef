import type { SortOrder } from '@/shared'

import type {
	ProductCategory,
	ProductSortField,
	ProductUnit
} from './product.constants'

export interface IProduct {
	id: string
	name: string
	category: ProductCategory
	amount: number
	unit: ProductUnit
	expiryDate: string | null
	userId: string
	createdAt: string
	updatedAt: string
}

export type TypeProductBody = {
	name: string
	category: ProductCategory
	amount: number
	unit: ProductUnit
	expiryDate?: string
}

export type TypeProductsFilters = {
	category?: ProductCategory
	sort?: ProductSortField
	order?: SortOrder
	page?: number
	limit?: number
}
