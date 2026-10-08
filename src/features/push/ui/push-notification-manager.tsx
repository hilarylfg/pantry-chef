'use client'

import { usePushManager } from '../model/use-push-manager'

export function PushNotificationManager() {
	const {
		isSupported,
		subscription,
		message,
		setMessage,
		subscribeToPush,
		unsubscribeFromPush,
		sendTestNotification
	} = usePushManager()

	if (!isSupported) {
		return <p>Push notifications are not supported in this browser.</p>
	}

	return (
		<div>
			<h3>Push Notifications</h3>
			{subscription ? (
				<>
					<p>You are subscribed to push notifications.</p>
					<button onClick={unsubscribeFromPush}>Unsubscribe</button>
					<input
						type='text'
						placeholder='Enter notification message'
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
					<button onClick={sendTestNotification}>Send Test</button>
				</>
			) : (
				<>
					<p>You are not subscribed to push notifications.</p>
					<button onClick={subscribeToPush}>Subscribe</button>
				</>
			)}
		</div>
	)
}
