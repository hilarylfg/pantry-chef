'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
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
	Input
} from '@/shared'

export function SignupForm() {
	const form = useForm<TypeSignupSchema>({
		resolver: zodResolver(SignupSchema),
		defaultValues: { name: '', email: '', password: '' }
	})

	const { signup, isLoadingSignup } = useSignupMutation()

	const onSubmit = (values: TypeSignupSchema) => {
		signup(values)
	}

	return (
		<form
			className='flex flex-col gap-5'
			onSubmit={form.handleSubmit(onSubmit)}
		>
			<Controller
				name='name'
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor='name'>Имя</FieldLabel>
						<Input
							id='name'
							type='name'
							className='text-[15px]'
							placeholder='Иван'
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
							disabled={isLoadingSignup}
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
						<Input
							id='password'
							type='password'
							className='text-[15px]'
							aria-invalid={fieldState.invalid}
							disabled={isLoadingSignup}
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
