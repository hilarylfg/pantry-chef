'use client'

import * as React from 'react'
import {
	type Control,
	Controller,
	type FieldValues,
	type Path
} from 'react-hook-form'

import { cn } from '../lib/clsx'
import { Field, FieldError, FieldLabel } from './field'
import { Input } from './input'

interface TextFieldProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
	label: string
	type?: React.InputHTMLAttributes<HTMLInputElement>['type']
	placeholder?: string
	autoComplete?: string
	disabled?: boolean
	required?: boolean
	className?: string
	/** Контент у правого края поля: иконки, кнопки. */
	trailing?: React.ReactNode
}

function TextField<T extends FieldValues>({
	name,
	control,
	label,
	type = 'text',
	placeholder,
	autoComplete,
	disabled,
	required,
	className,
	trailing
}: TextFieldProps<T>): React.ReactElement {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={name}>{label}</FieldLabel>
					<div className='relative'>
						<Input
							id={name}
							type={type}
							className={cn(
								'text-[15px]',
								trailing && 'pr-10',
								className
							)}
							placeholder={placeholder}
							autoComplete={autoComplete}
							disabled={disabled}
							aria-invalid={fieldState.invalid}
							required={required}
							{...field}
						/>
						{trailing && (
							<div className='absolute inset-y-0 right-3 flex items-center'>
								{trailing}
							</div>
						)}
					</div>
					{fieldState.invalid && (
						<FieldError errors={[fieldState.error]} />
					)}
				</Field>
			)}
		/>
	)
}

export { TextField }
