import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dto/admin/categories.dto'
import { axiosInstance, axiosServerInstance } from '../instance'


  export const getAll = async (): Promise<CategoryDto[]> => {
    const { data } = await axiosServerInstance.get<CategoryDto[]>('/admin/category')
    return data
  }

  export const getById = async (id: number): Promise<CategoryDto> => {
    const { data } = await axiosServerInstance.get<CategoryDto>(`/admin/category/${id}`)
    return data
  }

  export const createCat = async (dto: CreateCategoryDto): Promise<CategoryDto> => {
    const { data } = await axiosInstance.post<CategoryDto>('/admin/category', dto)
    return data
  }

  export const updateCat = async (id: number, dto: UpdateCategoryDto): Promise<CategoryDto> => {
    const { data } = await axiosInstance.put<CategoryDto>(`/admin/category/${id}`, dto)
    return data
  }

  export const deleteCat = async (id: number): Promise<{ success: boolean }> => {
    const { data } = await axiosInstance.delete(`/admin/category/${id}`)
    return data
  }
