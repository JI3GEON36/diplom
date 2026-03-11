'use client'

import { Button } from '@/shared/components/ui/button'
import { Api } from '@/shared/services/api-client'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Точно удалить категорию? Товары в этой категории останутся без категории.')) return

    try {
      await Api.categories.deleteCat(id)
      toast.success('Категория удалена')
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