// Значения принимает бэкенд

export const RECIPE_SORT_FIELDS = ['createdAt', 'title', 'favorite'] as const

export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const

export const CUISINES = [
	'italian',
	'asian',
	'russian',
	'mexican',
	'mediterranean',
	'fusion',
	'other'
] as const

export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const

export type RecipeSortField = (typeof RECIPE_SORT_FIELDS)[number]
export type Difficulty = (typeof DIFFICULTIES)[number]
export type Cuisine = (typeof CUISINES)[number]
export type MealType = (typeof MEAL_TYPES)[number]

export const RECIPES_DEFAULTS = {
	page: 1,
	limit: 20,
	sort: 'createdAt',
	order: 'asc'
} as const

export const RECIPE_GENERATION_LIMITS = {
	/** Количество рецептов за один запрос. */
	countMin: 1,
	countMax: 10,
	/** Ограничение по времени приготовления, минуты. */
	maxTimeMinutesMin: 5,
	maxTimeMinutesMax: 480,
	/** Количество порций. */
	servingsMin: 1,
	servingsMax: 50
} as const
