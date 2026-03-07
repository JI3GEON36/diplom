import { cn } from '@/shared/lib/utils';
import * as React from 'react';

interface Props {
    className?:string,
    imageUrl:string,
    size:number
}

const   PizzaImage: React.FC<Props> = ({className,imageUrl, size }) => {
 return (
    <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
        <img 
        src={imageUrl}
        alt='logo'
        className={cn('relative left-2 top-2 transition-all z-10 duration-100', {
            'w-75 h-75': size == 500,
            'w-100 h-100': size == 1000,
            'w-125 h-125': size == 2000,
        })}
        />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-112.5 h-112.5" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-92.5 h-92.5" />
    </div>
 )
};

export default PizzaImage;
