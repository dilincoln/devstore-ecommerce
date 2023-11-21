import { ProductInfo } from '@/components/product-info'
import { Modal } from '@/components/ui/modal'
import { getProduct } from '@/services/api/getProduct'
import Image from 'next/image'

interface InterceptProductPageProps {
  params: {
    slug: string
  }
}

export default async function InterceptProductPage({
  params,
}: InterceptProductPageProps) {
  const product = await getProduct(params.slug)

  return (
    <Modal>
      <div className="flex">
        <div className="relative w-96 overflow-hidden hover:overflow-visible">
          <div className="absolute bottom-0">
            <Image
              className="max-w-none transform hover:scale-110 transition duration-500 translate-x-[-35%] translate-y-[28%]"
              src={product.image}
              width={700}
              height={700}
              quality={100}
              alt={product.description}
            />
          </div>
        </div>

        <div className="max-w-[340px] mt-5 mb-10 mr-5 z-50">
          <ProductInfo product={product} />
        </div>
      </div>
    </Modal>
  )
}
