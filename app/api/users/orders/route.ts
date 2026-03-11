import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function GET(req: NextRequest) {
  try {
    // 1. Берём токен из куки (он есть у всех — и у гостей, и у залогиненных)
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json([]) // нет токена — нет заказов
    }

    // 2. Ищем заказы по токену (он един для корзины и заказов)
    const orders = await prisma.order.findMany({
      where: { token },  // ← магия! userId не нужен
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('[USER_ORDERS_GET]', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}