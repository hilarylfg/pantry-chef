'use client'

import { Plus } from 'lucide-react'
import { useEffect } from 'react'

import { useProfileInfo } from '@/entities/user'
import { LogoLoader } from '@/features/loader'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Tabs,
	TabsContent
} from '@/shared'
import { BottomNav } from '@/widgets/bottom-nav'
import { useProducts } from '@/widgets/products'
import { Profile } from '@/widgets/profile'

export default function Page() {
	const { user, isLoading } = useProfileInfo()
	const { products } = useProducts()

	useEffect(() => {
		console.log(products)
	}, [products])

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
					{products && (
						<div className='flex w-full rounded-lg bg-secondary p-4'>
							<div></div>
							<div>
								<p>продукта просят внимания</p>
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
			<BottomNav />
		</Tabs>
	)
}
