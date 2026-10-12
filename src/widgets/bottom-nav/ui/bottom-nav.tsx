import { CookingPot, House, Scan, ShoppingCart, User } from 'lucide-react'
import { type ReactElement } from 'react'

import { TabsList, TabsTrigger } from '@/shared'

const tabTriggerClass =
	'flex-col gap-1 data-active:[&_div]:bg-[color-mix(in_oklab,var(--primary),var(--surface)_84%)] data-active:[&_div_svg]:text-primary'

export function BottomNav(): ReactElement {
	return (
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
	)
}
