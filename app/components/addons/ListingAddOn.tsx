'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Heading from './Heading'
import useCountries from '@/app/hooks/useCountries'
import Image from 'next/image'
import LikeButton from './LikeButton'
import Avatar from './Avatar'
import { calendarProps, listingCategoryProps, listingHeadProps, listingInfoProps, listingReservationProps } from '@/app/types/types'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import Button from './Button'

const Map = dynamic(() => import('../shared/Map'))


const ListingCategory =({icon:Icon, label, description}:listingCategoryProps) => {
  return (
    <div className='flex flx-col gap-6'>
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className='text-neutral-600'/>
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-neutral-500 font-light text-justify">{description}</div>
        </div>
      </div>
    </div>
  )
}

const Calendar = ({value, onChange, disableDates}:calendarProps) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disableDates}
    />
  )
}

const ListingReservation =({price, totalPrice, onChangeDate, onSubmit, disabled, disableDates, dateRange}:listingReservationProps)=> {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {price}</div>
        <div className='font-light text-neutral-600'>per night</div>
      </div>
      <hr/>
      <Calendar
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
        disableDates={disableDates}
      />
      <hr/>
      <div className="p-4">
        <Button disabled={disabled} label='Reserve' onClick={onSubmit}/>
      </div>
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  )
}

const ListingHead =({title, image, locvationValue, id, currentUser}:listingHeadProps) => {
  const {getCountryByValue} = useCountries();
  const location = getCountryByValue(locvationValue)
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full md:h-[80vh] h-[60vh] overflow-hidden rounded-lg relative">
        <Image src={image} fill className='object-cover w-full' alt='property_image'/>
        <div className="absolute top-5 right-5">
          <LikeButton listingId={id} currentUser={currentUser}/>
        </div>
      </div>
    </>
  )
}

const ListingInfo =({user, category, description, roomCount, guestCount, bathroomCount, locvationValue}:listingInfoProps) => {
  const { getCountryByValue } = useCountries();
  const coordinates = getCountryByValue(locvationValue)?.latlng;
  return (
    <div className='col-span-4 flex flex-col gap-6'>
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar imageSrc={user?.image}/>
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} { guestCount < 2 ? 'guest' : 'guests'}</div>
          <div>{roomCount} { roomCount < 2 ? 'room' : 'rooms'}</div>
          <div>{bathroomCount} { bathroomCount < 2 ? 'bathroom' : 'bathrooms'}</div>
        </div>
      </div>
      <hr/>
      { category && 
        <ListingCategory 
          icon={category.icon} 
          description={category.description} 
          label={category.label}
        />
      }
      <hr/>
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr/>
      <Map center={coordinates}/>
    </div>
  )
}


export {ListingHead, ListingInfo, ListingReservation, Calendar};