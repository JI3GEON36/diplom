import { Cart, Flavor } from "@prisma/client"
import { CartDTO } from "../services/dto/cart.dto";
import calcCartItemTotalPrice from "./calc-cart-item-total-price";

export type CartStateitem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  size?: number | null;
  disabled:boolean,
  type?: number | null;
  flavor:Flavor 
};

interface ReturnProps {
    items:CartStateitem[];
    totalAmount:number
}

const getCartDetails = (data:CartDTO):ReturnProps => {
    const items = data.items.map((item) => ({
        id:item.id,
        quantity:item.quantity,
        name:item.productItem.product.name,
        imageUrl:item.productItem.product.imageUrl,
        price:calcCartItemTotalPrice(item),
        disabled:false,
        size:item.productItem.size,
        type:item.productItem.type,
        flavor:item.flavor
    }))
    return {
        items:items,
        totalAmount:data.totalAmount,
    }
}

export default getCartDetails