'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { LoginSchema, TypeLoginSchema, useLoginMutation } from '@/features/auth'
import {
	Button,
	Checkbox,
	Field,
	FieldError,
	FieldLabel,
	Input
} from '@/shared'

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)
	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: { email: '', password: '' }
	})

	const { login, isLoadingLogin } = useLoginMutation()

	const onSubmit = (values: TypeLoginSchema) => {
		login(values)
	}

	return (
		<form
			className='flex flex-col gap-5'
			onSubmit={form.handleSubmit(onSubmit)}
		>
			<Controller
				name='email'
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor='email'>Почта</FieldLabel>
						<Input
							id='email'
							type='email'
							className='text-[15px]'
							placeholder='m@example.com'
							disabled={isLoadingLogin}
							aria-invalid={fieldState.invalid}
							required
							{...field}
						/>
						{fieldState.invalid && (
							<FieldError errors={[fieldState.error]} />
						)}
					</Field>
				)}
			/>

			<Controller
				name='password'
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor='password'>Пароль</FieldLabel>
						<div className='relative'>
							<Input
								id='password'
								className='text-[15px]'
								aria-invalid={fieldState.invalid}
								type={showPassword ? 'text' : 'password'}
								placeholder='••••••••'
                                autoComplete='current-password'
                                disabled={isLoadingLogin}
								required
								{...field}
							/>
							<button
								type='button'
								onClick={() => setShowPassword(s => !s)}
								className='absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground'
								aria-label={
									showPassword
										? 'Скрыть пароль'
										: 'Показать пароль'
								}
							>
								{showPassword ? (
									<EyeOffIcon size={18} />
								) : (
									<EyeIcon size={18} />
								)}
							</button>
						</div>
						{fieldState.invalid && (
							<FieldError errors={[fieldState.error]} />
						)}
					</Field>
				)}
			/>
			<div className='flex items-center'>
				<Field orientation='horizontal' className='w-fit'>
					<Checkbox
						id='remember-checkbox'
						name='remember-checkbox'
						disabled={isLoadingLogin}
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
				disabled={isLoadingLogin}
			>
				{isLoadingLogin ? 'Входим…' : 'Войти'}
			</Button>
		</form>
	)
}
