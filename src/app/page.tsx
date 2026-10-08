'use client'

import { CookingPot, House, Plus, Scan, ShoppingCart, User } from 'lucide-react'

import { useProfileInfo } from '@/entities/user'
import { LogoLoader } from '@/features/loader'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/shared'
import { Profile } from '@/widgets/profile'

const tabTriggerClass =
	'flex-col gap-1 data-active:[&_div]:bg-[color-mix(in_oklab,var(--primary),var(--surface)_84%)] data-active:[&_div_svg]:text-primary'

export default function Page() {
	const { user, isLoading } = useProfileInfo()

	return (
		<Tabs className='flex min-h-svh'>
			<LogoLoader isLoading={isLoading}>
				<TabsContent
					value='home'
					className='flex max-w-md min-w-0 flex-col gap-4 p-6 text-sm leading-loose'
				>
					{user && (
						<div className='mb-2 flex items-center gap-3'>
							<Avatar className='size-11'>
								<AvatarImage
									src={user.picture}
									alt={user.displayName}
									className=''
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className='leading-0'>
								<h2 className='text-lg font-medium'>
									Привет, {user.displayName}
								</h2>
								<span className='text-xs'>
									Что приготовим сегодня?
								</span>
							</div>
						</div>
					)}
					<div></div>
				</TabsContent>
				<TabsContent
					value='products'
					className='flex max-w-md min-w-0 flex-col gap-4 p-6 text-sm leading-loose'
				>
					<div className='flex items-center justify-between'>
						<div className='mb-2 flex flex-col gap-3'>
							<h2 className='text-2xl font-semibold'>Продукты</h2>
							<span className='text-xs text-muted-foreground'>
								24 продукта · обновлено сегодня
							</span>
						</div>
						<Button size='icon-lg' variant='secondary'>
							<Plus className='size-5' />
						</Button>
					</div>
				</TabsContent>
				<TabsContent value='scan'>52</TabsContent>
				<TabsContent value='list'>52</TabsContent>
				<TabsContent
					value='profile'
					className='flex max-w-md min-w-0 flex-col gap-4 p-6 text-sm leading-loose'
				>
					<Profile />
				</TabsContent>
			</LogoLoader>
			<TabsList className='m-0 h-auto! w-full rounded-none px-3 pt-3 pb-5'>
				<TabsTrigger value='home' className={tabTriggerClass}>
					<div className='rounded-sm px-3 py-1.5'>
						<House />
					</div>
					<span>Главная</span>
				</TabsTrigger>
				<TabsTrigger value='products' className={tabTriggerClass}>
					<div className='rounded-sm px-3 py-1.5'>
						<CookingPot />
					</div>
					<span>Продукты</span>
				</TabsTrigger>
				<TabsTrigger
					value='scan'
					className='-mt-12 size-15 flex-[0_0_auto] flex-col rounded-full bg-[linear-gradient(148deg,color-mix(in_oklab,var(--primary),var(--cream)_16%),var(--primary)_52%,color-mix(in_oklab,var(--primary),var(--coal)_22%))] data-active:[&_svg]:text-foreground'
				>
					<Scan className='size-6 text-background' />
				</TabsTrigger>
				<TabsTrigger value='list' className={tabTriggerClass}>
					<div className='rounded-sm px-3 py-1.5'>
						<ShoppingCart />
					</div>
					<span>Список</span>
				</TabsTrigger>
				<TabsTrigger value='profile' className={tabTriggerClass}>
					<div className='rounded-sm px-3 py-1.5'>
						<User />
					</div>
					<span>Профиль</span>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
