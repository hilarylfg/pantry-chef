'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { type IProduct, type TypeProductsFilters } from '@/entities/product'
import { api } from '@/shared'

import { PRODUCTS_ENDPOINTS } from './products-endpoint'

const PRODUCTS_QUERY_KEY = ['products'] as const

export function useProducts(filters: TypeProductsFilters = {}) {
	return useQuery({
		queryKey: [...PRODUCTS_QUERY_KEY, filters],
		queryFn: () => api.get<IProduct[]>(PRODUCTS_ENDPOINTS.list(filters))
	})
}

export function useConsumeProduct() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['products', 'consume'],
		mutationFn: (id: string) =>
			api.delete<IProduct>(PRODUCTS_ENDPOINTS.consume(id)),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY })
	})
}
