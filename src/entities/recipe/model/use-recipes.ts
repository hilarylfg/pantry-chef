'use client'

import {
	type UseMutateFunction,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'

import { api } from '@/shared'

import { RECIPES_ENDPOINTS } from './recipe.endpoint'
import { type IRecipe, type IRecipeCard } from './recipe.types'

const RECIPES_QUERY_KEY = ['recipes'] as const
const RECIPES_STALE_TIME = 5 * 60 * 1000

export function useRecipes(): {
	recipes: IRecipe[] | undefined
	isLoading: boolean
} {
	const { data: recipes, isLoading } = useQuery({
		queryKey: [...RECIPES_QUERY_KEY, 'list'],
		queryFn: () => api.get<IRecipe[]>(RECIPES_ENDPOINTS.list()),
		staleTime: RECIPES_STALE_TIME
	})

	return { recipes, isLoading }
}

export function useRecommendationsRecipes(): {
	recommendationsRecipes: IRecipeCard[] | undefined
	isLoading: boolean
} {
	const { data: recommendationsRecipes, isLoading } = useQuery({
		queryKey: [...RECIPES_QUERY_KEY, 'recommendations'],
		queryFn: () =>
			api.get<IRecipeCard[]>(RECIPES_ENDPOINTS.recommendationsRecipes()),
		staleTime: RECIPES_STALE_TIME
	})

	return { recommendationsRecipes, isLoading }
}

export function useGenerateRecipes(): {
	generate: UseMutateFunction<IRecipe[], Error, void>
	isPending: boolean
} {
	const queryClient = useQueryClient()

	const { mutate: generate, isPending } = useMutation<IRecipe[], Error, void>(
		{
			mutationKey: ['recipes', 'generate'],
			mutationFn: () => api.post<IRecipe[]>(RECIPES_ENDPOINTS.generate()),
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY })
		}
	)

	return { generate, isPending }
}
