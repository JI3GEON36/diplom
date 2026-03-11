import { CategoryForm } from '../_components/CategoryForm'

export default function NewCategoryPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Создание категории</h1>
      <CategoryForm />
    </div>
  )
}