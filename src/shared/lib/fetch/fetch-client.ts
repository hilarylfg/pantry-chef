import { FetchError } from './fetch-error'
import type { RequestOptions, TypeSearchParams } from './fetch-types'

const JSON_CONTENT_TYPE: string = 'application/json'

export class FetchClient {
	private readonly baseUrl: string
	public headers?: Record<string, string>
	public params?: TypeSearchParams
	public options?: RequestOptions

	public constructor(init: {
		baseUrl: string
		headers?: Record<string, string>
		params?: TypeSearchParams
		options?: RequestOptions
	}) {
		this.baseUrl = init.baseUrl
		this.headers = init.headers
		this.params = init.params
		this.options = init.options
	}

	private createSearchParams(params: TypeSearchParams): string {
		const searchParams = new URLSearchParams()

		for (const key in { ...this.params, ...params }) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				const value = params[key]

				if (Array.isArray(value)) {
					value.forEach(currentValue => {
						if (currentValue) {
							searchParams.append(key, currentValue.toString())
						}
					})
				} else if (value) {
					searchParams.set(key, value.toString())
				}
			}
		}

		return `?${searchParams.toString()}`
	}

	private async parseErrorResponse(response: Response): Promise<string> {
		try {
			const error = (await response.json()) as
				{ message?: string } | undefined

			return error?.message || response.statusText
		} catch {
			return response.statusText
		}
	}

	private buildJsonConfig(
		body: Record<string, unknown> | undefined,
		options: RequestOptions
	): RequestOptions {
		return {
			...options,
			headers: {
				'Content-Type': JSON_CONTENT_TYPE,
				...(options?.headers || {})
			},
			...(!!body && { body: JSON.stringify(body) })
		}
	}

	private async request<T>(
		endpoint: string,
		method: RequestInit['method'],
		options: RequestOptions = {}
	): Promise<T> {
		let url = `${this.baseUrl}/${endpoint}`

		if (options.params) {
			url += this.createSearchParams(options.params)
		}

		const config: RequestInit = {
			...options,
			...(!!this.options && { ...this.options }),
			method,
			headers: {
				...(!!options?.headers && options.headers),
				...this.headers
			}
		}

		const response: Response = await fetch(url, config)

		if (!response.ok) {
			throw new FetchError(
				response.status,
				await this.parseErrorResponse(response)
			)
		}

		if (response.headers.get('Content-Type')?.includes(JSON_CONTENT_TYPE)) {
			return (await response.json()) as unknown as T
		}

		return (await response.text()) as unknown as T
	}

	public get<T>(
		endpoint: string,
		options: Omit<RequestOptions, 'body'> = {}
	): Promise<T> {
		return this.request<T>(endpoint, 'GET', options)
	}

	public post<T>(
		endpoint: string,
		body?: Record<string, unknown>,
		options: RequestOptions = {}
	): Promise<T> {
		return this.request<T>(
			endpoint,
			'POST',
			this.buildJsonConfig(body, options)
		)
	}

	public put<T>(
		endpoint: string,
		body?: Record<string, unknown>,
		options: RequestOptions = {}
	): Promise<T> {
		return this.request<T>(
			endpoint,
			'PUT',
			this.buildJsonConfig(body, options)
		)
	}

	public delete<T>(
		endpoint: string,
		options: Omit<RequestOptions, 'body'> = {}
	): Promise<T> {
		return this.request<T>(endpoint, 'DELETE', options)
	}

	public patch<T>(
		endpoint: string,
		body?: Record<string, unknown>,
		options: RequestOptions = {}
	): Promise<T> {
		return this.request<T>(
			endpoint,
			'PATCH',
			this.buildJsonConfig(body, options)
		)
	}
}
