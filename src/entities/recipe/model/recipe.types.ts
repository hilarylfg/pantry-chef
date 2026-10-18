export type IRecipeIngredient = {
	name: string
	amount: number
	unit:
		| 'g'
		| 'kg'
		| 'ml'
		| 'l'
		| 'tbsp'
		| 'tsp'
		| 'piece'
		| 'cup'
		| 'pinch'
		| 'pack'
		| 'bottle'
		| 'jar'
	substitute?: string
}

export type IRecipeStep = {
	order: number
	description: string
	durationMinutes?: number
	tip?: string
}

export type IRecipe = {
	id: string
	title: string
	description: string
	imageUrl: string | null
	cuisine:
		| 'italian'
		| 'asian'
		| 'russian'
		| 'mexican'
		| 'mediterranean'
		| 'fusion'
		| 'other'
		| null
	difficulty: 'easy' | 'medium' | 'hard' | null
	prepTimeMinutes: number | null
	cookTimeMinutes: number | null
	servings: number | null
	caloriesPerServing: number | null
	tags: string[]
	ingredients: IRecipeIngredient[]
	steps: IRecipeStep[]
	isFavorite: boolean
	userId: string
	createdAt: string
	updatedAt: string
}

export type IRecipeCard = {
	id: string
	title: string
	totalTimeMinutes: number | null
	imageUrl: string | null
	isFavorite: boolean
	match: {
		matched: number
		total: number
		missing: { name: string; substitute?: string }[]
	}
	saves: { productId: string; name: string; daysLeft: number }[]
}
