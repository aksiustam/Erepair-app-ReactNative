"use server";
import prisma from "@/lib/prismadb";

export default async function setChat(data) {
  try {
    const admin = await prisma.Admin.findFirst();

    const chat = await prisma.Chat.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        date: data.date,
        unread: data.unread,
        chat: data.chat,
        archive: data.archive,
        User: {
          connect: { id: data.userId },
        },
        Admin: {
          connect: { id: admin.id },
        },
      },
    });

    return chat;
  } catch (error) {
    throw new Error(error);
  }
}
