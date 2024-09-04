import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const chat = await prisma.Chat.findMany();

    if (!chat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 500 });
    }

    return NextResponse.json(chat);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
