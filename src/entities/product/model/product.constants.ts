export const PRODUCT_CATEGORIES = [
	'dairy',
	'meat',
	'poultry',
	'fish',
	'seafood',
	'eggs',
	'vegetables',
	'fruits',
	'grains',
	'pasta',
	'bread',
	'bakery',
	'canned',
	'frozen',
	'spices',
	'oils',
	'sauces',
	'beverages',
	'snacks',
	'sweets',
	'other'
] as const

export const PRODUCT_UNITS = [
	'g',
	'kg',
	'ml',
	'l',
	'tbsp',
	'tsp',
	'piece',
	'cup',
	'pinch',
	'pack',
	'bottle',
	'jar'
] as const

export const PRODUCT_SORT_FIELDS = [
	'expiryDate',
	'createdAt',
	'name',
	'amount',
	'unit',
	'category'
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]
export type ProductUnit = (typeof PRODUCT_UNITS)[number]
export type ProductSortField = (typeof PRODUCT_SORT_FIELDS)[number]

export const PRODUCT_AMOUNT_MIN: number = 0.01

export const PRODUCTS_DEFAULTS = {
	category: PRODUCT_CATEGORIES[0],
	page: 1,
	limit: 20,
	sort: 'expiryDate',
	order: 'asc'
} as const

export const EXPIRING_SOON_DAYS: number = 3
