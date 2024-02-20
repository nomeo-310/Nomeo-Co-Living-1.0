"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import qs from 'query-string'

export interface categoryBoxProps {
  icon:IconType
  label:string
  selected?:boolean
}

const CategoryBox = ({icon:Icon, label, selected}: categoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = React.useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery:any = {...currentQuery, category: label}

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({url:'/', query: updatedQuery}, {skipNull: true});

    router.push(url);

  }, [label, params, router]);

  return (
    <div className={`flex flex-col items-center justify-center gap-2 p-3 border-2 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-neutral-800' : 'border-transparent'} ${selected ? 'text-neutral-800' : 'text-neutral-500'}`} onClick={handleClick}>
      <Icon size={26}/>
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox;