import { Calendar, Plus, ScanLine } from 'lucide-react'
import { type ReactElement } from 'react'

export function QuickActions(): ReactElement {
	return (
		<div className='flex gap-4'>
			<div className='flex h-22.5 w-full flex-col items-center justify-center gap-1 rounded-lg border border-border bg-surface'>
				<div className='flex size-10 items-center justify-center rounded-lg bg-accent-soft'>
					<ScanLine className='size-5 text-primary' />
				</div>
				<h2 className='text-[11px] font-extrabold'>Сканер</h2>
			</div>
			<div className='flex h-22.5 w-full flex-col items-center justify-center gap-1 rounded-lg border border-border bg-surface'>
				<div className='flex size-10 items-center justify-center rounded-lg bg-accent-soft'>
					<Plus className='size-5 text-primary' />
				</div>
				<h2 className='text-[11px] font-extrabold'>Добавить</h2>
			</div>
			<div className='flex h-22.5 w-full flex-col items-center justify-center gap-1 rounded-lg border border-border bg-surface'>
				<div className='flex size-10 items-center justify-center rounded-lg bg-accent-soft'>
					<Calendar className='size-5 text-primary' />
				</div>
				<h2 className='text-[11px] font-extrabold'>План</h2>
			</div>
		</div>
	)
}
