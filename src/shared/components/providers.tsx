'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@teispace/next-themes'
import { PropsWithChildren, useState } from 'react'

import { Toaster } from '@/shared'

export function Providers({ children }: PropsWithChildren) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						refetchOnWindowFocus: false
					}
				}
			})
	)

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster />
				</ThemeProvider>
			</QueryClientProvider>
		</>
	)
}
