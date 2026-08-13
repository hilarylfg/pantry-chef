import { FetchClient } from './fetch/fetch-client'

const DEFAULT_BASE_URL: string = '/api'

export const api = new FetchClient({
	baseUrl: process.env.NEXT_PUBLIC_SERVER_URL || DEFAULT_BASE_URL,
	options: {
		credentials: 'include'
	}
})
