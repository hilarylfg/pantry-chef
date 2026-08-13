'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { type ReactElement } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
	SignupSchema,
	TypeSignupSchema,
	useSignupMutation
} from '@/features/auth'
import {
	Button,
	Checkbox,
	Field,
	FieldError,
	FieldLabel,
	TextField
} from '@/shared'

export function SignupForm(): ReactElement {
	const form = useForm<TypeSignupSchema>({
		resolver: zodResolver(SignupSchema),
		defaultValues: { name: '', email: '', password: '' }
	})

	const { signup, isLoadingSignup } = useSignupMutation()

	const onSubmit = (values: TypeSignupSchema): void => {
		signup(values)
	}

	return (
		<form
			className='flex flex-col gap-5'
			onSubmit={form.handleSubmit(onSubmit)}
		>
			<TextField
				name='name'
				control={form.control}
				label='Имя'
				placeholder='Иван'
				required
			/>
			<TextField
				name='email'
				control={form.control}
				label='Почта'
				type='email'
				placeholder='m@example.com'
				disabled={isLoadingSignup}
				required
			/>
			<TextField
				name='password'
				control={form.control}
				label='Пароль'
				type='password'
				disabled={isLoadingSignup}
				required
			/>
			<Controller
				name='acceptTerms'
				control={form.control}
				render={({ field, fieldState }) => (
					<Field
						orientation='horizontal'
						className='w-fit'
						data-invalid={fieldState.invalid}
					>
						<Checkbox
							id='signup-terms'
							name='signup-terms'
							checked={field.value}
							onCheckedChange={field.onChange}
							aria-invalid={fieldState.invalid}
						/>
						<FieldLabel
							className='text-[13px] gap-1'
							htmlFor='signup-terms'
						>
							Я принимаю
							<Link href='#' className='text-primary'>
								условия использования
							</Link>
						</FieldLabel>
						{fieldState.invalid && (
							<FieldError errors={[fieldState.error]} />
						)}
					</Field>
				)}
			/>
			<Button
				type='submit'
				className='mb-5 h-10 w-full'
				disabled={isLoadingSignup}
			>
				{isLoadingSignup ? 'Создаём…' : 'Создать аккаунт'}
			</Button>
		</form>
	)
}
