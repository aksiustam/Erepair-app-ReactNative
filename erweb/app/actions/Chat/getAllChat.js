"use server";
import prisma from "@/lib/prismadb";

export default async function getAllChat() {
  try {
    const chat = await prisma.chat.findMany({
      where: {
        archive: false,
      },

      orderBy: {
        id: "asc",
      },
    });

    return chat;
  } catch (error) {
    throw new Error(error);
  }
}
