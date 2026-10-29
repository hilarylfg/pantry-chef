'use client'

import { useProfileInfo } from '@/entities/user'
import { LogoLoader } from '@/features/loader'
import { Tabs, TabsContent } from '@/shared'
import { BottomNav } from '@/widgets/bottom-nav'
import { Home } from '@/widgets/home'
import { ProductsScreen } from '@/widgets/products'
import { Profile } from '@/widgets/profile'

export default function Page() {
	const { user, isLoading } = useProfileInfo()

	return (
		<Tabs className='flex min-h-svh'>
			<LogoLoader isLoading={isLoading}>
				<TabsContent
					value='home'
					className='flex max-w-md min-w-0 flex-col gap-4 p-6 text-sm leading-loose'
				>
					<Home user={user} />
				</TabsContent>
				<TabsContent
					value='products'
					className='flex max-w-md min-w-0 flex-col gap-4 p-6 text-sm leading-loose'
				>
					<ProductsScreen />
				</TabsContent>
				<TabsContent value='scan' />
				<TabsContent value='list' />
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
