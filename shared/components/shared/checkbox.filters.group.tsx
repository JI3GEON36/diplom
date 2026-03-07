'use client'

import React from 'react'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

type item = FilterChecboxProps

interface Props {
    className?:string
    title:string,
    items:item[],
    defaultItems?:item[],
    loading?:boolean,
    limit?:number,
    searchInputPlaceholder?:string,
    defaultValue?:string[],
    selected:Set<string>
    onClickCheckBox: (id:string) => void
    name?:string

}

const CheckboxFiltersGroup:React.FC<Props> = ({
    className,
    selected,
    onClickCheckBox,
    title,
    items,
    defaultItems,
    limit = 5,
    loading,
    searchInputPlaceholder = 'Поиск...',
    name,

}) => {

    const [showAll, setShowAll] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')

    const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems || items).slice(0, limit)

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
    }

    if(loading === true) {
      return (
        <div className={className}>
             <p className='font-bold mb-3'>{title}</p>

             {...Array(limit).fill(0).map((_, index) => <Skeleton key={index} className='h-6 mb-4 rounded-xl'/>)}
        </div>
      )
    }
  return (
    <div className={className}>
      <p className='font-bold mb-3'>{title}</p>

     {showAll && (
      <div>
        <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder}/>
      </div>
     )}

      <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
        {list.map((item,index) =>
          <FilterCheckbox
          onCheckedChange={() => onClickCheckBox(item.value)}
          checked={selected.has(item.value)}
          key={index}
          value={item.value}
          text={item.text}
          endAdornment={item.endAdornment}
          name={name}
          />
        )}

        {items.length > limit && (
          <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
            <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
              {showAll ? 'Скрыть' : 'Показать всё...'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckboxFiltersGroup;


