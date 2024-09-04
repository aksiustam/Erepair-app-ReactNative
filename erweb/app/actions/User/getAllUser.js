"use server";
import prisma from "@/lib/prismadb";

export default async function getAllUser() {
  try {
    const user = await prisma.User.findMany();

    return user;
  } catch (error) {
    throw new Error(error);
  }
}
