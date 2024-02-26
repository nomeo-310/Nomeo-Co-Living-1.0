"use client"

import React from 'react'
import Container from '../addons/Container';
import Heading from '../addons/Heading';
import ListingCard from '../cards/ListingCard';
import { favouriteClientProps } from '@/app/types/types';


const FavouriteClient = ({currentUser, listings}: favouriteClientProps) => {
  
  return (
    <Container>
      <Heading
        title='Favourites'
        subtitle='List of places you have favourited!'
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavouriteClient;