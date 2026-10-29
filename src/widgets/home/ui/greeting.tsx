import { type ReactElement } from 'react'

import { type IUser } from '@/entities/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared'

interface Props {
	user: IUser
}

export function Greeting({ user }: Props): ReactElement {
	return (
		<div className='mb-2 flex items-center gap-3'>
			<Avatar className='size-11'>
				<AvatarImage src={user.picture} alt={user.displayName} />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div className='leading-0'>
				<h2 className='text-lg font-medium'>
					Привет, {user.displayName}
				</h2>
				<span className='text-xs'>Что приготовим сегодня?</span>
			</div>
		</div>
	)
}
