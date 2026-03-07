import { useSearchParams } from "next/navigation"
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
    priceFrom?:number,
    priceTo?:number,
}

interface QueryFilters extends PriceProps{
    sizes:string
    types:string
}

export interface Filters {
    sizes: Set<string>,
    types: Set<string>,
    prices: PriceProps,

}

interface ReturnProps extends Filters {
    setPrices:(name: keyof PriceProps, value: number) => void
    setPizzaTypes:(value:string) => void
    setSizes:(value:string) => void
}

export const useFilters = ():ReturnProps  => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

    const [sizes, {toggle:toggleSizes}] = useSet(
        new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : [])
    )

    const [types, {toggle:togglePizzaTypes}] = useSet(
        new Set<string>(searchParams.has('types') ? searchParams.get('types')?.split(',') : [])
    )
    
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    })

    function updatePrice (name: keyof PriceProps, value:number) {
        setPrices(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return React.useMemo(
        () => ({
            sizes:sizes,
            types:types,
            prices:prices,
            setPrices: updatePrice,
            setPizzaTypes:togglePizzaTypes,
            setSizes:toggleSizes,
        }),
        [sizes,types,prices]
    )
}