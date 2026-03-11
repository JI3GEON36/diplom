import { cn } from "@/shared/lib/utils";
import * as CartItem from './cart-item-details'
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";


interface Props extends CartItemProps {
    className?:string;
    onClickCountButton?:(type:'plus' | 'minus') => void
    onClickRemove?: () => void

}

const CartDrawerItem:React.FC<Props> = ({ 
  imageUrl,
  name,
  price,
  disabled,
  quantity,
  onClickCountButton,
  onClickRemove,
  details,
  className,
  flavor
}
) => {
    return (

    <div className={cn('flex bg-white p-5 gap-6', {
        'opacity-50 pointer-events-none' : disabled
    },className)}>
       <CartItem.Image src={flavor?.imageUrl || imageUrl} />
       
       <div className="flex-1">
        <CartItem.Info flavor={flavor} details={details} name={name}/>

        <hr className="my-3"/>

            <div className="flex items-center justify-between">
                <CountButton value={quantity} onClick={onClickCountButton} />

                <div className="flex items-center gap-3">
                    <CartItem.Price value={price}/>
                    <Trash2Icon 
                    onClick={onClickRemove}
                    className="text-gray-400 cursor-pointer hover:text-gray-600"
                    size={16}
                    />
                </div>
            </div>
       </div>
    </div>
)
}

export default CartDrawerItem;