import { notFound } from 'next/navigation'
import { Api } from '@/shared/services/api-client'
import { OrderItems } from '../_components/OrderItems'
import { OrderStatus } from '../_components/OrderStatus'

export default async function OrderPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const idIntoNum = Number(id)

  try {
    const order = await Api.orders.getById(idIntoNum)

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Заказ №{order.id}</h1>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Информация о заказе</h2>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-600">Статус:</dt>
                <dd><OrderStatus status={order.status} orderId={order.id} /></dd>
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
            <h2 className="text-lg font-semibold mb-4">Клиент</h2>
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
              {order.comment && (
                <div className="flex justify-between">
                  <dt className="text-gray-600">Комментарий:</dt>
                  <dd>{order.comment}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Состав заказа</h2>
          <OrderItems items={order.items} />
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}