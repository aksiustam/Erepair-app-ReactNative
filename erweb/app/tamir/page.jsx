import { redirect } from "next/navigation";
import { getCurrentUser } from "../actions/getCurrentUser";
import Sidebar from "../components/Layout/Sidebar";

export default async function Home() {
  const User = await getCurrentUser();

  const Auth = User && User.Role === "ADMIN" ? true : false;

  if (Auth) {
    return (
      <Sidebar>
        <main>TAMİR</main>
      </Sidebar>
    );
  } else {
    redirect("/");
  }
}
