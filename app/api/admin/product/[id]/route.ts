import { prisma } from "@/prisma/prisma-client";
import { reqPostProducts } from "@/shared/components/shared/admin/admin-details/admin-details-post";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest, {params}: {params:Promise<{id:string}>}) {
    const {id} = await params
    const idIntoNum = Number(id)

    const body = await req.json() as reqPostProducts

    const updated = await prisma.$transaction(async(tx) => {
        await tx.product.update({
            where:{
                id:idIntoNum
            },
            data:{
                name:body.name,
                imageUrl:body.imageUrl,
                categoryId:body.categoryId
            }
        })

        await tx.productItem.deleteMany({
            where:{
                productId:idIntoNum
            }
        })

        if(body.items?.length) {
            await tx.productItem.createMany({
                data:body.items.map((item) => ({
                    ...item,
                    productId:idIntoNum
                }))
            })
        }

        await tx.productFlavor.deleteMany({
            where:{
                productId:idIntoNum
            }
        })

        if(body.flavors?.length) {
            await tx.productFlavor.createMany({
                data:body.flavors.map((fl) => ({
                    productId:idIntoNum,
                    imageUrl:fl.imageUrl,
                    flavorId:fl.flavorId
                }))
            })
        }

        return tx.product.findUnique({
            where:{
                id:idIntoNum
            },
            include:{
                items:true,
                flavors:{
                    include:{
                        flavor:true
                    }
                }
            }
        })
    })

    return NextResponse.json(updated)
}


export async function DELETE(req:NextRequest, {params}: {params:Promise<{id:string}>}) {
    const {id} = await params
    const idIntoNum = Number(id)

    await prisma.$transaction([
        prisma.productItem.deleteMany({where:{productId:idIntoNum}}),
        prisma.productFlavor.deleteMany({where:{productId:idIntoNum}}),
        prisma.product.deleteMany({where:{id:idIntoNum}})
    ])

    return NextResponse.json({success:true});
}

export async function GET(req:NextRequest, {params} :{params:Promise<{id:string}>}) {
  try {
    const {id} = await params
    const idIntoNumber = Number(id)

    const product = await prisma.product.findUnique({
      where: { id:idIntoNumber },
      include: {
        items: true,
        flavors: {
          include: { flavor: true }
        }
      }
    })

    if (!product) {
      return new Response('Not found', { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error(error)
    return new Response('Server error', { status: 500 })
  }
}