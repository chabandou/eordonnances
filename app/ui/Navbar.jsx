import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import Rx from "@/app/ui/icons/Rx";
import Add from "@/app/ui/icons/Add";
import Search from "@/app/ui/icons/Search";
import Home from "@/app/ui/icons/Home";
import { Bars3Icon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

import { useUI } from "./UIContext";

export default function Navbar() {
  const pathname = usePathname();
  const { isHeroExpanding } = useUI();
  const [isHovered, setIsHovered] = useState(false);

  // Hide Navbar on large screens for disease details page: /diseases/[id]
  // We check if it starts with /diseases/ and has a segment after it, BUT exclude /diseases/add
  const isDetailsPage = /^\/diseases\/[^/]+$/.test(pathname) && pathname !== '/diseases/add';
  const isAddPage = pathname === '/diseases/add';

  const shouldCollapse = isAddPage && !isHovered;

  return (
    <nav
      className={clsx(
        styles.navContainer,
        isDetailsPage && styles.hiddenOnDesktop,
        shouldCollapse && styles.collapsed
      )}
      style={{
        opacity: isHeroExpanding ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: isHeroExpanding ? 'none' : 'auto'
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hamburger Icon (Visible when collapsed) */}
      <div
        className={styles.hamburgerContainer}
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className={styles.iconWrapper}>
          <Bars3Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Menu Items (Visible when expanded) */}
      <div className={styles.menuItems}>
        <div className={styles.menuItem}>
          <ThemeToggle />
        </div>
        <div className={styles.menuItem}>
          <NavLink href="/diseases/add" title="AJOUTER" icon={<Add />} />
        </div>
        <div className={styles.menuItem}>
          <NavLink href="/diseases" title="RECHERCHE" icon={<Search />} />
        </div>
        <div className={styles.menuItem}>
          <NavLink href="/" title="ACCUEIL" icon={<Home />} />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, title, icon }) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        styles.navLink,
        isActive && styles.active
      )}
      onMouseEnter={() => router.prefetch(href)}
    >
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <span className={styles.navLabel}>{title}</span>
    </Link>
  );
}
