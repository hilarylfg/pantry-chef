import { z } from 'zod'

export const PASSWORD_MIN_LENGTH: number = 6

export const OTP_LENGTH: number = 6

export const nameField: z.ZodString = z.string().min(1, {
	message: 'Введите имя'
})

export const emailField: z.ZodString = z.string().email({
	message: 'Некорректная почта'
})

export const passwordField: z.ZodString = z.string().min(PASSWORD_MIN_LENGTH, {
	message: `Пароль минимум ${PASSWORD_MIN_LENGTH} символов`
})

export const OTP_REGEX: RegExp = new RegExp(`^\\d{${OTP_LENGTH}}$`)
