import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const category = await prisma.category.findMany({
        orderBy:{
            name:'desc'
        }
    })


    return NextResponse.json(category)
}

export async function POST(req: Request) {
  try {
     const { name } = await req.json()

    if (!name || name.trim().length < 2) {
      return new Response('Name must be at least 2 characters', { status: 400 })
    }

    const category = await prisma.category.create({
      data: { name: name.trim() }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORY_POST]', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}