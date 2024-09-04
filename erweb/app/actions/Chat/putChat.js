"use server";
import prisma from "@/lib/prismadb";

export default async function putChat(data) {
  try {
    await prisma.chat.update({
      where: { id: data.id },
      data: {
        subtitle: data.subtitle,
        date: data.date,
        unread: data.unread,
        chat: data.chat,
        archive: data.archive,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
