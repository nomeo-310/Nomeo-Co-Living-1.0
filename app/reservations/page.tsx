import React from 'react'
import { getCurrentUser } from '../libs/actions/auth.actions';
import EmptyState from '../components/addons/EmptyState';
import { fetchAuthorReservations } from '../libs/actions/listing.actions';
import ReservationClient from '../components/shared/ReservationClient';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Reservations",
  description: "Generated by create next app and typed with love.",
};

export default async function Reservations () {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unathorized"
        subtitle="Please login"
      />
    )
  }

  const reservations = await fetchAuthorReservations(currentUser.id);

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservation on your property"
      /> 
    )
  }
  
  return (
    <ReservationClient currentUser={currentUser} reservations={reservations}/>
  )
}
