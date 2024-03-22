"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DropDown from "@/app/ui/DropDown";

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
    <section className="flex justify-center items-center p-0 w-1/3 m-3 gap-2">
      <div className="relative flex flex-1 grow transition-all duration-300 ease-in-out *:hover:text-gray-400 *:hover:border-gray-600 *:hover:placeholder:text-gray-400">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer flex-grow w-full h-12 rounded-lg border-2 border-white border-opacity-60 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-200 bg-gray-950 bg-opacity-40 transition-all duration-300 ease-in-out focus:bg-opacity-60 text-slate-100 hover:bg-gray-900"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("q")?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white peer-focus:text-gray-200" />
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
