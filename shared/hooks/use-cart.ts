import React from "react"
import { useCartStore } from "../store/cart"
import { useShallow } from "zustand/shallow"
import { CartItem } from "@prisma/client"
import { createCartItemValue } from "../services/dto/cart.dto"
import { CartStateitem } from "../lib/get-cart-details"

type ReturnProps = {
    totalAmount:number,
    items:CartStateitem[],
    loading:boolean,
    updateItemQuantity:(id: number, quantity: number) => void
    removeCartItem:(id:number) => void
    addCartItem:(values: createCartItemValue) => void

}

export const useCart = (): ReturnProps => {
    const cartState = useCartStore((state) => state)

    React.useEffect(() => {
        cartState.fetchCartItems()
    }, [])

    return cartState
}