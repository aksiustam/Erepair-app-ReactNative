import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  let user = await prisma.User.findMany();

  return NextResponse.json(user);
}
