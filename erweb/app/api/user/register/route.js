import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const data = await req.json();
  let user = null;
  user = await prisma.User.findFirst({
    where: {
      email: data?.email,
    },
  });
  if (user) {
    return NextResponse.json(
      {
        message:
          "Bu Email'de Kayıt var. Şifrenizi Unuttum'dan şifrenizi sıfırlayabilirsiniz!",
      },
      { status: 500 }
    );
  } else {
    const encryptedPassword = await bcrypt.hash(data?.pass, 10);

    const newuser = await prisma.User.create({
      data: {
        name: data?.name,
        email: data?.email,
        password: encryptedPassword,
        deviceID: data?.deviceID,
        firebaseToken: data?.firebaseToken || null,
      },
    });
    return NextResponse.json(newuser);
  }
}
