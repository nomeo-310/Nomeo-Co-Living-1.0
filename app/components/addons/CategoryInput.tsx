"use client"

import { categoryInputProps } from '@/app/types/types'
import React from 'react'

const CategoryInput = ({onClick, selected, icon:Icon, label}: categoryInputProps) => {

  return (
    <div onClick={() => onClick(label)} className={`rounded-lg border-2 lg:p-3 p-2 flex flex-col gap-2 hover:border-black transition cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'}`}>
      <Icon size={30}/>
      <div className="font-semibold">
        {label}
      </div>
    </div>
  )
}

export default CategoryInput