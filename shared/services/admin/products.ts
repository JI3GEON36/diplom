import { axiosInstance, axiosServerInstance } from '../instance'
import { 
  CreateProductDto, 
  UpdateProductDto, 
  ProductWithRelations 
} from '../dto/admin/product.dto'
import { Category, Flavor } from '@prisma/client'

  export const getAll = async (): Promise<ProductWithRelations[]> => {
    const { data } = await axiosServerInstance.get<ProductWithRelations[]>('/admin/product/')
    return data
  }

  // Получить один продукт по ID
  export const getById = async (id: number): Promise<ProductWithRelations> => {
    const { data } = await axiosServerInstance.get<ProductWithRelations>(`/admin/product/${id}`)
    return data
  }

  // Создать продукт
  export const create = async (dto: CreateProductDto): Promise<ProductWithRelations> => {
    const { data } = await axiosInstance.post<ProductWithRelations>('/admin/product', dto)
    return data
  }

  // Обновить продукт
  export const updatePr = async (id: number, dto: UpdateProductDto): Promise<ProductWithRelations> => {
    const { data } = await axiosInstance.put<ProductWithRelations>(`/admin/product/${id}`, dto)
    return data
  }

  // Удалить продукт
  export const deletePr = async (id: number): Promise<{ success: true }> => {
    const { data } = await axiosInstance.delete(`/admin/product/${id}`)
    return data
  }

  export const getFlavor = async():Promise<Flavor[]> => {
    const {data} = await axiosServerInstance.get<Flavor[]>('admin/flavors')

   return data
  }

  export const getCategory = async():Promise<Category[]> => {
    const {data} = await axiosServerInstance.get<Category[]>('admin/category')

    return data
  }