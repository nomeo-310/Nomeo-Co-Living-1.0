'use server'

import { creatListingProps } from '@/app/types/types';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from './auth.actions';


export const createListing = async ({category, location, guestCount, roomCount, bathroomCount, image, price, title, description}:creatListingProps) => {
  const prisma = new PrismaClient();

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const listData = { category: category, location: location, guestCount: guestCount, roomCount: roomCount, bathroomCount: bathroomCount,image: image, price: price, title: title, description: description};
  Object.keys(listData).forEach((value:any) => {
    if (!listData[value as keyof creatListingProps]) {
      return new Error('Failed to create listing, some fields are empty')
    }
  });

  try {
    const listing = await prisma.listing.create({data: { category: category, locvationValue: location.value, guestCount: guestCount, roomCount: roomCount, bathroomCount: bathroomCount,image: image, price: price, title: title, description: description, userId: currentUser.id}});
    return listing
  } catch (error:any) {
    throw new Error(`Failed to create listing: ${error.message}`)
  }
}

export const fetchAllListings = async () => {
  const prisma = new PrismaClient();
  try {
    const listings = prisma.listing.findMany({orderBy: {createdAt: 'desc'}})
    return listings
  } catch (error:any) {
    throw new Error(`Failed to fetch listing: ${error.message}`)
  }
}