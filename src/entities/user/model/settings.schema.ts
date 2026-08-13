import { z } from 'zod'

import { emailField, nameField } from '@/shared'

export const SettingsSchema = z.object({
	name: nameField,
	email: emailField,
	isTwoFactorEnabled: z.boolean()
})

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>
