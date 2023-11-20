import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import data from '../data.json'

export async function GET(
  _: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = z.string().parse(params.slug)

  const product = data.products.find((product) => product.slug === slug)

  if (!product) {
    return NextResponse.json(
      {
        message: `Product with slug "${slug}" not found`,
      },
      {
        status: 400,
      },
    )
  }

  return NextResponse.json(product)
}
