"use client"

import Image from 'next/image'
import React from 'react'

interface Props {
  
}

const Avatar = (props: Props) => {
  return (
    <Image
      src={'/images/placeholder.jpg'}
      className='rounded-full'
      height={30}
      width={30}
      alt='user_avatar'
    />
  )
}

export default Avatar
