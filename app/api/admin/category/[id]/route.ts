import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const categoryId = Number(id)

    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return new Response('Category not found', { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORY_GET]', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const categoryId = Number(id)
    const { name } = await req.json()

    const updated = await prisma.category.update({
      where: { id: categoryId },
      data: { name }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('[CATEGORY_PUT]', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params
    const categoryId = Number(id)

    await prisma.category.delete({
      where: { id: categoryId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[CATEGORY_DELETE]', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}