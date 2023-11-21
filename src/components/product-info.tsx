import { Product } from '@/data/types/product'
import { AddToCartButton } from './ui/add-to-cart-button'

export function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="flex flex-col justify-center">
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
          12 monthly installments of{' '}
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
  )
}
