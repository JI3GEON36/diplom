import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('[ORDERS_GET]', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}