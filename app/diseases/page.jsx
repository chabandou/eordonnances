import Link from "next/link";
import Search from "../ui/search";

async function getDiseases(query) {
  const resposnse = await fetch(`http://localhost:3000/api/disease?q=${query}`);
  const data = await resposnse.json();
  return data;
}

export default async function Page({ searchParams }) {
  const q = searchParams?.q || "";
  const currentPage = searchParams?.page || 1;
  const { diseases } = await getDiseases(q);

  return (
    <main className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 place-items-center">
      <Search placeholder="Rechercher une maladie" />
      {diseases.map((d) => (
        <div
          className="flex flex-col border-4 rounded-3xl m-4 p-3 gap-2 sm:w-full lg:w-1/3 hover:bg-slate-700 hover:first:text-sky-200"
          key={d._id}
        >
          <Link
            href={`/diseases/${d._id}`}
            className="text-sky-500 hover:cursor-pointer text-xl"
          >
            <h2 className="font-bold">{d.disease.name}</h2>
            <h3 className="text-slate-300">{d.disease.specialty}</h3>
          </Link>
        </div>
      ))}
    </main>
  );
}
