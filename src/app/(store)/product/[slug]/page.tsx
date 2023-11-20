import { AddToCartButton } from '@/components/add-to-cart-button'
import { RevalidateCacheButton } from '@/components/revalidate-cache-button'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProductPageProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`products/${slug}`, {
    next: {
      revalidate: 60 * 60,
      tags: [`GET:products/${slug}`],
    },
  })

  const products = await response.json()

  return products
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  return (
    <div>
      <RevalidateCacheButton revalidateTag={`GET:products/${params.slug}`} />

      <div className="relative grid max-h-[860px] grid-cols-3">
        <div className="col-span-2 overflow-hidden">
          <Image
            src={product.image}
            width={1000}
            height={1000}
            quality={100}
            alt={product.description}
          />
        </div>

        <div className="flex flex-col justify-center px-12">
          <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

          <p className="mt-2 leading-relaxed text-zinc-400">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
              {product.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })}
            </span>
            <span className="text-sm text-zinc-400">
              in up to 12 interest-free installments of{' '}
              {(product.price / 12).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })}
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <span className="block font-semibold">Sizes</span>

            <div className="flex gap-2">
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
              >
                S
              </button>
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
              >
                M
              </button>
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
              >
                L
              </button>
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
              >
                XL
              </button>
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
              >
                XXL
              </button>
            </div>
          </div>

          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  )
}
