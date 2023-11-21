import { ProductInfo } from '@/components/product-info'
import { RevalidateCacheButton } from '@/components/ui/revalidate-cache-button'
import { getFeaturedProducts } from '@/services/api/getFeaturedProducts'
import { getProduct } from '@/services/api/getProduct'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProductPageProps {
  params: {
    slug: string
  }
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
  const products = await getFeaturedProducts()

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

        <div className="flex justify-center px-12">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  )
}
