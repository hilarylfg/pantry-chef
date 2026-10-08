import type {
	ProductCategory,
	ProductSortField,
	ProductUnit
} from './product.constants'

export const CATEGORY_LABELS: Readonly<Record<ProductCategory, string>> = {
	dairy: 'Молочное',
	meat: 'Мясо',
	poultry: 'Птица',
	fish: 'Рыба',
	seafood: 'Морепродукты',
	eggs: 'Яйца',
	vegetables: 'Овощи',
	fruits: 'Фрукты',
	grains: 'Крупы',
	pasta: 'Макароны',
	bread: 'Хлеб',
	bakery: 'Выпечка',
	canned: 'Консервы',
	frozen: 'Заморозка',
	spices: 'Специи',
	oils: 'Масла',
	sauces: 'Соусы',
	beverages: 'Напитки',
	snacks: 'Снеки',
	sweets: 'Сладкое',
	other: 'Другое'
}

export const CATEGORY_EMOJI: Readonly<Record<ProductCategory, string>> = {
	dairy: '🥛',
	meat: '🥩',
	poultry: '🍗',
	fish: '🐟',
	seafood: '🦐',
	eggs: '🥚',
	vegetables: '🥕',
	fruits: '🍎',
	grains: '🌾',
	pasta: '🍝',
	bread: '🍞',
	bakery: '🥐',
	canned: '🥫',
	frozen: '🧊',
	spices: '🧂',
	oils: '🫒',
	sauces: '🍯',
	beverages: '🥤',
	snacks: '🍿',
	sweets: '🍬',
	other: '📦'
}

export const UNIT_LABELS: Readonly<Record<ProductUnit, string>> = {
	g: 'г',
	kg: 'кг',
	ml: 'мл',
	l: 'л',
	tbsp: 'ст. л.',
	tsp: 'ч. л.',
	piece: 'шт',
	cup: 'стакан',
	pinch: 'щепотка',
	pack: 'упаковка',
	bottle: 'бутылка',
	jar: 'банка'
}

export const SORT_FIELD_LABELS: Readonly<Record<ProductSortField, string>> = {
	expiryDate: 'По сроку годности',
	createdAt: 'По дате добавления',
	name: 'По названию',
	amount: 'По количеству',
	unit: 'По единице',
	category: 'По категории'
}
