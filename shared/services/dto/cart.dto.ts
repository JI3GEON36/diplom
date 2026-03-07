import { Cart, CartItem, Flavor, Product, ProductItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
    product:Product,
    },
    flavor:Flavor
}

export interface CartDTO extends Cart {
    items:CartItemDTO[]
}

export interface createCartItemValue {
    productItemId:number,
    productFlavorId:number
}