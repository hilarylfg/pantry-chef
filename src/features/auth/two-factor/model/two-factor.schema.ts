import { z } from 'zod'

import { OTP_LENGTH, OTP_REGEX } from '@/shared'

export const TwoFactorSchema = z.object({
	code: z
		.string()
		.length(OTP_LENGTH, { message: `Код из ${OTP_LENGTH} цифр` })
		.regex(OTP_REGEX, { message: 'Только цифры' })
})

export type TypeTwoFactorSchema = z.infer<typeof TwoFactorSchema>
