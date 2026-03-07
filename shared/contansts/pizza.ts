export const mapWeightSize = {
    500:'500 грамм',
    1000:'1000 грамм',
    2000:'2000 грамм'
} as const

export const mapProductType = {
    1:'Порошковый',
    2:'Капсулы',
} as const

export const ProductSizes = Object.entries(mapWeightSize).map(([value,name]) => ({
    name,
    value
}))


export const ProductTypes = Object.entries(mapProductType).map(([value,name]) => ({
    name,
    value
}))

export type ProductSize = keyof typeof mapWeightSize;
export type ProductType = keyof typeof mapProductType;