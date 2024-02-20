"use client"

import { countersProps } from '@/app/types/types';
import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'


const Counters = ({title, subtitle, value, onChange}:countersProps) => {
  const addUp = React.useCallback(() => {
    onChange(value + 1)
  },[onChange, value]);

  const reduce = React.useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  },[onChange, value])
  return (
    <div className='flex flex-row items-center justify-between'>
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-400">{subtitle}</div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition border border-neutral-400" onClick={reduce}>
          <AiOutlineMinus/>
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition border border-neutral-400" onClick={addUp}>
          <AiOutlinePlus/>
        </div>
      </div>
    </div>
  )
}

export default Counters;