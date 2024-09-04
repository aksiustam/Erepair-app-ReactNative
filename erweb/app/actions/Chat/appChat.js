"use server";
import prisma from "@/lib/prismadb";
import admin from "firebase-admin";
import serviceAccount from "@/firebaseadmin.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
export default async function appChat(data, text) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });
    let token = user.firebaseToken;

    await prisma.chat.update({
      where: { id: data.id },
      data: data,
    });

    const payload = {
      notification: {
        title: "Destek Ekibinden Mesaj Geldi",
        body: text,
      },
      token,
    };
    await admin.messaging().send(payload);

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
