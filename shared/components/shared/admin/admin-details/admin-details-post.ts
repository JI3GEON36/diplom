import { Flavor, ProductItem } from "@prisma/client";

interface ProductFlavorInput {
  flavorId: number
  imageUrl: string
}

export interface reqPostProducts {
    name: string,
    imageUrl:string,
    categoryId:number,
    items:ProductItem[],
    flavors:ProductFlavorInput[]
}