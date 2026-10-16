'use client'

import { useQuery } from '@tanstack/react-query'

import { EXPIRING_SOON_DAYS, type IProduct } from '@/entities/product'
import { api } from '@/shared'

import { PRODUCTS_ENDPOINTS } from './products-endpoint'

const PRODUCTS_QUERY_KEY = ['products'] as const

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
