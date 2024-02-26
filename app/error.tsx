'use client'


import React from 'react'
import EmptyState from './components/addons/EmptyState';
import { errorStateProps } from './types/types';



const ErrorState = ({error}:errorStateProps) => {
  React.useEffect(() => {
    console.error(error.message)
  }, [error]);


  return (
    <EmptyState
      title='Error'
      subtitle={error.message}
    />
  )
}

export default ErrorState;