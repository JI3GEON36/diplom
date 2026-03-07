// address-input.tsx
'use client';

import dynamic from 'next/dynamic';
import 'react-dadata/dist/react-dadata.css';

// Динамический импорт без SSR
const AddressSuggestions = dynamic(
  () => import('react-dadata').then(mod => mod.AddressSuggestions),
  { ssr: false } // ← НЕ рендерить на сервере!
);

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions 
      token="2972432aaca42d4a6e78e39e482eedcc9f5149ed" 
      onChange={(data) => onChange?.(data?.value)} 
    />
  );
};