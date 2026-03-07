import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui/button';
import PizzaImage from './pizza-image';
import { GroupVariants } from './group-variants';
import { ProductSize,ProductTypes, ProductSizes, ProductType } from '@/shared/contansts/pizza';
import { Flavor, ProductItem } from '@prisma/client';
import usePizzaOptions from '@/shared/hooks/use-pizza-options';
import getPizzaDetails from '@/shared/lib/get-pizza-details';
import { FlavorGroup } from './flavor-group';

interface Props {
    imageUrl:string;
    name:string;
    className?:string;
    loading?:boolean,
    items:ProductItem[],
    flavors:Flavor[],
    onSubmit:(itemId:number, flavorId:number) => void
}

const ChoosePizzaForm: React.FC<Props> = ({className, imageUrl,name, items,flavors,onSubmit, loading}) => {

    const {size,type,setSize,setType,availableSizes,currentItemId,  selectedFlavor, setSelectedFlavor} = usePizzaOptions(items, flavors);

    const {totalPrice, textDetailts} = getPizzaDetails(items,type,size,)

    const handleClickAdd = () => {
        if(currentItemId && selectedFlavor) {
        onSubmit(currentItemId, selectedFlavor.id)
        }
    }

 return (
    <div className={cn(className,'flex flex-1')}> 
       <PizzaImage imageUrl={selectedFlavor?.imageUrl || imageUrl} size={size}/>

        <div className='w-112.5 bg-[#f7f6f5] p-7'>
            <Title text={name} size='md' className='font-extrabold mb-1'/>

            <p className='text-gray-400'>{textDetailts}</p>

            <div className='flex flex-col gap-4 mt-5'>
            <GroupVariants 
            items={availableSizes}
            Selectedvalue={String(size)}
            onClick={value => setSize(Number(value)as ProductSize)}
            />

            <GroupVariants 
            items={ProductTypes}
            Selectedvalue={String(type)}
            onClick={value => setType(Number(value)as ProductType)}
            />
            </div>

            <div className='bg-gray-50 p-5 rounded-md h-105 overflow-auto scrollbar'>
            <FlavorGroup 
            flavors={flavors}
            selectedFlavor={selectedFlavor}
            onSelect={setSelectedFlavor}
            />
            </div>

            <Button loading={loading} onClick={handleClickAdd} className='h-13.75 px-10 text-base rounded-[18px] w-full'>
                Добавить в корзину {totalPrice}
            </Button>
        </div>

    </div>
 )
};

export default ChoosePizzaForm
