import { ProductItem } from "@prisma/client";
import { ProductType } from "../contansts/pizza";
import { ProductSizes } from "../contansts/pizza";
import { Variant } from "../components/shared/group-variants";

const getAvailablePizzSize = (items:ProductItem[], type:ProductType,):Variant[] => {
    const filteredPizzasByType = items.filter((item) => item.type == type)

    return ProductSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) == Number(item.value))
    }))
}

export default getAvailablePizzSize;