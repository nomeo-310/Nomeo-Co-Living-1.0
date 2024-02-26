"use client"

import { avatarProps } from '@/app/types/types'
import Image from 'next/image'
import React from 'react'


const Avatar = ({imageSrc}: avatarProps) => {
  return (
    <Image
      src={imageSrc ? imageSrc : '/images/placeholder.jpg'}
      className='rounded-full'
      height={35}
      width={35}
      alt='user_avatar'
    />
  )
}

export default Avatar
