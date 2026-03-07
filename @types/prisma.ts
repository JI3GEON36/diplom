import { ProductItem, Product, Flavor } from "@prisma/client";

export type ProductWithRelations = Product & {items: ProductItem[], flavors?: Flavor[]}