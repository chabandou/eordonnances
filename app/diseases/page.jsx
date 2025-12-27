import { connectToMongoDB } from "@/app/libs/mongodb";
import Disease from "@/models/diseaseModel";
import Search from "../ui/search";
import Pagination from "../ui/index/pagination";
import DiseaseCards from "@/app/ui/index/DiseaseCards";
import { Suspense } from "react";

// Cache specialty list for 1 hour
export const revalidate = 3600;

const ITEMS_PER_PAGE = 20;

// Optimized: Get specialties from distinct query instead of fetching all diseases
async function getSpecialties() {
  await connectToMongoDB(`getSpecialties`);
  
  // Use distinct() for much faster query - only gets unique specialties
  const specialties = await Disease.distinct("disease.specialty");
  
  return specialties.filter(Boolean); // Remove any null/undefined values
}

// Optimized: Single aggregation pipeline for count and pagination
async function getDiseasesWithCount(q, currentPage, specialty) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  // Build query once
  const matchQuery = {};
  if (q) matchQuery["disease.name"] = { $regex: q, $options: "i" };
  if (specialty) matchQuery["disease.specialty"] = { $regex: specialty, $options: "i" };

  await connectToMongoDB("getDiseases");
  
  // Single aggregation pipeline with facet for count and data
  const result = await Disease.aggregate([
    { $match: matchQuery },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $project: { Rx: 0, DDx: 0, Dx: 0 } },
          { $skip: offset },
          { $limit: ITEMS_PER_PAGE }
        ]
      }
    }
  ]);

  const total = result[0]?.metadata[0]?.total || 0;
  const diseases = result[0]?.data || [];

  // Convert to plain JavaScript objects (removes Mongoose methods and ObjectId methods)
  return { 
    diseases: JSON.parse(JSON.stringify(diseases)), 
    count: total 
  };
}

// Loading component
function DiseasesLoading() {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
        <div className="h-12 bg-gray-200 rounded w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function Page({ searchParams }) {
  const q = searchParams?.q || "";
  const specialty = searchParams?.specialty || "";
  const currentPage = Number(searchParams?.page) || 1;

  // Parallel execution of independent queries
  const [specialtiesArray, { diseases, count }] = await Promise.all([
    getSpecialties(),
    getDiseasesWithCount(q, currentPage, specialty)
  ]);

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <main className="w-full flex flex-col items-center justify-center min-h-screen py-4">
      <Search
        placeholder="Rechercher une maladie"
        specialties={specialtiesArray}
      />
      
      <Suspense fallback={<DiseasesLoading />}>
        <div className="flex-1 w-full flex flex-col items-center justify-center mt-2 mb-4 lg:mb-0 lg:mt-0">
          <DiseaseCards q={q} specialty={specialty} diseases={diseases} />
        </div>
      </Suspense>

      {totalPages > 1 && (
        <div className="py-4">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </main>
  );
}
