"use client"

import Image from 'next/image'
import React from 'react'

interface Props {
  imageSrc: string
}

const Avatar = ({imageSrc}: Props) => {
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
