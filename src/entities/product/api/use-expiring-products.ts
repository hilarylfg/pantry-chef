'use client'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/shared'

import { EXPIRING_SOON_DAYS } from '../model/product.constants'
import { type IProduct } from '../model/product.types'

import { PRODUCTS_ENDPOINTS } from './products-endpoint'
import { PRODUCTS_QUERY_KEY } from './query-keys'

export function useExpiringProducts(days: number = EXPIRING_SOON_DAYS): {
	expiringProducts: IProduct[] | undefined
	isLoading: boolean
} {
	const { data: expiringProducts, isLoading } = useQuery({
		queryKey: [...PRODUCTS_QUERY_KEY, 'expiring', days],
		queryFn: () => api.get<IProduct[]>(PRODUCTS_ENDPOINTS.expiring(days))
	})

	return { expiringProducts, isLoading }
}
