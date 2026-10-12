import { z } from 'zod'

import { emailField, passwordField } from '@/shared'

export const LoginSchema = z.object({
	email: emailField,
	password: passwordField
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>
