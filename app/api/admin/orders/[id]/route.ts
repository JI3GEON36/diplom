import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const orderId = Number(id)

    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!order) {
      return new Response('Order not found', { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('[ORDER_GET]', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const orderId = Number(id)
    const { status } = await req.json()

    if (!['PENDING', 'SUCCEEDED', 'CANCELLED'].includes(status)) {
      return new Response('Invalid status', { status: 400 })
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('[ORDER_PATCH]', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const orderId = Number(id)

    await prisma.order.delete({
      where: { id: orderId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[ORDER_DELETE]', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}