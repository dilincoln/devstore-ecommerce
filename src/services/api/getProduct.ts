import { api } from '@/data/api'
import { Product } from '@/data/types/product'

export async function getProduct(slug: string): Promise<Product> {
  const response = await api(`products/${slug}`, {
    next: {
      revalidate: 60 * 60,
      tags: [`GET:products/${slug}`],
    },
  })

  const products = await response.json()

  return products
}
