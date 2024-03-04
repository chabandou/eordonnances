"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="container flex justify-start align-middle p-4 gap-4">
      <Link className="hover:cursor-pointer text-2xl font-bold" href="/">
        eOrdonnances
      </Link>

      <Link
        className={clsx(
          "hover:cursor-pointer text-xl rounded-lg p-2 transition duration-300",
          pathname === "/" && " font-bold text-teal-400 bg-teal-950 ring-teal-400"
        )}
        href="/"
      >
        🏠 Accueil
      </Link>
      <Link className={clsx(
          "hover:cursor-pointer text-xl rounded-lg p-2",
          pathname === "/diseases" && "transition duration-300 font-bold text-teal-400 bg-teal-950"
        )} href="/diseases">
        🔍 Recherchez
      </Link>
      <Link className={clsx(
          "hover:cursor-pointer text-xl rounded-lg p-2",
          pathname === "/diseases/add" && "transition duration-300 font-bold text-teal-400 bg-teal-950"
        )} href="/diseases/add">
        ➕ Ajouez une maladie
      </Link>
    </div>
  );
}
