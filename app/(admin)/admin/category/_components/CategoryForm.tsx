'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Api } from '@/shared/services/api-client'

const formSchema = z.object({
  name: z.string().min(2, 'Название должно содержать минимум 2 символа')
})

type FormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
  initialData?: { id: number; name: string }
  onSuccess?: () => void
}

export const CategoryForm = ({ initialData, onSuccess }: CategoryFormProps) => {
  const router = useRouter()
  const isEditing = !!initialData

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || ''
    }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEditing && initialData) {
        await Api.categories.updateCat(initialData.id, data)
        toast.success('Категория обновлена')
      } else {
        await Api.categories.createCat(data)
        toast.success('Категория создана')
      }
      
      router.push('/admin/category')
      router.refresh()
      onSuccess?.()
    } catch (error) {
      toast.error('Ошибка при сохранении')
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название категории</FormLabel>
              <FormControl>
                <Input placeholder="Протеины" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
          >
            Отмена
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting 
              ? 'Сохранение...' 
              : isEditing ? 'Сохранить' : 'Создать'
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}