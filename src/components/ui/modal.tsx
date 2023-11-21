'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react'

interface ModalProps {
  children: React.ReactNode
}

export function Modal({ children }: ModalProps) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss],
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto backdrop-brightness-[.3]"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute bg-zinc-950 rounded-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
      >
        <div className="flex justify-end px-6 mt-6">
          <X className="cursor-pointer" onClick={onDismiss} />
        </div>
        {children}
      </div>
    </div>
  )
}
