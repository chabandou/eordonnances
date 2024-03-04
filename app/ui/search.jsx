"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
  function handleFilter(specialty) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (specialty) {
      params.set("specialty", specialty);
    } else {
      params.delete("specialty");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <section className="flex justify-center items-center p-0 w-1/3 m-3 gap-2">
      <div className="relative flex flex-1 grow transition-all duration-300 ease-in-out *:hover:text-teal-400 *:hover:border-teal-600 *:hover:placeholder:text-teal-400">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full h-12 rounded-lg border-2 border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-200 bg-teal-950 bg-opacity-40 transition-all duration-300 ease-in-out focus:bg-opacity-60 text-slate-100 hover:bg-teal-900"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("q")?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white peer-focus:text-gray-200" />
      </div>
      <select
        onChange={(e) => handleFilter(e.target.value)}
        className="peer block w-1/3 h-12 rounded-lg border-2 border-gray-200 py-[9px] pl-10 text-sm outline-2 bg-teal-950 bg-opacity-40 transition-all duration-300 ease-in-out focus:bg-opacity-60 text-slate-100 hover:bg-teal-900  hover:text-teal-400 hover:border-teal-600"
        name="specialties"
        id="specialties"
      >
        <option value="" defaultValue={true}>
          All
        </option>
        {specialties.map((specialty) => (
          <option key={specialty} value={specialty} className="bg-teal-950 text-teal-100 leading-3">
            {specialty}
          </option>
        ))}
      </select>
    </section>
  );
}
