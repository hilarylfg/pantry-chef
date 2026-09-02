'use client'

import {
	CookingPot,
	House,
	Refrigerator,
	Scan,
	ScanBarcode,
	ShoppingCart,
	User
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { sendNotification, subscribeUser, unsubscribeUser } from '@/app/actions'
import { useProfileInfo } from '@/entities/user'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/shared'
import { Profile } from '@/widgets/profile'

function urlBase64ToUint8Array(base64String: string) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
	const base64 = (base64String + padding)
		.replace(/-/g, '+')
		.replace(/_/g, '/')

	const rawData = window.atob(base64)
	const outputArray = new Uint8Array(rawData.length)

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i)
	}
	return outputArray
}

function PushNotificationManager() {
	const [isSupported, setIsSupported] = useState(false)
	const [subscription, setSubscription] = useState<PushSubscription | null>(
		null
	)
	const [message, setMessage] = useState('')

	useEffect(() => {
		if ('serviceWorker' in navigator && 'PushManager' in window) {
			setIsSupported(true)
			registerServiceWorker()
		}
	}, [])

	async function registerServiceWorker() {
		const registration = await navigator.serviceWorker.register('/sw.js', {
			scope: '/',
			updateViaCache: 'none'
		})
		const sub = await registration.pushManager.getSubscription()
		setSubscription(sub)
	}

	async function subscribeToPush() {
		const registration = await navigator.serviceWorker.ready
		const sub = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(
				process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
			)
		})
		setSubscription(sub)
		const serializedSub = JSON.parse(JSON.stringify(sub))
		await subscribeUser(serializedSub)
	}

	async function unsubscribeFromPush() {
		await subscription?.unsubscribe()
		setSubscription(null)
		await unsubscribeUser()
	}

	async function sendTestNotification() {
		if (subscription) {
			await sendNotification(message)
			setMessage('')
		}
	}

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

function InstallPrompt() {
	const [isIOS, setIsIOS] = useState(false)
	const [isStandalone, setIsStandalone] = useState(false)

	useEffect(() => {
		setIsIOS(
			/iPad|iPhone|iPod/.test(navigator.userAgent) &&
				!(window as any).MSStream
		)

		setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
	}, [])

	if (isStandalone) {
		return null // Don't show install button if already installed
	}

	return (
		<div>
			<h3>Install App</h3>
			<button>Add to Home Screen</button>
			{isIOS && (
				<p>
					To install this app on your iOS device, tap the share button
					<span role='img' aria-label='share icon'>
						{' '}
						⎋{' '}
					</span>
					and then &#34;Add to Home Screen&#34;
					<span role='img' aria-label='plus icon'>
						{' '}
						➕{' '}
					</span>
					.
				</p>
			)}
		</div>
	)
}

export default function Page() {
	const { user } = useProfileInfo()

	return (
		<Tabs className='flex min-h-svh'>
			<TabsContent
				value='home'
				className='flex max-w-md min-w-0 flex-col gap-4 p-6 text-sm leading-loose'
			>
				{user && (
					<div className='mb-2 flex items-center gap-3'>
						<Avatar className='size-11'>
							<AvatarImage
								src={user.picture}
								alt={user.displayName}
								className=''
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className='leading-0'>
							<h2 className='text-lg font-medium'>
								Привет, {user.displayName}
							</h2>
							<span className='text-xs'>
								Что приготовим сегодня?
							</span>
						</div>
					</div>
				)}
				<PushNotificationManager />
				<InstallPrompt />
			</TabsContent>
			<TabsContent value='products'>52</TabsContent>
			<TabsContent value='scan'>52</TabsContent>
			<TabsContent value='list'>52</TabsContent>
			<TabsContent
				value='profile'
				className='flex max-w-md min-w-0 flex-col gap-4 p-6 text-sm leading-loose'
			>
				<Profile />
			</TabsContent>
			<TabsList className='m-0 !h-auto w-full rounded-none px-3 pt-3 pb-5'>
				<TabsTrigger
					value='home'
					className='flex-col gap-1 data-active:[&_div]:bg-[color-mix(in_oklab,var(--primary),var(--surface)_84%)] data-active:[&_div_svg]:text-primary'
				>
					<div className='rounded-sm px-3 py-1.5'>
						<House />
					</div>
					<span>Главная</span>
				</TabsTrigger>
				<TabsTrigger
					value='products'
					className='flex-col gap-1 data-active:[&_div]:bg-[color-mix(in_oklab,var(--primary),var(--surface)_84%)] data-active:[&_div_svg]:text-primary'
				>
					<div className='rounded-sm px-3 py-1.5'>
						<CookingPot />
					</div>
					<span>Продукты</span>
				</TabsTrigger>
				<TabsTrigger
					value='scan'
					className='-mt-12 size-15 flex-[0_0_auto] flex-col rounded-full bg-[linear-gradient(148deg,color-mix(in_oklab,var(--primary),var(--cream)_16%),var(--primary)_52%,color-mix(in_oklab,var(--primary),var(--coal)_22%))] data-active:[&_svg]:text-foreground'
				>
					<Scan className='size-6 text-background' />
				</TabsTrigger>
				<TabsTrigger
					value='list'
					className='flex-col gap-1 data-active:[&_div]:bg-[color-mix(in_oklab,var(--primary),var(--surface)_84%)] data-active:[&_div_svg]:text-primary'
				>
					<div className='rounded-sm px-3 py-1.5'>
						<ShoppingCart />
					</div>
					<span>Список</span>
				</TabsTrigger>
				<TabsTrigger
					value='profile'
					className='flex-col gap-1 data-active:[&_div]:bg-[color-mix(in_oklab,var(--primary),var(--surface)_84%)] data-active:[&_div_svg]:text-primary'
				>
					<div className='rounded-sm px-3 py-1.5'>
						<User />
					</div>
					<span>Профиль</span>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
