import { Api } from '@/shared/services/api-client'
import { ProductForm } from '../_components/ProductForm'


export default async function NewProductPage() {
  const [categories, flavors] = await Promise.all([
    Api.products.getCategory(),
    Api.products.getFlavor()
  ])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Создание продукта</h1>
      <ProductForm 
        categories={categories}
        allFlavors={flavors}
      />
    </div>
  )
}