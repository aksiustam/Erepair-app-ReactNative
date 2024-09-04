"use server";
import prisma from "@/lib/prismadb";

export default async function archiveChat(data) {
  try {
    await prisma.chat.update({
      where: { id: data.id },
      data: data,
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
