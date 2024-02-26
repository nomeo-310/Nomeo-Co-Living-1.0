import React from 'react'
import EmptyState from '../components/addons/EmptyState'
import { getCurrentUser } from '../libs/actions/auth.actions'
import { fetchFavourites } from '../libs/actions/listing.actions'
import FavouriteClient from '../components/shared/FavouriteClient';



export default async function Favourites() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unathorized"
        subtitle="Please login"
      />
    )
  }
  
  const favourites = await fetchFavourites();

  if (favourites.length === 0) {
    return (
      <EmptyState
        title='No favourites found!'
        subtitle='It seems you have no favourite listing'
      />
    )
  }

  return (
    <FavouriteClient currentUser={currentUser} listings={favourites}/>
  )
}