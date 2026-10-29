'use client'

import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useRouter } from 'next/navigation'
import { type ReactElement, useState } from 'react'

import {
	Field,
	HOME_PATH,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	OTP_LENGTH,
	toast
} from '@/shared'

import { useLogin } from '../../login'
import { AUTH_MESSAGES } from '../../model/auth-messages'
import type { TwoFactorCredentials } from '../../model/auth.types'
import { useTwoFactor } from '../model/use-two-factor'

export function TwoFactorForm({
	email,
	password
}: TwoFactorCredentials): ReactElement {
	const [code, setCode] = useState('')
	const router = useRouter()
	const { verify } = useTwoFactor(email, password)
	const { login } = useLogin()

	const onVerifyComplete = (value: string): void => {
		verify(value, {
			onSuccess: () => {
				toast.add({ type: 'success', title: AUTH_MESSAGES.welcome })
				router.push(HOME_PATH)
			},
			// Ошибка уже показана глобальным обработчиком — здесь только
			// сбрасываем поле, чтобы ввести код заново
			onError: () => setCode('')
		})
	}

	const onResend = (): void => {
		login(
			{ email, password },
			{
				onSuccess: data => {
					if ('message' in data) {
						toast.add({
							type: 'info',
							title: AUTH_MESSAGES.codeResent
						})
					} else {
						toast.add({
							type: 'success',
							title: AUTH_MESSAGES.welcome
						})
						router.push(HOME_PATH)
					}
				}
			}
		)
	}

	return (
		<div className='flex flex-col gap-5'>
			<Field className='w-full'>
				<InputOTP
					className='w-full'
					containerClassName='w-full'
					id='digits-only'
					maxLength={OTP_LENGTH}
					value={code}
					pattern={REGEXP_ONLY_DIGITS}
					onComplete={onVerifyComplete}
					onChange={setCode}
				>
					<InputOTPGroup>
						{Array.from({ length: OTP_LENGTH }, (_, index) => (
							<InputOTPSlot key={index} index={index} />
						))}
					</InputOTPGroup>
				</InputOTP>
			</Field>
			<span className='flex justify-center gap-1 text-sm'>
				Не пришёл код?
				<button
					className='cursor-pointer text-primary'
					onClick={onResend}
				>
					Отправить ещё раз
				</button>
			</span>
		</div>
	)
}
