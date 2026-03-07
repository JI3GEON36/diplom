'use client'
import React from "react";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import ProductCard from "./product-card";
import { useIntersection } from 'react-use';
import useCategoryStore from "@/shared/store/category";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
    title:string;
    items:ProductWithRelations[];
    className?:string
    listClassName?:string;
    categoryId:number;
}

const ProductGroupList:React.FC<Props> = ({
    title,
    items,
    className,
    listClassName,
    categoryId
}) => {
  const setActiveCategory = useCategoryStore((state) => state.setActiveId)
  const intersectionRef = React.useRef<HTMLDivElement | null>(null)
  const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
    threshold:0.4,
  })

    React.useEffect(() => {
      if(intersection?.isIntersecting) {
        setActiveCategory(categoryId)
      }
    }, [intersection?.isIntersecting,title,categoryId])

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5"/>

      <div className={cn('grid grid-cols-3 gap-12.5', listClassName)}>
            {items.map((product,id) =>
            <ProductCard 
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            />
            )}
      </div>
    </div>
  );
}


// 14 36 00

export default ProductGroupList;
