import { prisma } from "@/prisma/prisma-client";
import updateCartTotalAmount from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest, {params}:{params:Promise<{id:string}>}) {

    try {
        const {id} = await params
        const idIntoNum = Number(id)
        const data = (await req.json()) as {quantity:number};

        const token = req.cookies.get('token')?.value

        if(!token) {
            return NextResponse.json({error:'TOKEN not founded'});
        }

        const cartItem = await prisma.cartItem.findFirst({
            where:{
                id:idIntoNum
            }
        })

         if(!cartItem) {
            return NextResponse.json({error:'cartITEM not founded'});
        }

        await prisma.cartItem.update({
            where:{
                id:idIntoNum
            },
            data:{
                quantity:data.quantity
            }
        })

        const updatedUserCart = await updateCartTotalAmount(token)

        return NextResponse.json(updatedUserCart);

    } catch(error) {
        console.log('[CART_PATCH] server error', error)
        return NextResponse.json({message:'Не удалось обновить страницу'}, {status:500});
    }
}
export async function DELETE(req:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const {id} = await params
        const idIntoNum = Number(id)

        const token = req.cookies.get('token')?.value

        if(!token) {
            return NextResponse.json({error:'TOKEN not founded'});
        }

           const cartItem = await prisma.cartItem.findFirst({
            where:{
                id:idIntoNum
            }
        })

         if(!cartItem) {
            return NextResponse.json({error:'cartITEM not founded'});
        }

        await prisma.cartItem.delete({
            where:{
                id:idIntoNum
            }
        })

        
        const updatedUserCart = await updateCartTotalAmount(token)

        return NextResponse.json(updatedUserCart);
    } catch (error) {
        console.log('[CAR_PATCH] server error', error)
        return NextResponse.json({message:'Не удалось обновить страницу'}, {status:500});
    }

    
}

