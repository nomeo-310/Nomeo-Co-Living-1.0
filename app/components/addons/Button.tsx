"use client"

import React from 'react'
import { buttonProps } from '@/app/types/types'

const Button = ({onClick, outline, disabled, small, icon:Icon, label}: buttonProps) => {
  return (
    <button className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${outline ? 'bg-white' : 'bg-rose-500'} ${outline ? 'border-black' : 'border-rose-500'} ${outline ? 'text-black' : 'text-white'} ${small ? 'py-1' : 'py-3'} ${small ? 'text-sm' : 'text-md'} ${small ? 'font-light' : 'font-semibold'} ${small ? 'border' : 'border-2'}` } onClick={onClick} disabled={disabled}>
      {label}
      {Icon && <Icon size={24} className='absolute left-4 top-3'/> }
    </button>
  )
}

export default Button