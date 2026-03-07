import React from "react"
import { ProductSize, ProductType } from "../contansts/pizza"
import getAvailablePizzSize from "../lib/get-available-pizza-sizes"
import { Flavor, ProductItem } from "@prisma/client"
import { Variant } from "../components/shared/group-variants"

interface ReturnProps {
    size:ProductSize,
    type:ProductType,
    currentItemId?:number,
    availableSizes:Variant[],
    setSize:(size:ProductSize) => void,
    setType:(type:ProductType) => void,
    selectedFlavor: Flavor | null,
    setSelectedFlavor: (flavor: Flavor) => void
}

const usePizzaOptions = (items:ProductItem[], flavors:Flavor[]):ReturnProps => {
    const [size,setSize] = React.useState<ProductSize>(500)
    const [type,setType] = React.useState<ProductType>(1)
    const [selectedFlavor, setSelectedFlavor] = React.useState<Flavor | null>(null)
    const availableSizes = getAvailablePizzSize(items,type)
    const currentItemId = items.find((item) => item.type === type && item.size === size)?.id;

  React.useEffect(() => {
        const isAvailableSize = availableSizes.find((item) => Number(item.value) == size && !item.disabled)

        const availableSize = availableSizes?.find((item) => !item.disabled)

        if(!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as ProductSize)
        }

        if(flavors.length && !selectedFlavor) {
            setSelectedFlavor(flavors[0])
        }

    }, [type])

    return {
        size:size,
        type,
        setSize,
        setType,
        availableSizes,
        currentItemId, 
        selectedFlavor,
        setSelectedFlavor 
    }
}

export default usePizzaOptions;