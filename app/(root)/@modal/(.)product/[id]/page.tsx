import { ChooseProductModal } from "@/shared/components/shared/modals/choose-product-modal";
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

export default async function ProductModalPage({params} : {params:Promise<{id:string}>}) {
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

  if (!product) {
    return notFound();
  }

  const convertProductFormat = {
    ...product,
    flavors: product.flavors.map(Fl => ({
      id: Fl.flavor.id,
      name:Fl.flavor.name,
      imageUrl:Fl.imageUrl,
      createdAt: Fl.flavor.createdAt,
      updatedAt:Fl.flavor.updatedAt
    }))
  }

    return (
        <ChooseProductModal product={convertProductFormat}/>
    )
}