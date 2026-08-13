import { z } from 'zod'

export const SignupSchema = z.object({
	name: z.string().min(1, {
		message: 'Введите имя'
	}),
	email: z.string().email({
		message: 'Некорректная почта'
	}),
	password: z.string().min(6, {
		message: 'Пароль минимум 6 символов'
	}),
	acceptTerms: z.literal(true, {
		errorMap: () => ({ message: 'Нужно принять условия' })
	})
})

export type TypeSignupSchema = z.infer<typeof SignupSchema>
