'use client'

import {
	keepPreviousData,
	type UseMutateFunction,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'

import { type IProduct, type TypeProductsFilters } from '@/entities/product'
import { api } from '@/shared'

import { PRODUCTS_ENDPOINTS } from './products-endpoint'

const PRODUCTS_QUERY_KEY = ['products'] as const

export function useProducts(filters: TypeProductsFilters = {}): {
	products: IProduct[] | undefined
	isLoading: boolean
} {
	const { data: products, isLoading } = useQuery({
		queryKey: [...PRODUCTS_QUERY_KEY, filters],
		queryFn: () => api.get<IProduct[]>(PRODUCTS_ENDPOINTS.list(filters)),
		placeholderData: keepPreviousData
	})

	return { products, isLoading }
}

export function useConsumeProduct(): {
	consume: UseMutateFunction<IProduct, Error, string>
	isPending: boolean
} {
	const queryClient = useQueryClient()

	const { mutate: consume, isPending } = useMutation<IProduct, Error, string>(
		{
			mutationKey: ['products', 'consume'],
			mutationFn: id =>
				api.delete<IProduct>(PRODUCTS_ENDPOINTS.consume(id)),
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY })
		}
	)

	return { consume, isPending }
}
