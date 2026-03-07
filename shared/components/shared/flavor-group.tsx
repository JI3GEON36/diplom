import { cn } from '@/shared/lib/utils';
import { Flavor } from '@prisma/client';
import React from 'react';

interface Props {
  flavors: Flavor[];
  selectedFlavor: Flavor | null;
  onSelect: (flavor: Flavor) => void;
  className?: string;
}

export const FlavorGroup: React.FC<Props> = ({
  flavors,
  selectedFlavor,
  onSelect,
  className,
}) => {

    if(!flavors) {
        console.log(flavors)

        return
    }

  return (
    <div className={cn('mt-5', className)}>
      <p className="font-medium mb-3">Выберите вкус:</p>
      <div className="grid grid-cols-3 gap-2">
        {flavors.map((flavor) => (
          <button
            key={flavor.id}
            onClick={() => onSelect(flavor)}
            className={cn(
              'flex flex-col items-center p-3 rounded-lg border-2 transition-all',
              selectedFlavor?.id === flavor.id
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
              <img
                src={flavor.imageUrl || 'any.png'}
                alt={flavor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">{flavor.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};