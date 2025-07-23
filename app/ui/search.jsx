"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DropDown from "@/app/ui/DropDown";
import SearchGlass from "@/app/ui/icons/SearchGlass";

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
    <section className="w-4/5 lg:w-[40%] flex flex-col lg:flex-row justify-center items-center  m-4 p-0 gap-4 h-fit ">
      <div className="search-container relative w-full flex flex-1 grow transition-all duration-300 ease-in-out">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="search-box ps-10 flex-grow w-full h-14 "
          id="search"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("q")?.toString()}
        />
        <SearchGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
      </div>
      {/* <select
        onChange={(e) => handleFilter(e.target.value)}
        className="peer block w-1/3 h-12 rounded-lg border-2 border-gray-200 py-[9px] pl-10 text-sm outline-2 bg-gray-950 bg-opacity-40 transition-all duration-300 ease-in-out focus:bg-opacity-60 text-gray-100 hover:bg-gray-900  hover:text-gray-400 hover:border-gray-600"
        name="specialties"
        id="specialties"
      >
        <option className="transition-all duration-300 ease-in-out" value="" defaultValue={true}>
          All
        </option>
        {specialties.map((specialty) => (
          <option
            key={specialty}
            value={specialty}
            className="bg-gray-950 text-gray-100 transition-all duration-300 ease-in-out"
          >
            {specialty}
          </option>
        ))}
      </select> */}
      <DropDown replace={replace} searchParams={searchParams} pathname={pathname} items={specialties} />
    </section>
  );
}
