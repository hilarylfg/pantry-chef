export function pluralizeRu(
	count: number,
	one: string,
	few: string,
	many: string
): string {
	const n = Math.abs(count) % 100
	const last = n % 10

	if (n > 10 && n < 20) return many
	if (last > 1 && last < 5) return few
	if (last === 1) return one

	return many
}
