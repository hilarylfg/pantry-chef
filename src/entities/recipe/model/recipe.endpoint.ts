import { RECIPES_DEFAULTS } from './recipe.constants'

export const RECIPES_ENDPOINTS = {
	list: () => {
		const query = new URLSearchParams({
			sort: RECIPES_DEFAULTS.sort,
			order: RECIPES_DEFAULTS.order,
			page: String(RECIPES_DEFAULTS.page),
			limit: String(RECIPES_DEFAULTS.limit)
		})

		return `recipes?${query.toString()}`
	},
	byId: (id: string) => `recipes/${id}`,
	generate: () => 'recipes/generate'
} as const
