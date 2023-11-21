'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

interface ModalProps {
  children: React.ReactNode
}

export function Modal({ children }: ModalProps) {
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss()
      }
    },
    [onDismiss],
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto backdrop-brightness-[.3]">
      <div className="absolute bg-zinc-950 rounded-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex relative z-40 justify-end px-6 mt-6">
          <X className="cursor-pointer" onClick={onDismiss} />
        </div>
        {children}
      </div>
    </div>
  )
}
