'use client'

import { Dialog, DialogTitle } from '@/shared/components/ui/dialog';
import { DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import ProductForm from '../product-form';

interface Props {
  className?: string,
  product:ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({className, product}) => {
    const router = useRouter()

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-265 max-w-265 min-h-125 min-w-250 bg-white overflow-hidden', className)}>
          <DialogTitle className="sr-only">Выбор продукта: {product.name}</DialogTitle>

          <ProductForm product={product} onSubmit={() => router.back()}/>

      </DialogContent>
    </Dialog>
  );
};
