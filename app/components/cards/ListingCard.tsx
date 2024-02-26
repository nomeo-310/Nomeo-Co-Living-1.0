'use client'

import { listingCardProps } from '@/app/types/types';
import { useRouter } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import { format } from 'date-fns'
import React from 'react'
import Image from 'next/image';
import LikeButton from '../addons/LikeButton';
import Button from '../addons/Button';

const ListingCard = ({data, reservation, currentUser, disabled, actionId, actionLabel, onAction }:listingCardProps) => {
  const router = useRouter();
  const { getCountryByValue } = useCountries();

  const location = getCountryByValue(data.locvationValue);

  const handleCancel  = React.useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId || '')
  },[onAction, actionId, disabled]);

  const price = React.useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  },[reservation, data.price]);

  const reservationDate = React.useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endTime)
    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  },[]);

  return (
    <div onClick={() => router.push(`/listings/${data.id}`)} className='col-span-1 cursor-pointer group'>
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-md">
          <Image src={data.image} alt='listing' className='object-cover h-ful w-full group-hover:scale-110 transition' fill/>
          <div className="absolute top-3 right-3">
            <LikeButton currentUser={currentUser} listingId={data.id}/>
          </div>
        </div>
        <div className='font-semibold text-lg'>
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          { !reservation && <div className='font-light'>per night</div> }
        </div>
        { onAction && actionLabel && <Button disabled={disabled} small label={actionLabel} onClick={handleCancel}/> }
      </div>
    </div>
  )
}
 
export default ListingCard;