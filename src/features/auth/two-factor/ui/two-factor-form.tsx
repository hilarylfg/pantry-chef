'use client'

import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { type ReactElement, useState } from 'react'

import {
	type TwoFactorCredentials,
	useLoginMutation,
	useTwoFactorMutation
} from '@/features/auth'
import {
	Field,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	OTP_LENGTH
} from '@/shared'

export function TwoFactorForm({
	email,
	password
}: TwoFactorCredentials): ReactElement {
	const [code, setCode] = useState('')
	const { verify } = useTwoFactorMutation(email, password)
	const { login } = useLoginMutation()

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
					onComplete={() => verify(code)}
					onChange={value => setCode(value)}
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
					className='text-primary cursor-pointer'
					onClick={() => login({ email, password })}
				>
					Отправить ещё раз
				</button>
			</span>
		</div>
	)
}
