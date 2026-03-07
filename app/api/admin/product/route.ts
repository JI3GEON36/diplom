import { prisma } from "@/prisma/prisma-client";
import { reqPostProducts } from "@/shared/components/shared/admin/admin-details/admin-details-post";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const products = await prisma.product.findMany({
        include:{
            category:true,
            items:true,
            flavors:{
                include:{
                    flavor:true
                }
            }
        },
        orderBy:{createdAt:'desc'}
    })

    return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
    
    const body = await req.json() as reqPostProducts

    const product = await prisma.$transaction(async(tx) => {
        const created = await tx.product.create({
            data:{
               name:body.name,
               imageUrl:body.imageUrl,
               categoryId:body.categoryId 
            }
        })

        if(body.items?.length) {
            await tx.productItem.createMany({
                data:body.items.map((item) => ({
                    ...item,
                    productId:created.id
                }))
            })
        }


        if(body.flavors?.length) {
        await tx.productFlavor.createMany({
            data:body.flavors.map((fl) => ({
                flavorId:fl.flavorId,
                imageUrl:fl.imageUrl,
                productId:created.id

            }))
            
        })
        }

        return created
    })

    return NextResponse.json(product)
}