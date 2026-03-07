import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'
import findOrCreateCard from "@/shared/lib/find-or-create-cart";
import { createCartItemValue } from "@/shared/services/dto/cart.dto";
import updateCartTotalAmount from "@/shared/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
    try {   
        const token = req.cookies.get('token')?.value

        if(!token) {
            return NextResponse.json({totalAmount:0, items:[]})
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR:[
                    {token}
                ]
            },
            include:{
                items:{
                    orderBy:{
                        createdAt:'desc'
                    },
                    include:{
                        productItem:{
                            include:{
                                product:true
                            }
                        }
                    }
                }
            }
        })

        return NextResponse.json(userCart)
    } catch (error) {
         console.log('[CART_GET] server error', error)
        return NextResponse.json({message:'Не удалось получить корзину'}, {status:500});
    }

}

export async function POST(req:NextRequest) {
    try {
        let token = req.cookies.get('token')?.value

        if(!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCard(token)

        const data = (await req.json()) as createCartItemValue

        const findCartItem = await prisma.cartItem.findFirst({
            where:{
                cartId:userCart.id,
                productItemId:data.productItemId,
                flavorId:data.productFlavorId
            }
        })
        // если товар в корзине найден
        if(findCartItem) {
            await prisma.cartItem.update({
                where:{
                    id:findCartItem.id
                },
                data:{
                    quantity:findCartItem.quantity + 1
                }
            })
        } else {
              await prisma.cartItem.create({
            data:{
                cartId:userCart.id,
                productItemId:data.productItemId,
                flavorId:data.productFlavorId,
                quantity:1,
            }
        })
        }

        const updatedUserCart = await updateCartTotalAmount(token)
        
        const resp = NextResponse.json(updatedUserCart)
        resp.cookies.set('token', token)
        return resp

    } catch (error) {
        console.log('[CART_POST] server error', error)
        return NextResponse.json({message:'Не удалось отправить корзину'}, {status:500});
    }
}