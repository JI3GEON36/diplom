'use client'

import React from 'react'
import { Title } from './title';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import CheckboxFiltersGroup from './checkbox.filters.group';
import { useFilters } from '@/shared/hooks/use-filters';
import { useQueryFilters } from '@/shared/hooks/use-query-filters';

interface Props {
    className?:string;
}

const Filters:React.FC<Props> = ({className}) => {

    const filters = useFilters();
    useQueryFilters(filters)

    const updatePrices = (prices:number[]) => {
        filters.setPrices('priceFrom', prices[0])
        filters.setPrices('priceTo', prices[1])
    }

  return (
    <div className={className}>
        <Title text='фильтрация' size='sm' className='mb-5 font-bold'/>

         <CheckboxFiltersGroup 
        name={'pizzaTypes'}
        title='Тип теста'
        className='mt-5'
        selected={filters.types}
        onClickCheckBox={filters.setPizzaTypes}
        items={[
            {text: 'Порошковый', value: '1'},
            {text: 'Капсулы', value: '2'},
        ]}
        />
        
        <CheckboxFiltersGroup 
        name={'sizes'}
        title='Размеры'
        className='mt-5'
        selected={filters.sizes}
        onClickCheckBox={filters.setSizes}
        items={[
            {text: '500 грамм', value: '500'},
            {text: '1000 грамм', value: '1000'},
            {text: '2000 грамм', value: '2000'},
        ]}
        />

        <div className='mt-5 border-y border-y-neutral-180 py-6 pb-7'>
            <p className='font-bold mb-3'>Цена от и до</p>
            <div className='flex gap-3 mb-5'>
                <Input type='number' placeholder='0' min={0} max={1000}
                 value={String(filters.prices.priceFrom)}
                onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
                />
                <Input type='number' placeholder='1000' min={100} max={1000} 
                value={String(filters.prices.priceTo)}
                onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}/>
            </div>

            <RangeSlider min={0} max={1000} step={10} value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]} 
            onValueChange={updatePrices}
            />
        </div>
    </div>
  )
}

export default Filters;

