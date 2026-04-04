"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useTransitionState } from "next-transition-router";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DropDown from "@/app/ui/DropDown";
import SearchGlass from "@/app/ui/icons/SearchGlass";
import { getSpecialtyColors, SPECIALTY_COLORS } from "@/app/libs/specialties";
import styles from "./Search.module.css";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "@/app/ui/UIContext";

export default function Search({ placeholder, specialties }) {
  const { stage } = useTransitionState();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { selectedDisease, isClosing } = useUI();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  const specialty = searchParams.get("specialty");
  const specialtyColors = specialty ? getSpecialtyColors(specialty) : null;
  const activeColor = specialtyColors ? specialtyColors.g1 : "#00c7a9";

  return (
    <AnimatePresence>
      {stage !== "leaving" && (
        <motion.section
          key="search-bar"
          className="flex flex-1 flex-col lg:flex-row justify-between items-center m-0 p-0 gap-2 h-fit"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: selectedDisease && !isClosing ? 0 : 1, y: 0 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
          transition={{
              duration: 0.2, 
              delay: isClosing && !selectedDisease ? 0.1 : 0 
          }}
        >
      <div className={clsx(styles.searchContainer, "flex flex-1 grow transition-all duration-300 ease-in-out")}>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className={styles.searchBox}
          id="search"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("q")?.toString()}
          style={{ "--active-border-color": activeColor }}
        />
        <SearchGlass className={styles.searchIcon} />
      </div>
      <DropDown replace={replace} searchParams={searchParams} pathname={pathname} items={specialties} />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
