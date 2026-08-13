'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@teispace/next-themes'
import { type PropsWithChildren, type ReactElement, useState } from 'react'

import { STALE_TIME_MS } from '../lib/app-constants'
import { Toaster } from '../ui/toast'

export function Providers({ children }: PropsWithChildren): ReactElement {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: STALE_TIME_MS,
						refetchOnWindowFocus: false
					}
				}
			})
	)

	return (
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
	)
}
