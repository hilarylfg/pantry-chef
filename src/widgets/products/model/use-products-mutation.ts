'use client'

import { useMutation } from '@tanstack/react-query'

import { IProduct } from '@/entities/product'
import { AUTH_MUTATION_KEYS } from '@/features/auth'
import { toastMessageHandler } from '@/shared'

import { productsService } from '../api/products.service'

export function useProductsMutation() {
	const {
		mutate: products,
		isPending: isLoadingProducts,
		isError
	} = useMutation<IProduct, Error>({
		mutationKey: AUTH_MUTATION_KEYS.login,
		mutationFn: () => productsService.getProducts(),

		onError: toastMessageHandler
	})

	return { products, isLoadingProducts, isError }
}
