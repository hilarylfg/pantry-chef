'use client'

import { useEffect, useRef, useState } from 'react'

export function useMinDuration(active: boolean, minDurationMs = 1500): boolean {
	const [visible, setVisible] = useState(active)
	const activatedAtRef = useRef(0)

	useEffect(() => {
		if (active) {
			activatedAtRef.current = Date.now()
			// через rAF, а не синхронно в теле эффекта — иначе каскад рендеров
			const show = requestAnimationFrame(() => setVisible(true))
			return () => cancelAnimationFrame(show)
		}

		const elapsed = Date.now() - activatedAtRef.current
		const remaining = Math.max(0, minDurationMs - elapsed)
		const timeout = setTimeout(() => setVisible(false), remaining)
		return () => clearTimeout(timeout)
	}, [active, minDurationMs])

	return visible
}
