import { notFound } from 'next/navigation'
import { CategoryForm } from '../_components/CategoryForm'
import { Api } from '@/shared/services/api-client'

export default async function EditCategoryPage({params}:{params:Promise<{id:string}>}) {
  const { id } = await params
  const idIntoNum = Number(id)
  
  try {
    const category = await Api.categories.getById(idIntoNum)
    
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Редактирование категории</h1>
        <CategoryForm initialData={category} />
      </div>
    )
  } catch (error) {
     console.error('Ошибка загрузки категории:', error)
     notFound()
  }
}