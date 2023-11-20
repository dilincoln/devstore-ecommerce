import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import data from '../data.json'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const query = z.string().parse(searchParams.get('q'))

  const products = data.products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  )

  return NextResponse.json(products)
}
