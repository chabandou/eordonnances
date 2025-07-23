import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "eOrdonnances",
  description: "Ordonnaces pour faciliter vos consultations médicales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen w-full flex flex-row overflow-x-hidden">
          <Navbar />
          <div className="flex-1 pb-[78px] lg:pl-[78px]">{children}</div>
        </div>
      </body>
    </html>
  );
}
