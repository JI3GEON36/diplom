import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={cn('mx-auto max-w-7xl', className)}>{children}</div>;
};

export default Container;
