"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import Heading from './Heading'
import Button from './Button'
import { emptyStateProps } from '@/app/types/types'


const EmptyState = ({title, subtitle, showReset}:emptyStateProps) => {
  const router = useRouter();
  return (
    <div className='h-[60vh] flex flex-col gap-2 items-center justify-center'>
      <Heading title={title || ""} subtitle={subtitle} center/>
      <div className="w-48 mt-4">
        {showReset && <Button outline onClick={() =>router.push('/')} label='Remove all filters'/> }
      </div>
    </div>
  )
}

export default EmptyState