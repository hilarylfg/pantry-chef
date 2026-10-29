'use client'

import {
	Calendar,
	ChevronRight,
	ClockAlert,
	Plus,
	RotateCw,
	ScanLine
} from 'lucide-react'

import { useRecommendationsRecipes } from '@/entities/recipe'
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
import { useExpiringProducts, useProducts } from '@/widgets/products'
import { Profile } from '@/widgets/profile'

export default function Page() {
	const { user, isLoading } = useProfileInfo()
	const { products } = useProducts()
	const { expiringProducts } = useExpiringProducts()
	const { recommendationsRecipes } = useRecommendationsRecipes()

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
					{expiringProducts && products && (
						<div className='flex w-full gap-3 rounded-lg bg-[color-mix(in_oklab,var(--late),var(--surface)_88%)] p-4'>
							<div className='my-auto flex size-10 items-center justify-center rounded-lg bg-[color-mix(in_oklab,var(--late),var(--surface)_76%)]'>
								<ClockAlert className='size-5 text-[color-mix(in_oklab,var(--late),var(--foreground)_20%)]' />
							</div>
							<div className=''>
								<p className='font-extrabold'>
									{expiringProducts.length} продукта просят
									внимания
								</p>
								<div className='flex gap-2'>
									{expiringProducts
										.slice(0, 1)
										.map(product => (
											<p
												key={product.id}
												className='w-fit rounded-lg border-border bg-surface px-2 py-1 text-[11px] font-bold text-muted-foreground'
											>
												{product.name}
											</p>
										))}
									{expiringProducts.length > 1 && (
										<p className='w-fit rounded-lg border-border bg-surface px-2 py-1 text-[11px] font-bold text-muted-foreground'>
											{expiringProducts.length - 1}+
										</p>
									)}
								</div>
							</div>
							<div className='ml-auto flex items-center'>
								<ChevronRight className='size-4 text-[color-mix(in_oklab,var(--late),var(--foreground)_20%)]' />
							</div>
						</div>
					)}
					<div className='flex gap-4'>
						<div className='flex h-22.5 w-full flex-col items-center justify-center gap-1 rounded-lg border border-border bg-surface'>
							<div className='flex size-10 items-center justify-center rounded-lg bg-accent-soft'>
								<ScanLine className='size-5 text-primary' />
							</div>
							<h2 className='text-[11px] font-extrabold'>
								Сканер
							</h2>
						</div>
						<div className='flex h-22.5 w-full flex-col items-center justify-center gap-1 rounded-lg border border-border bg-surface'>
							<div className='flex size-10 items-center justify-center rounded-lg bg-accent-soft'>
								<Plus className='size-5 text-primary' />
							</div>
							<h2 className='text-[11px] font-extrabold'>
								Добавить
							</h2>
						</div>
						<div className='flex h-22.5 w-full flex-col items-center justify-center gap-1 rounded-lg border border-border bg-surface'>
							<div className='flex size-10 items-center justify-center rounded-lg bg-accent-soft'>
								<Calendar className='size-5 text-primary' />
							</div>
							<h2 className='text-[11px] font-extrabold'>План</h2>
						</div>
					</div>
					<div className='flex justify-between text-[11px] font-extrabold tracking-wider text-muted-foreground'>
						<h1 className='uppercase'>Что приготовить сегодня?</h1>
						<p className='font-mono'>из ваших</p>
					</div>
					<div className='flex flex-col gap-3'>
						{recommendationsRecipes &&
							recommendationsRecipes?.map(recipe => (
								<div
									key={recipe.id}
									className='flex items-center gap-3 rounded-lg border border-border bg-surface p-3'
								>
									<div className='size-14 shrink-0 rounded-lg bg-amber-700'></div>
									<div>
										<h2 className='leading-5'>
											{recipe.title}
										</h2>
										<div className='flex flex-wrap gap-3 text-xs text-muted-foreground'>
											<span className='font-mono font-bold'>
												{recipe.totalTimeMinutes} мин
											</span>
											<p>
												{recipe.match.matched} из{' '}
												{recipe.match.total} ваших
											</p>
											{recipe.saves
												.slice(0, 1)
												.map(save => (
													<div
														key={save.productId}
														className='inline-flex items-center rounded-xl bg-[color-mix(in_oklab,var(--late),var(--surface)_84%)] px-3 py-1 text-[11px] font-extrabold text-[color-mix(in_oklab,var(--late),var(--foreground)_20%)]'
													>
														{save.name}
													</div>
												))}
											{recipe.saves.length > 1 && (
												<p className='inline-flex w-fit items-center rounded-xl bg-[color-mix(in_oklab,var(--late),var(--surface)_84%)] px-3 py-1 text-[11px] font-extrabold text-[color-mix(in_oklab,var(--late),var(--foreground)_20%)]'>
													{recipe.saves.length - 1}+
												</p>
											)}
										</div>
									</div>
									<div className='ml-auto flex text-muted-foreground'>
										<Button
											variant='ghost'
											className='px-1.5'
										>
											<RotateCw className='size-4' />
										</Button>
									</div>
								</div>
							))}
					</div>
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
