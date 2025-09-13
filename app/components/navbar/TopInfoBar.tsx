'use client'

import * as React from 'react';

const TopInfoBar = ({ onHeightChange }: { onHeightChange?: (h: number) => void }) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [hidden, setHidden] = React.useState(false)
  const lastY = React.useRef(0)

  // Detect scroll direction
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > lastY.current
      const threshold = 8 // small deadzone
      if (Math.abs(y - lastY.current) > threshold) {
        setHidden(goingDown && y > 24)
        lastY.current = y
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Report height so navbar can offset correctly
  React.useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(() => onHeightChange?.(ref.current?.offsetHeight || 0))
    ro.observe(ref.current)
    onHeightChange?.(ref.current.offsetHeight)
    return () => ro.disconnect()
  }, [onHeightChange])

  return (
    <div
      ref={ref}
      className={[
        'fixed inset-x-0 top-0 z-50 h-12 flex items-center justify-end gap-6 px-4 py-2 text-sm',
        'bg-neutral-100 text-neutral-500 ring-1 ring-amber-200/60 backdrop-blur',
        'transition-transform duration-200 will-change-transform',
        hidden ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
      role="region"
      aria-label="Contact info bar"
    >
      <a href="tel:+48123456789" className="hover:underline">123 456 789</a>
      <span aria-hidden>•</span>
      <a href="mailto:hello@renovation.co" className="hover:underline">hello@renovation.co</a>
    </div>
  )
}

export default TopInfoBar
