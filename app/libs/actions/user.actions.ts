'use server'

import { createUserProps } from '@/app/types/types';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import { getCurrentUser } from './auth.actions';


export const createUser = async ({email, password, name}:createUserProps) => {
  const prisma = new PrismaClient();
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = { email: email, name: name, hashedPassword: hashedPassword };
    const user = await prisma.user.create({data: newUser})
    return user
  } catch (error:any) {
    throw new Error(`Failed to create user: ${error.message}`)
  }
}

export const likeListing = async (listingId:string) => {
  const prisma = new PrismaClient();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const favouritesId = currentUser.favouritesId;
  favouritesId.push(listingId);
  const user = await prisma.user.update({where: {id: currentUser.id}, data: {favouritesId}});

  return user
}

export const unlikeListing = async (listingId:string) => {
  const prisma = new PrismaClient();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const favouritesId = currentUser.favouritesId;
  const newArray = favouritesId.filter((id) => id !== listingId);
  const user = await prisma.user.update({where: {id: currentUser.id}, data: {favouritesId: newArray}});

  return user
}