"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Rx from "@/app/ui/icons/Rx";
import Add from "@/app/ui/icons/Add";
import Search from "@/app/ui/icons/Search";
import Home from "@/app/ui/icons/Home";
import { useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    const menu = document.querySelector(".menu");
    const menuLinks = menu.querySelectorAll("a");

    const activeClass = "active";
    

    for (const menuLink of menuLinks) {
      menuLink.addEventListener("mouseenter", function () {

        doCalculations(menuLink);
      });
    }
    function doCalculations(link) {
      menu.style.setProperty("--transformJS", `${link.offsetTop}px`);
      menu.style.setProperty("--widthJS", `${link.offsetWidth}px`);
    }
  }, []);
  return (
    <div className="nav-container py-3 px-4 m-auto z-50">
      <header className="flex flex-col w-fit items-start justify-start gap-y-6 m-auto">
        <Link className="hover:cursor-pointer text-2xl font-bold" href="/">
          <div className="flex items-center justify-start gap-1">
            <Rx className="" />
            <span>eOrdonnances</span>
          </div>
        </Link>
      </header>
      <div className="menu flex h-fit flex-col items-start justify-start gap-y-3 mt-4 m-auto">
        <NavLink href="/" title="Accueil" icon={<Home />} i={0} />
        <NavLink href="/diseases" title="Recherchez" icon={<Search />} i={1} />
        <NavLink href="/diseases/add" title="Ajouter" icon={<Add />} i={2} />
      </div>
    </div>
  );
}

function NavLink({ href, title, icon, i }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={clsx(
        "nav-link flex text-md text-gray-400 hover:text-gray-400 hover:cursor-pointer",
        pathname === href && "active"
      )}
    >
      <i>{icon}</i>
      <span>{title}</span>
    </Link>
  );
}
