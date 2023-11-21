import { api } from '@/data/api'
import { Product } from '@/data/types/product'

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('products/featured', {
    next: {
      revalidate: 60 * 60,
      tags: ['GET:products/featured'],
    },
  })

  const products = await response.json()

  return products
}
