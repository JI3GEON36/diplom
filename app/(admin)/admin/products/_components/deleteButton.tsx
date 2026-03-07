'use client'

import { Button } from '@/shared/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deletePr } from '@/shared/services/admin/products'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Точно удалить?')) return

    try {
      await deletePr(id)
      toast.success('Удалено')
      router.refresh()
    } catch (error) {
      toast.error('Ошибка при удалении')
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}