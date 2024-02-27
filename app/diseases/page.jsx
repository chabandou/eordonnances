import Link from "next/link";
import Search from "../ui/search";
import Pagination from "../ui/index/pagination";


async function getDiseases(query, page, specialty) {
  const resposnse = await fetch(
    `https://eordonnances.vercel.app/api/disease?q=${query}&page=${page}&specialty=${specialty}`
  );
  const data = await resposnse.json();
  return data;
}

async function countDiseases() {
  const resposnse = await fetch(`https://eordonnances.vercel.app/api/disease/count`);
  const data = await resposnse.json();
  return data;
}
async function getSpecialties() {
  const resposnse = await fetch(`https://eordonnances.vercel.app/api/disease/specialties`);
  const data = await resposnse.json();
  return data;
}

const ITEMS_PER_PAGE = 30;
export default async function Page({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const specialty = searchParams?.specialty || "";
  const currentPage = searchParams?.page || 1;
  const { diseasesCount } = await countDiseases();
  const totalPages = Math.ceil(diseasesCount / ITEMS_PER_PAGE);
  const { diseases } = await getDiseases(q, page, specialty);
  const { specialties } = await getSpecialties();
  const specialtiesArray = specialties.map((d) => d.disease.specialty);
  function flattenArray(array) {
    const result = [];
    for (const item of array) {
      if (Array.isArray(item)) {
        result.push(...item);
      } else if( typeof item === "string") {
        result.push(item);
      }
    }
    return result;
  }
  function removeDuplicates(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
  }

  const flatSpecialties = flattenArray(specialtiesArray);
  const finalSpecialties = removeDuplicates(flatSpecialties);

  return (
    <main className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 place-items-center bg-teal-950 bg-opacity-30">
      <Search placeholder="Rechercher une maladie" specialties={finalSpecialties} />
      {diseases.map((d) => (
        <Link
          key={d._id}
          href={`/diseases/${d._id}`}
          className="hover:cursor-pointer border-transparent rounded-3xl text-xl sm:w-full lg:w-1/3 m-4 "
        >
          <div
            className="flex flex-col border-4 rounded-3xl p-4 gap-3 bg-teal-950 bg-opacity-50 transit hover:bg-teal-800 hover:first:text-sky-200"
            key={d._id}
          >
            <h2 className="font-bold text-teal-400  ">{d.disease.name}</h2>
            <h3 className="text-white text-opacity-80 uppercase text-base">
              {d.disease.specialty}
            </h3>
          </div>
        </Link>
      ))}
      <Pagination className="mt-4" totalPages={totalPages} />
    </main>
  );
}
