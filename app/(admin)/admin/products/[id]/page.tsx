import { notFound } from 'next/navigation'
import { Api } from '@/shared/services/api-client'
import { ProductForm } from '../_components/ProductForm'

export default async function EditProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params 
  const idIntoNum = Number(id)

  try {
    const [product, categories, flavors] = await Promise.all([
      Api.products.getById(idIntoNum),
      Api.products.getCategory(),
      Api.products.getFlavor()
    ])

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Редактирование: {product.name}</h1>
        <ProductForm 
          product={product}
          allFlavors={flavors}
          categories={categories}
        />
      </div>
    )
  } catch {
    notFound()
  }
}