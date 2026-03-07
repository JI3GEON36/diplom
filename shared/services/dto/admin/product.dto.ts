export interface CreateProductItemDto {
  size: number
  type: number
  price: number
}

export interface CreateProductFlavorDto {
  flavorId: number
  imageUrl?: string | null
}

export interface CreateProductDto {
  name: string
  imageUrl: string
  categoryId: number
  items: CreateProductItemDto[]
  flavors: CreateProductFlavorDto[]
}

export interface UpdateProductDto extends CreateProductDto {}

export interface ProductWithRelations {
  id: number
  name: string
  imageUrl: string
  categoryId: number
  category: { id: number; name: string }
  items: Array<{
    id: number
    size: number | null
    type: number | null
    price: number
  }>
  flavors: Array<{
    id: number
    imageUrl: string | null
    flavor: {
      id: number
      name: string
      imageUrl: string
    }
  }>
}