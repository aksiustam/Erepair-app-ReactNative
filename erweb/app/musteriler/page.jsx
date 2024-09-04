import { redirect } from "next/navigation";

import Sidebar from "../components/Layout/Sidebar";
import { getCurrentUser } from "../actions/getCurrentUser";

export default async function Home() {
  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>MUSTERİLER</main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
}
