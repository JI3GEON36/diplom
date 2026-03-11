import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const orderId = Number(id)
    const token = req.cookies.get('token')?.value

    if (!token) {
      return new Response('Unauthorized', { status: 401 })
    }

    const order = await prisma.order.findFirst({
      where: { 
        id: orderId,
        token  // ← проверяем, что заказ принадлежит этому токену
      }
    })

    if (!order) {
      return new Response('Order not found', { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('[USER_ORDER_GET]', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}