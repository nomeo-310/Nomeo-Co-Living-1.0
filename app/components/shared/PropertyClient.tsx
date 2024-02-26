'use client'


import { useRouter } from 'next/navigation';
import React from 'react'
import Container from '../addons/Container';
import Heading from '../addons/Heading';
import { toast } from 'sonner';
import { deleteListing } from '@/app/libs/actions/listing.actions';
import ListingCard from '../cards/ListingCard';
import { propertyClientProps } from '@/app/types/types';


const PropertyClient = ({currentUser, listings}: propertyClientProps) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = React.useState('');

  const onCancel = React.useCallback( async(id:string) => {
    setDeleteId(id);
    try {
      await deleteListing(id);
      toast.success('Property deleted!');
      router.refresh();
    } catch (error:any) {
      toast.error('Something went wrong, try again')
    }
    setDeleteId('');
    },[router, deleteListing]);

  return (
    <Container>
      <Heading
        title='Trips'
        subtitle="Where you've been and where you're still going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deleteId === listing.id}
            actionLabel='Delete Property'
            currentUser={currentUser}
          />
          ))}
      </div>
    </Container>
  )
}

export default PropertyClient;
