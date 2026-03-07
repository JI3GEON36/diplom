import { ProductItem } from "@prisma/client";
import { ProductSize, ProductType } from "../contansts/pizza";


const calcTotalPizzaPrice = (
    items:ProductItem[], 
    type:ProductType,
    size:ProductSize,
) => {
    const pizzaPrice = items.find((item) => item.type == type && item.size == size)?.price || 0;
    
    return pizzaPrice;
}

export default calcTotalPizzaPrice