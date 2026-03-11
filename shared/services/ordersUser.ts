import { OrderDto } from './dto/admin/orders.dto'
import { axiosInstance, axiosServerInstance } from './instance'

 export const getAll = async (): Promise<OrderDto[]> => {
    const { data } = await axiosInstance.get<OrderDto[]>('/users/orders')
    return data
  }
 export const getById = async (id: number): Promise<OrderDto> => {
    const { data } = await axiosInstance.get<OrderDto>(`/users/orders/${id}`)
    return data
  }
