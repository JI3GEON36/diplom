import { ProductItem } from "@prisma/client";
import calcTotalPizzaPrice from "./calc-total-pizza-price";
import { mapProductType, mapWeightSize, ProductSize, ProductType } from "../contansts/pizza";

const getPizzaDetails = (    
    items:ProductItem[], 
    type:ProductType,
    size:ProductSize,
) => {
    const textDetailts = `${size} см, ${mapWeightSize[size]} ${mapProductType[type]} пицца`;
    const totalPrice = calcTotalPizzaPrice(items,type,size);

    return {totalPrice, textDetailts}
}

export default getPizzaDetails