'use client'

import { useCartStore } from '@/stores/cart'

interface AddToCartButtonProps {
  productId: number
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <button
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white hover:scale-105 transition-transform duration-500"
      onClick={() => addItem(productId)}
    >
      Add to cart
    </button>
  )
}
