export interface OrderDto {
  id: number
  userId: number | null
  token: string
  totalAmount: number
  status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED'
  paymentId: string | null
  items: any
  fullName: string
  email: string
  phone: string
  address: string
  comment: string | null
  createdAt: string
  updatedAt: string
}

export interface UpdateOrderStatusDto {
  status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED'
}