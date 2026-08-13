import { z } from 'zod'

export const TwoFactorSchema = z.object({
	code: z
		.string()
		.length(6, { message: 'Код из 6 цифр' })
		.regex(/^\d{6}$/, { message: 'Только цифры' })
})

export type TypeTwoFactorSchema = z.infer<typeof TwoFactorSchema>
