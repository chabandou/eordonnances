"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Rx from "@/app/ui/icons/Rx";
import Add from "@/app/ui/icons/Add";
import Search from "@/app/ui/icons/Search";
import Home from "@/app/ui/icons/Home";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useRef } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();

  const menuRef = useRef(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const menuLinks = menu.querySelectorAll(`.${styles.navLink}`);
    const handlers = [];

    function doCalculations(link) {
      menu.style.setProperty("--transformJS", `${link.offsetTop}px`);
      menu.style.setProperty("--widthJS", `${link.offsetWidth}px`);
    }

    for (const menuLink of menuLinks) {
      const handler = () => doCalculations(menuLink);
      menuLink.addEventListener("mouseenter", handler);
      handlers.push({ el: menuLink, handler });
    }

    return () => {
      handlers.forEach(({ el, handler }) => el.removeEventListener("mouseenter", handler));
    };
  }, []);
  return (
    <div className={clsx(styles.navContainer, "py-3 px-4 z-50")}>
      <header className="hidden lg:flex flex-col w-fit items-start justify-start gap-y-6 m-auto">
        <Link className="hover:cursor-pointer text-2xl font-bold" href="/">
          <div className={clsx("hidden lg:flex items-center justify-start gap-1", styles.branding)}>
            <Rx className="" />
            <span className={styles.headerTitle}>eOrdonnances</span>
          </div>
        </Link>
      </header>
      <div ref={menuRef} className={styles.menu}>
        <NavLink href="/" title="Accueil" icon={<Home />} i={0} />
        <NavLink href="/diseases" title="Recherchez" icon={<Search />} i={1} />
        <NavLink href="/diseases/add" title="Ajouter" icon={<Add />} i={2} />
        <div className="mt-auto lg:mb-4 w-full">
          <div className={styles.navLink}>
            <ThemeToggle />
          </div>
        </div>
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
        styles.navLink,
        pathname === href && styles.active
      )}
    >
      <i className={styles.i}>{icon}</i>
      <span className={clsx("hidden lg:inline", styles.navLinkSpan)}>{title}</span>
    </Link>
  );
}
