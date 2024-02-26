'use client'

import React from 'react'
import Container from '../addons/Container'
import { categories } from '@/app/constant'
import { ListingHead, ListingInfo, ListingReservation } from '../addons/ListingAddOn'
import { listingClientProps } from '@/app/types/types'
import useSignIn from '@/app/hooks/useSignIn'
import { useRouter } from 'next/navigation'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import {toast} from 'sonner'
import { createReservations } from '@/app/libs/actions/listing.actions'


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

const ListingClient = ({currentUser, listing, reservations =[]}: listingClientProps) => {

  const signInUser = useSignIn();
  const router = useRouter();

  const disableDate = React.useMemo(() => {
    let dates:Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endTime)
      });
      dates = [...dates, ...range]
    });

    return dates
  },[reservations])

  const category = React.useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(listing.price);
  const [dateRange, setDateRange] = React.useState(initialDateRange);

  const onCreateReservation = React.useCallback(async() => {
    if(!currentUser) {
      return signInUser.onOpen();
    }
    const reservationData = {
      totalPrice: totalPrice,
      startDate: dateRange.startDate,
      endTime: dateRange.endDate,
      listingId: listing.id
    }
    setIsLoading(true);
    await createReservations(reservationData);
    toast.success('Listing reserved!')
    router.push('/trips');
    setIsLoading(false)

  },[totalPrice, dateRange, listing.id, router, currentUser, signInUser]);

  React.useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
      if(dayCount && listing.price) {
        setTotalPrice(dayCount *  listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            image={listing.image}
            id={listing.id}
            currentUser={currentUser}
            locvationValue={listing.locvationValue}
           />
           <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-10">
            <ListingInfo
              user={listing.user}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
              locvationValue={listing.locvationValue} 
              category={category}           
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation 
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                disabled={isLoading}
                disableDates={disableDate}
                onSubmit={onCreateReservation}
              />
            </div>
           </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient;