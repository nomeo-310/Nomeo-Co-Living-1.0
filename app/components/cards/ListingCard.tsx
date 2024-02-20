'use client'

import { listingCardProps } from '@/app/types/types';
import { useRouter } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import React from 'react'

const ListingCard = ({data, reservation, currentUser, disabled, actionId, actionLabel, onAction }:listingCardProps) => {
  const router = useRouter();
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(data.locvationValue);
  return (
    <div>
      SingleListing
    </div>
  )
}

export default ListingCard;