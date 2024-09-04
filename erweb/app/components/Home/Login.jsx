"use client";

import Image from "next/image";
import logo from "@/public/Logo.png";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@material-tailwind/react";
const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { ok, error } = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (ok) {
        await Swal.fire({
          icon: "success",
          title: "Hoşgeldiniz",
          showConfirmButton: false,
          timer: 1200,
        });
        router.push("/");
        router.refresh();
      }

      if (error) {
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-3">
        <Image
          src={logo}
          alt="Ender Gençlik Logo"
          width={1200}
          height={1200}
          className="w-32 h-32 object-contain"
        />
        <h1 className="text-2xl font-bold">E-Repair Admin Sitesi</h1>
        <div className="text-lg font-semibold">Giriş Yap</div>
        <div className="text-lg font-semibold text-qred">{error && error}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 flex flex-col gap-4">
            <Input
              size="lg"
              label="email"
              name="email"
              type="text"
              {...register("email", { required: true })}
            />
            <Input
              size="lg"
              label="password"
              name="password"
              type="password"
              {...register("password", { required: true })}
            />
            <Button className="mt-3" fullWidth type="submit">
              Giriş Yap
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
