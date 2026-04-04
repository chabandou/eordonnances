import { connectToMongoDB } from "@/app/libs/mongodb";
import { sanitizeSearchQuery } from "@/app/libs/validation/sanitize";
import { searchQuerySchema, validateData } from "@/app/libs/validation/schemas";
import InfiniteDiseaseList from "@/app/ui/index/InfiniteDiseaseList";
import Disease from "@/models/diseaseModel";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Search from "../ui/search";

import AnimatedTitle from "@/app/ui/diseases/AnimatedTitle";
import DiseasesPageWrapper from "@/app/ui/DiseasesPageWrapper";


// Cache specialty list for 1 hour
export const revalidate = 3600;

const ITEMS_PER_PAGE = 20;

// Generate dynamic metadata based on search params
export async function generateMetadata({ searchParams }) {
  const resolvedParams = await searchParams;
  const q = resolvedParams?.q || "";
  const specialty = resolvedParams?.specialty || "";

  let title = "Recherche de Maladies et Traitements";
  let description =
    "Recherchez des maladies et consultez les traitements recommandés par spécialité médicale.";

  if (specialty && q) {
    title = `${q} en ${specialty} - Traitements et Ordonnances`;
    description = `Consultez les traitements et ordonnances pour ${q} en ${specialty}. Guide médical complet.`;
  } else if (specialty) {
    title = `${specialty} - Maladies et Traitements`;
    description = `Découvrez toutes les maladies et traitements en ${specialty}. Guide des ordonnances médicales.`;
  } else if (q) {
    title = `${q} - Recherche de Traitements`;
    description = `Recherchez les traitements et ordonnances pour ${q}. Guide médical complet.`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/ diseases${specialty ? `?specialty=${specialty}` : ""}${q ? `${specialty ? "&" : "?"}q=${q}` : ""} `,
    },
    alternates: {
      canonical: `/ diseases${specialty ? `?specialty=${specialty}` : ""}${q ? `${specialty ? "&" : "?"}q=${q}` : ""} `,
    },
  };
}

// Optimized: Get specialties from distinct query instead of fetching all diseases
async function getSpecialties() {
  try {
    await connectToMongoDB(`getSpecialties`);

    // Use distinct() for much faster query - only gets unique specialties
    const specialties = await Disease.distinct("disease.specialty");

    return specialties.filter(Boolean); // Remove any null/undefined values
  } catch (error) {
    console.error("Error fetching specialties:", error);
    // Return empty array as fallback - app can still work without specialty filter
    return [];
  }
}

// Optimized: Simple query for initial diseases
async function getDiseases(q, specialty) {
  try {
    // Sanitize search inputs to prevent injection
    const sanitizedQ = sanitizeSearchQuery(q);
    const sanitizedSpecialty = sanitizeSearchQuery(specialty);

    // Build query once
    const matchQuery = {};
    if (sanitizedQ)
      matchQuery["disease.name"] = { $regex: sanitizedQ, $options: "i" };
    if (sanitizedSpecialty)
      matchQuery["disease.specialty"] = {
        $regex: sanitizedSpecialty,
        $options: "i",
      };

    await connectToMongoDB("getDiseases");

    // Simple aggregation to get just the first batch of data
    const diseases = await Disease.aggregate([
      { $match: matchQuery },
      { $project: { Rx: 0, DDx: 0, Dx: 0 } }, // Optimize: exclude heavy fields
      { $limit: ITEMS_PER_PAGE },
    ]);

    // Convert to plain JavaScript objects
    return JSON.parse(JSON.stringify(diseases));
  } catch (error) {
    console.error("Error fetching diseases:", error);

    // Check if it's a MongoDB connection error
    if (error.name === "MongooseError" || error.name === "MongoError") {
      throw new Error(
        "Erreur de connexion à la base de données. Veuillez réessayer plus tard.",
      );
    }

    // Rethrow other errors to be caught by error boundary
    throw error;
  }
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
  // Validate and sanitize search parameters
  const resolvedParams = await searchParams;
  const validation = validateData(searchQuerySchema, resolvedParams);

  if (!validation.success) {
    // Invalid parameters - redirect to clean page
    notFound();
  }

  const { q, specialty } = validation.data;

  try {
    // Parallel execution of independent queries
    // We fetch specialties (for the filter dropdown) and the main disease list simultaneously
    // to prevent a waterfall effect and improve page load speed.
    const [specialtiesArray, diseases] = await Promise.all([
      getSpecialties(),
      getDiseases(q, specialty),
    ]);

    // Structured data for search results
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: diseases.slice(0, 10).map((disease, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "MedicalCondition",
          name: disease.disease.name,
          description: disease.disease.definition || "Maladie médicale",
          medicineSystem: "Médecine occidentale",
          specialty: disease.disease.specialty,
          url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://eordonnances.com"} /diseases/${disease._id} `,
        },
      })),
      numberOfItems: Math.min(diseases.length, 10),
    };

    return (
      /* 
         DiseasesPageWrapper:
         - Acts as the client-side Context Provider (UIContext)
         - Manages shared state like keeping track of the selected disease (for FLIP animations)
         - Handles complex transitions between the list view and the detail view
      */
      <DiseasesPageWrapper specialty={specialty}>
        <div className="flex flex-col lg:flex-row h-auto min-h-screen lg:h-screen w-full bg-[var(--background-color)] overflow-y-auto lg:overflow-hidden relative">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

          <div className="w-full lg:w-[52%] min-w-0 lg:min-w-[450px] p-8 lg:px-12 lg:py-20 flex flex-col justify-between relative overflow-hidden z-[2] text-[#0d2a27] min-h-[250px] lg:min-h-0">
            {/* 
              FadeContainer orchestrates the exit animation of the page content.
              When a user clicks a card, this container fades out and moves up 
              to clear the view for the expanding detail card.
            */}
            <div className="flex flex-col w-full">
              <AnimatedTitle
                specialty={specialty}
                className="text-5xl lg:text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[0.95] py-3 tracking-tight uppercase m-0 dark:text-white"
              />
              {/* <p className="text-xl font-medium mt-4 opacity-80">Base de données v2.4</p> */}
            </div>
          </div>

          <main className="flex flex-1 flex-col h-auto lg:h-full min-w-0 p-6 lg:py-6 lg:px-0 overflow-visible relative z-[2] dark:bg-transparent">
            <div className="w-full h-full flex flex-col">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between mb-8 lg:mb-6 gap-6 lg:gap-12 w-full px-6">
                {/* 
                  Layout hack: Increase width to 120% and pull back with negative margin
                  This creates an offset look for the search bar relative to other content
                */}
                <div className="w-[120%] -ml-[20%]">
                  <div className="w-full max-w-2xl mx-auto">
                    <Search
                      placeholder="Rechercher des maladies ou des symptômes"
                      specialties={specialtiesArray}
                    />
                  </div>
                </div>
              </div>

              <Suspense fallback={<DiseasesLoading />}>
                <div className="flex flex-col flex-1 w-full min-h-0 px-6 h-auto lg:h-full overflow-visible">
                  {diseases.length === 0 ? (
                    <div className="text-center py-12 space-y-4 z-10">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700">
                        Aucun résultat trouvé
                      </h3>
                      <p className="text-gray-500">
                        {q
                          ? `Aucune maladie ne correspond à "${q}"`
                          : "Aucune maladie disponible"}
                      </p>
                    </div>
                  ) : (
                    <InfiniteDiseaseList
                      q={q}
                      specialty={specialty}
                      initialDiseases={diseases}
                    />
                  )}
                </div>
              </Suspense>
            </div>
          </main>
        </div>
      </DiseasesPageWrapper>
    );
  } catch (error) {
    // Log error for monitoring
    console.error("Page error:", error);

    // Rethrow to be caught by error boundary
    throw error;
  }
}
