'use server'

import { createUserProps } from '@/app/types/types';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'


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