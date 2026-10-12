'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
	Button,
	Checkbox,
	Field,
	FieldLabel,
	HOME_PATH,
	TextField,
	toast
} from '@/shared'

import { AUTH_MESSAGES } from '../../model/auth-messages'
import { LoginSchema, type TypeLoginSchema } from '../model/login.schema'
import { useLogin } from '../model/use-login'

interface LoginFormProps {
	onTwoFactor: (email: string, password: string) => void
}

export function LoginForm({ onTwoFactor }: LoginFormProps): ReactElement {
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()
	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: { email: '', password: '' }
	})

	const { login, isPending } = useLogin()

	const onSubmit = (values: TypeLoginSchema): void => {
		login(values, {
			onSuccess: data => {
				if ('message' in data) {
					onTwoFactor(values.email, values.password)
				} else {
					toast.add({
						type: 'success',
						title: AUTH_MESSAGES.loginSuccess
					})
					router.push(HOME_PATH)
				}
			}
		})
	}

	return (
		<form
			className='flex flex-col gap-5'
			onSubmit={form.handleSubmit(onSubmit)}
		>
			<TextField
				name='email'
				control={form.control}
				label='Почта'
				type='email'
				placeholder='m@example.com'
				disabled={isPending}
				required
			/>
			<TextField
				name='password'
				control={form.control}
				label='Пароль'
				type={showPassword ? 'text' : 'password'}
				placeholder='••••••••'
				autoComplete='current-password'
				disabled={isPending}
				required
				trailing={
					<button
						type='button'
						onClick={() => setShowPassword(show => !show)}
						className='text-muted-foreground'
						aria-label={
							showPassword ? 'Скрыть пароль' : 'Показать пароль'
						}
					>
						{showPassword ? (
							<EyeOffIcon size={18} />
						) : (
							<EyeIcon size={18} />
						)}
					</button>
				}
			/>
			<div className='flex items-center'>
				<Field orientation='horizontal' className='w-fit'>
					<Checkbox
						id='remember-checkbox'
						name='remember-checkbox'
						disabled={isPending}
					/>
					<FieldLabel
						className='text-[13px]'
						htmlFor='remember-checkbox'
					>
						Запомнить меня
					</FieldLabel>
				</Field>
				<a
					href='#'
					className='ml-auto text-[13px] underline-offset-2 hover:underline'
				>
					Забыли пароль?
				</a>
			</div>
			<Button
				type='submit'
				className='mb-5 h-10 w-full'
				disabled={isPending}
			>
				{isPending ? 'Входим…' : 'Войти'}
			</Button>
		</form>
	)
}
