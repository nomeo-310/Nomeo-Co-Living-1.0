import { getServerSession } from "next-auth";
import { authOptions } from "../../libs/authOptions";
import { PrismaClient } from "@prisma/client";

export const getSession = async () => {
  return await getServerSession(authOptions);
}

export const getCurrentUser = async () => {
  try {
    const prisma = new PrismaClient();
    const session = await getSession();
    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({where: {email: session.user.email as string}});
    if (!currentUser) {
      return null
    }

    return currentUser;
  } catch (error:any) {
    return null
  }
}