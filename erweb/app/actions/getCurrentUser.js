"use server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.Admin.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
}
