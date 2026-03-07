'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/shared/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

import { create, updatePr } from '@/shared/services/admin/products'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Plus, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { ProductWithRelations } from '@/shared/services/dto/admin/product.dto'
import { formSchema, FormValues } from './schemas/schema'

// Схема валидации


interface ProductFormProps {
  product?: ProductWithRelations
  categories?: { id: number; name: string }[]
  allFlavors?: { id: number; name: string; imageUrl: string }[]
}

export const ProductForm = ({ 
  product, 
  categories = [],
  allFlavors = []
}: ProductFormProps) => {
  const router = useRouter()
  const isEditing = !!product

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      imageUrl: product?.imageUrl || '',
      categoryId: product?.categoryId || 0,
      items: product?.items.map(item => ({
        size: item.size || 0,
        type: item.type || 0,
        price: item.price
      })) || [{ size: 500, type: 1, price: 1000 }],
      flavors: product?.flavors.map(flavor => ({
        flavorId: flavor.id,
        imageUrl: flavor.imageUrl || ''
      })) || []
    }
  })

  const { fields: itemFields, append: appendItem, remove: removeItem } = useFieldArray({
    control: form.control,
    name: 'items'
  })

  const { fields: flavorFields, append: appendFlavor, remove: removeFlavor } = useFieldArray({
    control: form.control,
    name: 'flavors'
  })

  const onSubmit = async (data: FormValues) => {
    try {
       console.log('📤 SENDING DATA:', JSON.stringify(data, null, 2))
      if (isEditing && product) {
        await updatePr(product.id, data)
        toast.success('Продукт обновлён')
      } else {
        await create(data)
        toast.success('Продукт создан')
      }
      router.push('/admin/')
      router.refresh()
    } catch (error) {
      toast.error('Ошибка при сохранении')
      console.error('❌ ERROR:', error)
    }
  }

  // Заглушка для категорий и вкусов, если не переданы
  useEffect(() => {
    if (!categories.length) {
      // TODO: загрузить категории
    }
    if (!allFlavors.length) {
      // TODO: загрузить вкусы
    }
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Основная информация */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold">Основное</h2>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Протеин 3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Картинка (URL)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категория</FormLabel>
                <Select 
                  onValueChange={(val) => field.onChange(Number(val))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Размеры/типы */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Размеры и типы</h2>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => appendItem({ size: 500, type: 1, price: 1000 })}
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить размер
            </Button>
          </div>

          {itemFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start border p-4 rounded">
              <FormField
                control={form.control}
                name={`items.${index}.size`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Размер (г)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="500" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`items.${index}.type`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Тип (1/2)</FormLabel>
                    <Select 
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Тип" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Порошковый</SelectItem>
                        <SelectItem value="2">Капсулы</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`items.${index}.price`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Цена (₽)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1000" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                className="mt-8"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Вкусы */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Вкусы</h2>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => appendFlavor({ flavorId: 1, imageUrl: '' })}
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить вкус
            </Button>
          </div>

          {flavorFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start border p-4 rounded">
              <FormField
                control={form.control}
                name={`flavors.${index}.flavorId`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Вкус</FormLabel>
                    <Select 
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите вкус" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allFlavors.map(flavor => (
                          <SelectItem key={flavor.id} value={flavor.id.toString()}>
                            {flavor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`flavors.${index}.imageUrl`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Картинка вкуса (URL)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://..." 
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                className="mt-8"
                onClick={() => removeFlavor(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Кнопки */}
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