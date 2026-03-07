import Container from "@/shared/components/shared/container"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"
import ProductForm from "@/shared/components/shared/product-form"

export default async function ProductPage({params} : {params:Promise<{id:string}>}) {
    const {id} = await params

    const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      items: true,
      flavors:{
        include:{
          flavor:true
        }
      }
    },
  });

    if(!product) {
        return notFound()
    }
    const formattedProduct = {
    ...product,
    flavors: product.flavors.map(F => ({
      id: F.flavor.id,
      name:F.flavor.name,
      imageUrl:F.imageUrl,
      createdAt: F.flavor.createdAt,
      updatedAt:F.flavor.updatedAt
    }))
  }
    return (
        <Container className="flex flex-col my-10">
            <ProductForm product={formattedProduct}/>
        </Container>
    )
}