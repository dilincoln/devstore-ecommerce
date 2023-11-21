'use client'

import { useStore } from '@/hooks/useStore'
import { useCartStore } from '@/stores/cart'
import { ShoppingBag } from 'lucide-react'

export function CartWidget() {
  const itemsLength = useStore(useCartStore, (state) =>
    state.items.reduce((acc, product) => acc + product.quantity, 0),
  )

  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="h-4 w-4" />
      <span className="text-sm">Cart ({itemsLength})</span>
    </div>
  )
}
