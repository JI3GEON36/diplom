import React from "react"
import qs from "qs";
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter()
    React.useEffect(() => {
        const params = {
            ...filters.prices,
            types:Array.from(filters.types),
            sizes: Array.from(filters.sizes),
        }

        const query = (qs.stringify(params, {
            arrayFormat:'comma'
        }))

        router.push(`?${query}`, {
            scroll:false
        })
    }, [filters])
}


