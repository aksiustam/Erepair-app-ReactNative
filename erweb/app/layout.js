import { Inter } from "next/font/google";
import "./globals.css";
import MaterialContext from "@/context/MaterialContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ERepair Website",
  description: "ERepair Websitesi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <MaterialContext>
          <div className="w-full h-full ">{children}</div>
        </MaterialContext>
      </body>
    </html>
  );
}
