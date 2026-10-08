'use server'

import webpush from 'web-push'

type WebPushSubscription = {
	endpoint: string
	keys: {
		p256dh: string
		auth: string
	}
}

webpush.setVapidDetails(
	'mailto:your-email@example.com',
	process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
	process.env.VAPID_PRIVATE_KEY!
)

let subscription: WebPushSubscription | null = null

export async function subscribeUser(sub: WebPushSubscription) {
	subscription = sub
	// Store in DB: await db.subscription.create({ data: sub })
	return { success: true }
}

export async function unsubscribeUser() {
	subscription = null
	// Remove from DB...
	return { success: true }
}

export async function sendNotification(message: string) {
	if (!subscription) {
		throw new Error('No subscription available')
	}

	try {
		await webpush.sendNotification(
			subscription, // Now matches the expected type
			JSON.stringify({
				title: 'Test Notification',
				body: message,
				icon: '/icon.png'
			})
		)
		return { success: true }
	} catch (error) {
		console.error('Error sending push notification:', error)
		return { success: false, error: 'Failed to send notification' }
	}
}
