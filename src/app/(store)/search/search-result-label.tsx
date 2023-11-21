'use client'

import { useSearchParams } from 'next/navigation'

export function SearchResultLabel() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  return (
    <p className="text-sm">
      Results for: <span className="font-semibold">&quot;{query}&quot;</span>
    </p>
  )
}
