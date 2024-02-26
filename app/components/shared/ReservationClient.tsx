'use client'

import React from 'react'
import { Reservation, User, Listing } from '@prisma/client';
import Container from '../addons/Container';
import Heading from '../addons/Heading';
import { useRouter } from 'next/navigation';
import { cancelReservation } from '@/app/libs/actions/listing.actions';
import { toast } from 'sonner';
import ListingCard from '../cards/ListingCard';
import { reservationClientProps } from '@/app/types/types';


const ReservationClient = ({currentUser, reservations}:reservationClientProps) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = React.useState('');

  const onCancel = React.useCallback( async(id:string) => {
    setDeleteId(id);
    try {
      await cancelReservation(id);
      toast.success('Reservation cancelled');
      router.refresh();
    } catch (error:any) {
      toast.error('Something went wrong, try again')
    }
    setDeleteId('');
    },[router, cancelReservation]);

  return (
    <Container>
      <Heading
        title='Reservations'
        subtitle="Bookings on your properties"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
          />
          ))}
      </div>
    </Container>
  )
}

export default ReservationClient
