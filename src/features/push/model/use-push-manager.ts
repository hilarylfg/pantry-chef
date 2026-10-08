'use client'

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

import {
	sendNotification,
	subscribeUser,
	unsubscribeUser
} from '../api/push.actions'
import { urlBase64ToUint8Array } from '../lib/url-base64-to-uint8-array'

function subscribeToNothing() {
	return () => {}
}

function isPushSupported(): boolean {
	return 'serviceWorker' in navigator && 'PushManager' in window
}

export function usePushManager() {
	const isSupported = useSyncExternalStore(
		subscribeToNothing,
		isPushSupported,
		() => false
	)

	const [subscription, setSubscription] = useState<PushSubscription | null>(
		null
	)
	const [message, setMessage] = useState('')

	useEffect(() => {
		if (!isSupported) {
			return
		}

		let cancelled = false

		navigator.serviceWorker
			.register('/sw.js', {
				scope: '/',
				updateViaCache: 'none'
			})
			.then(registration => registration.pushManager.getSubscription())
			.then(sub => {
				if (!cancelled) {
					setSubscription(sub)
				}
			})
			.catch(console.error)

		return () => {
			cancelled = true
		}
	}, [isSupported])

	const subscribeToPush = useCallback(async () => {
		const registration = await navigator.serviceWorker.ready
		const sub = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(
				process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
			)
		})
		setSubscription(sub)
		await subscribeUser(JSON.parse(JSON.stringify(sub)))
	}, [])

	const unsubscribeFromPush = useCallback(async () => {
		await subscription?.unsubscribe()
		setSubscription(null)
		await unsubscribeUser()
	}, [subscription])

	const sendTestNotification = useCallback(async () => {
		if (subscription) {
			await sendNotification(message)
			setMessage('')
		}
	}, [subscription, message])

	return {
		isSupported,
		subscription,
		message,
		setMessage,
		subscribeToPush,
		unsubscribeFromPush,
		sendTestNotification
	}
}
