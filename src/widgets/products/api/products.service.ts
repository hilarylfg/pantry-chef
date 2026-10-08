import { IProduct, ProductCategory, ProductSortField } from '@/entities/product'
import { api, SortOrder } from '@/shared'

import { PRODUCTS_ENDPOINTS } from '../model/products-endpoint'

class ProductsService {
	public async getProducts(
		category?: ProductCategory,
		sort?: ProductSortField,
		order?: SortOrder,
		page?: number,
		limit?: number
	): Promise<IProduct> {
		return await api.get<IProduct>(
			PRODUCTS_ENDPOINTS.list({ category, sort, order, page, limit })
		)
	}

	public async getProductById(id: string): Promise<IProduct> {
		return await api.get<IProduct>(PRODUCTS_ENDPOINTS.byId(id))
	}

	public async getExpiringProducts(days?: number): Promise<IProduct> {
		return await api.get<IProduct>(PRODUCTS_ENDPOINTS.expiring(days))
	}

	public async consumeProduct(id: string): Promise<IProduct> {
		return await api.delete<IProduct>(PRODUCTS_ENDPOINTS.consume(id))
	}

	public async getProductByBarcode(barcode: string): Promise<IProduct> {
		return await api.get<IProduct>(PRODUCTS_ENDPOINTS.barcode(barcode))
	}
}

export const productsService = new ProductsService()
