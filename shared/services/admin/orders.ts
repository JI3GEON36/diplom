import { OrderDto, UpdateOrderStatusDto } from '../dto/admin/orders.dto'
import { axiosInstance, axiosServerInstance } from '../instance'

  export const getAll = async (): Promise<OrderDto[]> => {
    const { data } = await axiosServerInstance.get<OrderDto[]>('/admin/orders')
    return data
  }

  export const getById = async (id: number): Promise<OrderDto> => {
    const { data } = await axiosServerInstance.get<OrderDto>(`/admin/orders/${id}`)
    return data
  }


  export const updateStatus = async (id: number, dto: UpdateOrderStatusDto): Promise<OrderDto> => {
    const { data } = await axiosInstance.patch<OrderDto>(`/admin/orders/${id}`, dto)
    return data
  }


  export const deleteOrder = async (id: number): Promise<{ success: boolean }> => {
    const { data } = await axiosInstance.delete(`/admin/orders/${id}`)
    return data
  }
