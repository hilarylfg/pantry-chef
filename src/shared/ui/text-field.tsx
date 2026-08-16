'use client'

import * as React from 'react'
import {
	type Control,
	Controller,
	type FieldValues,
	type Path
} from 'react-hook-form'

import { cn, Field, FieldError, FieldLabel, Input } from '@/shared'

interface TextFieldProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
	label: string
	type?: React.InputHTMLAttributes<HTMLInputElement>['type']
	placeholder?: string
	disabled?: boolean
	required?: boolean
	className?: string
}

function TextField<T extends FieldValues>({
	name,
	control,
	label,
	type = 'text',
	placeholder,
	disabled,
	required,
	className
}: TextFieldProps<T>): React.ReactElement {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={name}>{label}</FieldLabel>
					<Input
						id={name}
						type={type}
						className={cn('text-[15px]', className)}
						placeholder={placeholder}
						disabled={disabled}
						aria-invalid={fieldState.invalid}
						required={required}
						{...field}
					/>
					{fieldState.invalid && (
						<FieldError errors={[fieldState.error]} />
					)}
				</Field>
			)}
		/>
	)
}

export { TextField }
