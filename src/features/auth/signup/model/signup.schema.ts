import { z } from 'zod'

import { emailField, nameField, passwordField } from '@/shared'

export const SignupSchema = z.object({
	name: nameField,
	email: emailField,
	password: passwordField,
	acceptTerms: z.literal(true, {
		errorMap: () => ({ message: 'Нужно принять условия' })
	})
})

export type TypeSignupSchema = z.infer<typeof SignupSchema>
