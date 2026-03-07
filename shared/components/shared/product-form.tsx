'use client'

import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";
import { ProductWithRelations } from "@/@types/prisma";
import ChoosePizzaForm from "./choose-pizza-form";
import ChooseProductForm from "./choose-product-form";

interface Props {
    onSubmit?:VoidFunction
    product:ProductWithRelations
}

const ProductForm:React.FC<Props> = ({product, onSubmit}) => {

    const [addCartItem, loading] = useCartStore(useShallow((state) => [state.addCartItem, state.loading]));
    const firstItem = product.items[0]
    const isProteinForm = Boolean(firstItem.type)

    const onAddProduct = () => {
    try{
      addCartItem({
      productItemId:firstItem.id
      })
      toast.success('товар добавлен в корзину')
      onSubmit?.()
    } catch (e) {
      toast.error('не удалось добавить товар в корзину')
      console.log(e)
    }
    }
    
    const onAddPizza = async (productItemId:number, productFlavorId:number) => {
     try {
     await addCartItem({
      productItemId,
      productFlavorId
      })
      toast.success('Пицца успешно добавлена в корзину')
      onSubmit?.()
     } catch(e) {
      toast.error('не удалось добавить пиццу в корзину')
      console.log(e)
     }
    }

  if(isProteinForm) {
    return (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name} 
            items={product.items}
            flavors={product.flavors}
            loading={loading}
            onSubmit={onAddPizza} 
            />
    )
  }   else {
        return (
            <ChooseProductForm 
            price={firstItem.price}
            imageUrl={product.imageUrl}  
            name={product.name}
            onSubmit={onAddProduct}
            loading={loading}
            />
        )
    }
}

export default ProductForm