"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DropDown from "@/app/ui/DropDown";
import SearchGlass from "@/app/ui/icons/SearchGlass";
import styles from "./Search.module.css";
import clsx from "clsx";

export default function Search({ placeholder, specialties }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
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


  return (
    <section className="w-4/5 lg:w-[50%] flex flex-col lg:flex-row justify-center items-center m-4 p-0 gap-4 h-fit">
      <div className={clsx(styles.searchContainer, "flex flex-1 grow transition-all duration-300 ease-in-out")}>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className={clsx(styles.searchBox, "ps-10 flex-grow w-full h-14")}
          id="search"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("q")?.toString()}
        />
        <SearchGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
      </div>
      <DropDown replace={replace} searchParams={searchParams} pathname={pathname} items={specialties} />
    </section>
  );
}
