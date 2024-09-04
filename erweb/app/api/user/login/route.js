import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const data = await req.json();

  let user = await prisma.User.findUnique({
    where: {
      email: data?.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Bu Kullanıcı Adı bulunamamaktadır!" },
      { status: 500 }
    );
  } else {
    const comparePassword = await bcrypt.compare(data?.password, user.password);

    if (!comparePassword) {
      return NextResponse.json(
        { message: "Şifreniz Yanlış!" },
        { status: 500 }
      );
    }
    await prisma.User.update({
      where: {
        email: data?.email,
      },
      data: {
        firebaseToken: data?.firebaseToken,
      },
    });

    return NextResponse.json(user);
  }
}
