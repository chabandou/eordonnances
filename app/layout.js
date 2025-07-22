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
        <div className="h-[100vh] flex flex-row">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
