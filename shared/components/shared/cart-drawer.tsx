import Image from 'next/image'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CartDrawerItem from './cart-drawer-item';
import getCartItemDetails from '@/shared/lib/get-cart-item-details';
import { ProductSize, ProductType } from '@/shared/contansts/pizza';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { useCart } from '@/shared/hooks/use-cart';

interface Props {
    className?:string;
    children:React.ReactNode;
}

const CartDrawer:React.FC<Props> = ({children}) => {
    
    const {totalAmount, items, updateItemQuantity, removeCartItem } = useCart();
    

    const onClickCountButton = (id:number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type == 'plus' ? quantity + 1 : quantity - 1

        updateItemQuantity(id,newQuantity)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
            <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
             {totalAmount > 0 && (
                <>
                <SheetHeader>
                    <SheetTitle>В корзине <span className='font-bold'>{items.length}</span></SheetTitle>
                </SheetHeader>
                </>
             )}

             {!totalAmount && (
                <div className='flex flex-col items-center justify-center w-72 mx-auto'>
                    <Image src="/assets/images/empty-box.png" alt='Empty cart' width={120} height={120}/>
                    <Title size='sm' text='Корзина пустая' className='text-center bold my-2'/>
                    <SheetTitle className='sr-only'></SheetTitle>
                    <SheetClose asChild>
                        <Button className='w-56 h-12 text-base' size={'lg'}>
                            <ArrowLeft className='w-5 mr-2'/>
                            Вернуться назад
                        </Button>
                    </SheetClose>
                </div>
             )}

            {totalAmount > 0 &&
            ( <>
               <div className='overflow-hidden flex-1'>
                       {items.map((item) => (
                        <div className='mb-2' key={item.id}>
                        <CartDrawerItem 
                        disabled={item.disabled}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                        onClickRemove={() => removeCartItem(item.id)}
                         details={getCartItemDetails(
                        item.type as ProductType,
                        item.size as ProductSize,
                      )}
                      flavor={item.flavor}
                        />
                      </div>
                       ))}
                </div> 

                <SheetFooter className='mx-6 bg-white p-8'>
                    <div className='w-full'>
                        <div className='flex mb-4'>
                            <span className='flex flex-1 text-lg text-neutral-500'>
                                Итого
                                <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'/>
                            </span>
                            
                            <span className='font-bold text-lg'>{totalAmount}P</span>
                        </div>
                    </div>

                    <Link href="/checkout">
                    <Button type='submit' className='w-full h-12 text-base'>
                        оформить заказ
                        <ArrowRight className='w-5 ml-2'/>
                    </Button>
                    </Link>
                </SheetFooter> 
            </>)
            }   
            </div>
            </SheetContent>
        </Sheet>
    )
}

export default CartDrawer