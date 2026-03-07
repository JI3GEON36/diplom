'use client'

import { Search } from 'lucide-react';
import React, { useRef } from 'react'
import { Input } from '../ui/input';
import { cn } from '@/shared/lib/utils';
import { useClickAway, useDebounce } from 'react-use';
import Link from 'next/link';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';

interface Props {
    className?: string;
}

const SearchInput:React.FC<Props> = ({className}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [focused, setFocused] = React.useState(false)
    const ref = useRef(null)
    const [products, setProducts] = React.useState<Product[]>([])


    useClickAway(ref, () => {
        setFocused(false)
    })

    useDebounce(() => {
        (async () => {
            try {
                const responce = await Api.product.search(searchQuery)
                setProducts(responce)
            } catch (error) {
                console.log(error)
            }
        })()
    }, 250, [searchQuery])

    const onClickItem = () => {
        setFocused(false)
        setSearchQuery('')
        setProducts([])
    }

    return (
<>
         {focused && <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30' />}
          <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative h-11 items-center z-30', className)}>
            <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400'/>
            <Input className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
            type='text'
            placeholder='Найти пиццу...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            />
            
           {products.length > 0 &&  
           
           <div className={cn('absolute w-full bg-white rounded-xl py-2 top-14 transition-all shadow-md duration-200 invisible opacity-0 z-30', 
                focused && 'visible opacity-100 top-12'
                )}>
                    {products.map((product) => (
                <Link key={product.id}
                    onClick={onClickItem}
                    className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10' 
                    href={`/product/${product.id}`}>

                    <img src={product.imageUrl} 
                    alt={product.name}
                    className='rounded-sm h-8 w-8'/>

                    <span>{product.name}</span>
                </Link>
                    ))}

            </div>}
          </div>
          
</>
    )
}

// 6 7 40

export default SearchInput;

