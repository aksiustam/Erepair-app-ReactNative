import React from "react";

import { redirect } from "next/navigation";
import Sidebar from "../components/Layout/Sidebar";
import { getCurrentUser } from "../actions/getCurrentUser";
const page = async () => {
  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>YAPIM AŞAMASINDA</main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
};

export default page;
