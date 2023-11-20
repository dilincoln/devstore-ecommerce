import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CartItem {
  productId: number
  quantity: number
}

interface ICartStore {
  items: CartItem[]
  addItem: (productId: number) => void
}

export const useCartStore = create<ICartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId: number) => {
        const products = get().items

        const productIsAlreadyInCart = products.some(
          (item) => item.productId === productId,
        )

        if (productIsAlreadyInCart) {
          set({
            items: products.map((product) => {
              if (product.productId === productId) {
                return {
                  ...product,
                  quantity: product.quantity + 1,
                }
              }

              return product
            }),
          })
        } else {
          set({
            items: [...products, { productId, quantity: 1 }],
          })
        }
      },
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => ({
        getItem: (name) => JSON.parse(atob(localStorage.getItem(name) || '')),
        setItem: (name, value) =>
          localStorage.setItem(name, btoa(JSON.stringify(value))),
        removeItem: localStorage.removeItem,
      })),
    },
  ),
)
