'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { IProduct } from '@/entities/product'
import { type IUser } from '@/entities/user'
import {
	AUTH_MESSAGES,
	AUTH_MUTATION_KEYS,
	loginService,
	TypeLoginSchema,
	useAuthFlow
} from '@/features/auth'
import { HOME_PATH, toast, toastMessageHandler } from '@/shared'

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
