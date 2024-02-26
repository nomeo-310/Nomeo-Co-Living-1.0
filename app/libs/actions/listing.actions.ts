'use server'

import { IListingsParams, creatListingProps , createReservationProps} from '@/app/types/types';
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

export const createReservations = async({totalPrice, startDate, endTime, listingId}:createReservationProps) => {
  const prisma = new PrismaClient();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const reservationData = {
    totalPrice: totalPrice,
    startDate: startDate,
    endTime: endTime,
    userId: currentUser.id
  }

  try {
    const listingAndReservation = await prisma.listing.update({
      where: {id: listingId},
      data: {
        reservations: {
          create: reservationData
        }
      }
    })

    return listingAndReservation;
  } catch (error:any) {
    throw new Error(`Failed to create reservation: ${error.message}`)
  }

}

export const fetchAllListings = async (params:IListingsParams) => {
  const prisma = new PrismaClient();
  try {
    const { userId, guestCount, roomCount, bathroomCount, startDate, endTime, locvationValue, category } = params;
    let query:any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {gte: +roomCount}
    }

    if (guestCount) {
      query.guestCount = {gte: +guestCount}
    }
    
    if (bathroomCount) {
      query.bathroomCount = {gte: +bathroomCount}
    }

    if (locvationValue) {
      query.locvationValue = locvationValue
    }

    if (startDate && endTime) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endTime: {gte: startDate},
                startDate: {lte: startDate}
              },
              {
                startDate: {gte: endTime},
                endTime: {lte: endTime}
              },
            ]
          }
        }
      }
    }

    const listings = prisma.listing.findMany(
      {where: query, orderBy: {createdAt: 'desc'}});
    if (!listings) {
      return null;
    }

    return listings
  } catch (error:any) {
    throw new Error(`Failed to fetch listing: ${error.message}`)
  }
}

export const fetchAllUserListings = async (userId:string) => {
  const prisma = new PrismaClient();
  try {
    const listings = prisma.listing.findMany(
      {where: {userId: userId}, orderBy: {createdAt: 'desc'}});
    if (!listings) {
      return null;
    }

    return listings
  } catch (error:any) {
    throw new Error(`Failed to fetch listing: ${error.message}`)
  }
}

export const fetchSingleListing = async (listingId:string) => {
  const prisma = new PrismaClient();
  try {
    const singleListing = prisma.listing.findUnique({where: {id: listingId}, include: {user: true}});

    if (!listingId || typeof listingId !== 'string') {
      throw new Error(`Invalid listing id`)
    }

    if (!singleListing) {
      return null;
    }

    return singleListing;
  } catch (error:any) {
    throw new Error(`Failed to fetch single listing: ${error.message}`)
  }
}

export const fetchUserReservations = async(userId:string) => {
  const prisma = new PrismaClient();

  try {
      const reservation = await prisma.reservation.findMany({
        where: {userId: userId}, 
        include: {listing: true},
        orderBy: {createdAt: 'desc'}
      });
  
      return reservation;
    } catch (error:any) {
      throw new Error(`Failed to fetch reservation: ${error.message}`)
    }
}

export const fetchAuthorReservations = async(userId:string) => {
  const prisma = new PrismaClient();

  try {
      const reservation = await prisma.reservation.findMany({
        where: {listing: {userId: userId}}, 
        include: {listing: true},
        orderBy: {createdAt: 'desc'}
      });
  
      return reservation;
    } catch (error:any) {
      throw new Error(`Failed to fetch reservation: ${error.message}`)
    }
}

export const fetchReservations = async(listingId:string)=> {
  const prisma = new PrismaClient();
  
  try {
    const reservation = await prisma.reservation.findMany({
      where: {listingId: listingId}, 
      include: {listing: true},
      orderBy: {createdAt: 'desc'}
    });

    return reservation;
  } catch (error:any) {
    throw new Error(`Failed to fetch reservation: ${error.message}`)
  }
}

export const fetchFavourites = async() => {
  const prisma = new PrismaClient();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    const favourites = await prisma.listing.findMany({
      where: {id: {in: [... (currentUser.favouritesId || [])]}}
    })

    return favourites;
  } catch (error:any) {
    throw new Error(`Failed to fetch favourite listings: ${error.message}`)
  }
}

export const cancelReservation = async(reservationId:string) => {
  const prisma = new PrismaClient();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error(`Invalid reservation id`)
  }

  try {
    const reservation = await prisma.reservation.deleteMany({
      where: {id: reservationId, 
        OR: [{userId: currentUser.id}, {listing: {userId: currentUser.id}}]
      }
    })

    return reservation
  } catch (error:any) {
    throw new Error(`Failed to cancel reservation: ${error.message}`)
  }
}

export const deleteListing = async(listingId:string) => {
  const prisma = new PrismaClient();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  if (!listingId || typeof listingId !== 'string') {
    throw new Error(`Invalid listing id`)
  }

  try {
    const listings = await prisma.listing.deleteMany({
      where: {id: listingId, userId: currentUser.id}
    });

    return listings
  } catch (error:any) {
    throw new Error(`Failed to delete property: ${error.message}`)
  }

}


