import { z } from 'zod'


export const formSchema = z.object({
  name: z.string().min(2, 'Название минимум 2 символа'),
  imageUrl: z.string().url('Введите корректный URL'),
  categoryId: z.number().min(1, 'Выберите категорию'),
  items: z.array(z.object({
    size: z.number().min(1, 'Размер обязателен'),
    type: z.number().min(1, 'Тип обязателен'),
    price: z.number().min(1, 'Цена обязательна'),
  })).min(1, 'Добавьте хотя бы один размер'),
  flavors: z.array(z.object({
    flavorId: z.number().min(1, 'Выберите вкус'),
    imageUrl: z.string().url('Введите URL картинки').optional().nullable(),
  }))
})


export type FormValues = z.infer<typeof formSchema>