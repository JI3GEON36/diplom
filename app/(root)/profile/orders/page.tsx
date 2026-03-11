'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { Eye } from 'lucide-react'
import { OrderDto } from '@/shared/services/dto/admin/orders.dto'
import { Api } from '@/shared/services/api-client'

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<OrderDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Api.ordersUser.getAll()
      .then(setOrders)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-6">Загрузка...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Мои заказы</h1>
      
      {orders.length === 0 ? (
        <p className="text-gray-500">У вас пока нет заказов</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">№</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сумма</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Детали</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.totalAmount} ₽</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'SUCCEEDED' ? 'bg-green-100 text-green-800' :
                      order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status === 'PENDING' ? 'Ожидает оплаты' :
                       order.status === 'SUCCEEDED' ? 'Оплачен' : 'Отменён'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/profile/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}