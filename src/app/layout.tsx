import type { Metadata } from 'next'
import { JetBrains_Mono, Nunito } from 'next/font/google'

import { cn, Providers } from '@/shared'

import './globals.css'

const nunito = Nunito({
	subsets: ['latin'],
	variable: '--font-sans'
})

const jebrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono'
})

export const metadata: Metadata = {
	title: 'PantryChef',
	appleWebApp: {
		title: 'PantryChef'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='ru'
			suppressHydrationWarning
			className={cn(
				'antialiased',
				nunito.variable,
				'font-sans',
				jebrainsMono.variable
			)}
		>
			<body className='bg-coal-deep md:flex md:min-h-dvh md:items-center md:justify-center'>
				<Providers>
					<div className='relative min-h-svh w-full bg-background md:h-[min(100dvh,956px)] md:min-h-0 md:w-[min(calc(100dvh*1320/2868),440px)] md:overflow-y-auto md:overscroll-contain md:shadow-lg md:ring-1 md:ring-border'>
						{children}
					</div>
				</Providers>
			</body>
		</html>
	)
}
