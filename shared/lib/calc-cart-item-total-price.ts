import { CartItemDTO } from "../services/dto/cart.dto";

const calcCartItemTotalPrice = (item:CartItemDTO): number => {

    return (item.productItem.price) * item.quantity
}

export default calcCartItemTotalPrice;