import { Metadata } from "next";
import EmptyState from "../components/addons/EmptyState"
import TripClient from "../components/shared/TripClient";
import { getCurrentUser } from "../libs/actions/auth.actions"
import { fetchUserReservations } from "../libs/actions/listing.actions";



export const metadata: Metadata = {
  title: "Trips",
  description: "Generated by create next app and typed with love.",
};

export default async function Trips () {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unathorized"
        subtitle="Please login"
      />
    )
  }

  const reservations = await fetchUserReservations(currentUser.id)

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't made any reservations yet"
      /> 
    )
  }
  return (
    <div>
      <TripClient currentUser={currentUser} reservations={reservations}/>
    </div>
  )
}