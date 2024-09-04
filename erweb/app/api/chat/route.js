import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 500 });
  }

  try {
    let user = await prisma.User.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Chat: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 500 });
    }

    return NextResponse.json(user.Chat);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const data = await req.json();

  const admin = await prisma.Admin.findFirst();

  try {
    const chatdata = await prisma.Chat.create({
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

    return NextResponse.json(chatdata);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(req) {
  const data = await req.json();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    let user = await prisma.User.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Chat: true,
      },
    });

    let chatData = [data.chat, ...user.Chat.chat];

    const unread = user.Chat.unread + data.unread;

    const updatedChat = await prisma.Chat.update({
      where: { id: user.Chat.id },
      data: {
        subtitle: data.subtitle,
        date: data.date,
        unread: unread,
        chat: chatData,
        archive: data.archive,
      },
    });

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
