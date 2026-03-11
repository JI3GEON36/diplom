'use client'

import { useEffect, useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import { Api } from '@/shared/services/api-client'
import { OrderDto } from '@/shared/services/dto/admin/orders.dto'
import { OrderItems } from '@/app/(admin)/admin/orders/_components/OrderItems'


export default function UserOrderPage() {
  const { id } = useParams()
  const [order, setOrder] = useState<OrderDto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Api.ordersUser.getById(Number(id))
      .then(setOrder)
      .catch(() => setOrder(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="p-6">Загрузка...</div>
  if (!order) return notFound()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Заказ №{order.id}</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Информация о заказе</h2>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">Статус:</dt>
              <dd>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'SUCCEEDED' ? 'bg-green-100 text-green-800' :
                  order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status === 'PENDING' ? 'Ожидает оплаты' :
                   order.status === 'SUCCEEDED' ? 'Оплачен' : 'Отменён'}
                </span>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Сумма:</dt>
              <dd className="font-bold">{order.totalAmount} ₽</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Дата:</dt>
              <dd>{new Date(order.createdAt).toLocaleString()}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Доставка</h2>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">Имя:</dt>
              <dd>{order.fullName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Email:</dt>
              <dd>{order.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Телефон:</dt>
              <dd>{order.phone}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Адрес:</dt>
              <dd>{order.address}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Состав заказа</h2>
        <OrderItems items={order.items} />
      </div>
    </div>
  )
}