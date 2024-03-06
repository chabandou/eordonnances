import Link from "next/link";
import Search from "../ui/search";
import Pagination from "../ui/index/pagination";
import * as fs from "node:fs";
import Disease from "@/models/diseaseModel";
import { connectToMongoDB } from "@/app/libs/mongodb";
import DiseaseCard from "../ui/index/DiseaseCard";



async function countDiseases(q, specialty) {
  const query = q
  ? specialty
    ? {
        "disease.name": { $regex: `${q}`, $options: "i" },
        "disease.specialty": { $regex: `${specialty}`, $options: "i" },
      }
    : { "disease.name": { $regex: `${q}`, $options: "i" } }
  : specialty
  ? { "disease.specialty": { $regex: `${specialty}`, $options: "i" } }
  : {};
  await connectToMongoDB(`countDiseases`);
  const count = await Disease.countDocuments(query);
  return count;
}
async function getSpecialties() {
  await connectToMongoDB(`getSpecialties`);
  const specialties = await Disease.aggregate([
    { $match: {} }, // filter by query
    { $project: { "disease.name": 0, DDx: 0, Dx: 0, _id: 0, Rx: 0 } }, // remove Rx, DDx and Dx fields
  ])
  return specialties
}

// async function getMedications() {
//   const resposnse = await fetch(`http://localhost:3000/api/medications`);
//   const data = await resposnse.json();
//   const { Rxes } = data;
//   const preMedications = Rxes.map((Rx) => {
//     return Rx.Rx
//   })
//   const medications = preMedications.flat();
//   const medicationNames = medications.map((mdc) => {
//     if (typeof mdc.name === "string") {
//       return mdc.name
//     } else if (typeof mdc === "object") {
//       return Object.values(mdc).flatMap((mdc) => mdc).map((mdc) => mdc.name)
//     } else {
//       return mdc
//     }
//   });
//   return medicationNames.flat();
// }

// const finalMdcNames = await getMedications();

async function getDiseases(q, currentPage, specialty) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const query = q
    ? specialty
      ? {
          "disease.name": { $regex: `${q}`, $options: "i" },
          "disease.specialty": { $regex: `${specialty}`, $options: "i" },
        }
      : { "disease.name": { $regex: `${q}`, $options: "i" } }
    : specialty
    ? { "disease.specialty": `${specialty}`}
    : {};
  await connectToMongoDB("getDiseases");
  const diseases = await Disease.aggregate([
    { $match: query }, // filter by query
    { $project: { Rx: 0, DDx: 0, Dx: 0 } }, // remove Rx, DDx and Dx fields
  ])
    .limit(ITEMS_PER_PAGE) // limit to 25 documents retrieved
    .skip(offset); // skip the first 25 items
  return  JSON.parse(JSON.stringify(diseases));
}

const ITEMS_PER_PAGE = 20;
export default async function Page({ searchParams }) {

  const q = searchParams?.q || "";
  const specialty = searchParams?.specialty || "";
  const currentPage = searchParams?.page || 1;

  const diseasesCount = await countDiseases(q, specialty);
  console.log(diseasesCount);
  const totalPages = Math.ceil(diseasesCount / ITEMS_PER_PAGE);
  const diseases = await getDiseases(q, currentPage, specialty);
  const specialties = await getSpecialties();
  const specialtiesArray = specialties.flatMap((d) => d.disease.specialty);

  function removeDuplicates(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
  }

  const finalSpecialties = removeDuplicates(specialtiesArray)

  return (
    <main className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 place-items-center bg-gray-800 bg-opacity-30">
      <Search
        placeholder="Rechercher une maladie"
        specialties={finalSpecialties}
      />
      {diseases.map((d) => (
        <DiseaseCard key={d._id} d={d} />
      ))}
      <Pagination className="mt-4" totalPages={totalPages} />
    </main>
  );
}
