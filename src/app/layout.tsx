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

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={cn(
				'antialiased',
				nunito.variable,
				'font-sans',
				jebrainsMono.variable
			)}
		>
			<head>
				<meta name='apple-mobile-web-app-title' content='PantryChef' />
				<title>PantryChef</title>
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
