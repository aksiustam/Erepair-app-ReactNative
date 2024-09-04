"use server";
import prisma from "@/lib/prismadb";

export default async function delChat(data) {
  try {
    await prisma.chat.delete({
      where: { id: data.id },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
