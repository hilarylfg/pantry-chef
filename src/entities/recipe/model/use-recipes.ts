const RECIPES_QUERY_KEY = ['recipes'] as const
const RECIPES_SCALE_TIME = 5 * 60 * 1000

export function useRecipes(): {
	recipes: IRecipe
}
