import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui/button';

interface Props {
    imageUrl:string;
    name:string;
    className?:string;
    price:number,
    loading?:boolean,
    onSubmit?:VoidFunction
}

const ChooseProductForm: React.FC<Props> = ({className, imageUrl,name,price,onSubmit,loading}) => {
  
 return (
    <div className={cn(className, 'flex flex-1')}>
       <div className='flex items-center justify-center flex-1 relative w-full'>
        <img 
        src={imageUrl}
        alt={name}
        className='relative left-2 top-2 transition-all z-50 duration-300 w-[87.5] h-[87.5]'
        />
       </div>

        <div className='w-122.5 bg-[#f7f6f5] p-7'>
            <Title text={name} size='md' className='font-extrabold mb-1'/>

            <Button loading={loading} onClick={onSubmit} className='h-13.75 px-10 text-base rounded-[18px] w-full'>
                Добавить в корзину {price}
            </Button>
        </div>
    </div>
 )
};

export default ChooseProductForm
