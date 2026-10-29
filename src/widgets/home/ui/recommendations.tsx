import { RotateCw } from 'lucide-react'
import { type ReactElement } from 'react'

import { useRecommendationsRecipes } from '@/entities/recipe'
import { Button } from '@/shared'

export function Recommendations(): ReactElement {
	const { recommendationsRecipes } = useRecommendationsRecipes()

	return (
		<>
			<div className='flex justify-between text-[11px] font-extrabold tracking-wider text-muted-foreground'>
				<h1 className='uppercase'>Что приготовить сегодня?</h1>
				<p className='font-mono'>из ваших</p>
			</div>
			<div className='flex flex-col gap-3'>
				{recommendationsRecipes?.map(recipe => (
					<div
						key={recipe.id}
						className='flex items-center gap-3 rounded-lg border border-border bg-surface p-3'
					>
						<div className='size-14 shrink-0 rounded-lg bg-amber-700'></div>
						<div>
							<h2 className='leading-5'>{recipe.title}</h2>
							<div className='flex flex-wrap gap-3 text-xs text-muted-foreground'>
								<span className='font-mono font-bold'>
									{recipe.totalTimeMinutes} мин
								</span>
								<p>
									{recipe.match.matched} из {recipe.match.total} ваших
								</p>
								{recipe.saves.slice(0, 1).map(save => (
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
								aria-label='Обновить подборку'
							>
								<RotateCw className='size-4' />
							</Button>
						</div>
					</div>
				))}
			</div>
		</>
	)
}
