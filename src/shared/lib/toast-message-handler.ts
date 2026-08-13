import { toast } from '@/shared'

export function toastMessageHandler(error: Error) {
	if (error.message) {
		const errorMessage = error.message
		const firstDotIndex = errorMessage.indexOf('.')

		if (firstDotIndex !== -1) {
			toast.add({
				type: 'error',
				title: errorMessage.slice(0, firstDotIndex),
				description: errorMessage.slice(firstDotIndex + 1)
			})
		} else {
			toast.add({
				type: 'error',
				title: errorMessage
			})
		}
	} else {
		toast.add({
			type: 'error',
			title: 'Ошибка со стороны сервера'
		})
	}
}
