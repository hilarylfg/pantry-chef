import { useProfileInfo } from '@/entities/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared'

export function ProfileStats() {
	const { user } = useProfileInfo()

	return (
		<div className='flex flex-col items-center gap-3'>
			<Avatar className='size-22'>
				<AvatarImage
					src={user.picture}
					alt={user.displayName}
					className=''
				/>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div className='flex flex-col items-center gap-1'>
				<h2 className='text-xl font-bold'>{user.displayName}</h2>
				<p className='text-muted-foreground'>{user.email}</p>
			</div>
		</div>
	)
}
