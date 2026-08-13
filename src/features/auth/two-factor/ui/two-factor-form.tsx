'use client'

import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useState } from 'react'

import {
	useLoginMutation
} from '@/features/auth'
import { useTwoFactorMutation } from '@/features/auth/two-factor/model/use-two-factor-mutation'
import {
	Field,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/shared'

export interface TwoFactorCredentials {
	email: string
	password: string
}

export function TwoFactorForm({ email, password }: TwoFactorCredentials) {
	const [code, setCode] = useState('')
	const { verify, isLoadingVerify } = useTwoFactorMutation(email, password)
	const { login } = useLoginMutation()

	return (
		<div className='flex flex-col gap-5'>
			<Field className='w-full'>
				<InputOTP
					className='w-full'
					containerClassName='w-full'
					id='digits-only'
					maxLength={6}
					value={code}
					pattern={REGEXP_ONLY_DIGITS}
					onComplete={() => verify(code)}
					onChange={value => setCode(value)}
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
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
