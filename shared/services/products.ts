import { Product } from "@prisma/client"
import { axiosInstance } from "./instance"


export const search = async(query:string): Promise<Product[]> => {
    const {data} = await axiosInstance.get<Product[]>('/products/search', {params: {query}})

    return data
}