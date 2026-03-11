'use client'

import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Api } from '@/shared/services/api-client'

const statuses = [
  { value: 'PENDING', label: 'Ожидает оплаты' },
  { value: 'SUCCEEDED', label: 'Оплачен' },
  { value: 'CANCELLED', label: 'Отменён' }
]

export const OrderStatus = ({ status, orderId }: { status: string; orderId: number }) => {
  const [currentStatus, setCurrentStatus] = useState(status)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true)
    try {
      await Api.orders.updateStatus(orderId, { status: newStatus as any })
      setCurrentStatus(newStatus)
      toast.success('Статус обновлён')
      router.refresh()
    } catch {
      toast.error('Ошибка при обновлении')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange} disabled={loading}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map(s => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}