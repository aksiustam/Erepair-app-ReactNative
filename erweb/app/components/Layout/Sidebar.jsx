"use client";
import Link from "next/link";
import React from "react";
import Logo from "@/public/Logo.png";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ChatPage from "./ChatPage";
const Sidebar = ({ children, chat }) => {
  const router = useRouter();

  return (
    <>
      <aside
        className={` bg-deep-orange-700 fixed  z-50 my-4 ml-4 h-[calc(100vh-32px)] w-48 rounded-xl  `}
      >
        <Link href="/">
          <div className="flex flex-col items-center gap-2  py-4 px-8">
            <Image
              src={Logo}
              alt="LOGO"
              width={1000}
              height={1000}
              className="h-24 w-24 "
            />
            <div className={`border w-full  border-white/80 `} />
            <Typography variant="small" color="white">
              Hoşgeldiniz
            </Typography>
            <div className={`border w-full  border-white/80 `} />
          </div>
        </Link>
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
            <li>
              <Link href={`/`}>
                <Button
                  variant="text"
                  color="white"
                  className="flex items-center gap-4 capitalize"
                  fullWidth
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-black uppercase opacity-75"
                  >
                    Anasayfa
                  </Typography>
                </Button>
              </Link>
            </li>
            <li>
              <Link href={`/tamir`}>
                <Button
                  variant="text"
                  color="white"
                  className="flex items-center gap-4 capitalize"
                  fullWidth
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-black uppercase opacity-75"
                  >
                    Tamirler
                  </Typography>
                </Button>
              </Link>
            </li>
            <li>
              <Link href={`/musteriler`}>
                <Button
                  variant="text"
                  color="white"
                  className="flex items-center gap-4 capitalize"
                  fullWidth
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-black uppercase opacity-75"
                  >
                    Müşteriler
                  </Typography>
                </Button>
              </Link>
            </li>

            <li>
              <Link href={`/ayarlar`}>
                <Button
                  variant="text"
                  color="white"
                  className="flex items-center gap-4 capitalize"
                  fullWidth
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-black uppercase opacity-75"
                  >
                    Ayarlar
                  </Typography>
                </Button>
              </Link>
            </li>
            <li>
              <Button
                variant="text"
                color="white"
                className="flex items-center gap-4 capitalize"
                fullWidth
                onClick={() => {
                  signOut();
                  router.push("/");
                  location.reload();
                }}
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-black uppercase opacity-75"
                >
                  Çıkış Yap
                </Typography>
              </Button>
            </li>
          </ul>
        </div>
      </aside>
      <div className="ml-56 pt-6 flex flex-1 overflow-x-auto">{children}</div>
      <ChatPage />
    </>
  );
};

export default Sidebar;
