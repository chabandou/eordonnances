import { connectToMongoDB } from "@/app/libs/mongodb";
import Disease from "@/models/diseaseModel";
import Link from "next/link";
import RxCard from "@/app/ui/details/RxCard";
import RxArray from "@/app/ui/details/RxArray";
import RxObject from "@/app/ui/details/RxObject";
import { notFound } from "next/navigation";

import WaveT from "@/app/ui/rx-shapes/WaveT";
import WaveB from "@/app/ui/rx-shapes/WaveB";
import PillBottle from "@/app/ui/rx-shapes/PillBottle";
import Pills from "@/app/ui/rx-shapes/Pills";
import Union from "@/app/ui/rx-shapes/Union";

export const revalidate = +(process.env.NEXT_REVALIDATION_TIME || 0) || 60;
export const dynamic = "force-dynamic";

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const id = params.id;
  
  try {
    // Validate MongoDB ObjectId format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return {
        title: "Maladie introuvable",
        description: "La maladie demandée n'existe pas.",
      };
    }

    await connectToMongoDB("getDiseaseMeta");
    const disease = await Disease.findById(id).lean();

    if (!disease) {
      return {
        title: "Maladie introuvable",
        description: "La maladie demandée n'existe pas.",
      };
    }

    const diseaseName = disease.disease?.name || "Maladie";
    const specialty = disease.disease?.specialty || "";
    const definition = disease.disease?.definition || "";

    return {
      title: `${diseaseName} - Traitement et Ordonnance`,
      description: definition.substring(0, 160) || `Consultez le traitement et l'ordonnance médicale pour ${diseaseName}. Guide médical complet avec médicaments recommandés.`,
      keywords: [
        diseaseName,
        `traitement ${diseaseName}`,
        `ordonnance ${diseaseName}`,
        specialty,
        "médicaments",
        "prescription médicale",
      ],
      openGraph: {
        title: `${diseaseName} - Traitement et Ordonnance`,
        description: definition.substring(0, 200) || `Guide de traitement pour ${diseaseName}`,
        url: `/diseases/${id}`,
        type: "article",
      },
      alternates: {
        canonical: `/diseases/${id}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Maladie",
      description: "Informations sur la maladie",
    };
  }
}

// Get disease by ID with error handling
async function getDisease(id) {
  try {
    // Validate MongoDB ObjectId format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return null;
    }

    await connectToMongoDB("get1Disease");
    
    // Use .lean() for 30% faster queries - returns plain JavaScript object
    const foundDisease = await Disease.findById(id).lean();
    
    if (!foundDisease) {
      return null;
    }

    // Convert to plain object (already done by lean, but ensuring it)
    return JSON.parse(JSON.stringify(foundDisease));
  } catch (error) {
    console.error(`Error fetching disease ${id}:`, error);
    
    // Check if it's a cast error (invalid ObjectId)
    if (error.name === 'CastError') {
      return null;
    }
    
    // Rethrow other errors to be caught by error boundary
    throw new Error(`Impossible de charger la maladie: ${error.message}`);
  }
}

export default async function DiseasePage({ params }) {
  const id = params.id;

  // Fetch disease with error handling
  const diseaseData = await getDisease(id);

  // If disease not found, show 404
  if (!diseaseData) {
    notFound();
  }

  const { Rx, disease, Dx, DDx } = diseaseData;

  // Validate required data
  if (!disease || !disease.name) {
    throw new Error("Données de maladie invalides");
  }

  // Structured data for the disease page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": disease.name,
    "description": disease.definition || "Information médicale",
    "about": {
      "@type": "MedicalCondition",
      "name": disease.name,
      "description": disease.definition || "",
      "medicineSystem": "Médecine occidentale",
      "specialty": {
        "@type": "MedicalSpecialty",
        "name": typeof disease.specialty === 'string' 
          ? disease.specialty 
          : Array.isArray(disease.specialty) 
            ? disease.specialty.join(', ')
            : "Médecine générale"
      },
    },
    "mainEntity": {
      "@type": "MedicalCondition",
      "name": disease.name,
      "description": disease.definition || "",
    }
  };

  // Add medication information if available
  if (Rx && Array.isArray(Rx) && Rx.length > 0) {
    structuredData.mainEntity.possibleTreatment = Rx.map(rx => ({
      "@type": "Drug",
      "name": rx.mdc || "Médicament",
      "dosageForm": rx.dosage || "",
      "administrationRoute": rx.instructions || "",
    }));
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="flex flex-col w-full justify-center items-center gap-8 my-4 z-[5] px-4 md:px-0">
        {/* Disease Header Card */}
        <article
          className={`detail-card p-6 md:p-8 m-1 w-full md:w-3/4 flex flex-col md:flex-row justify-center items-start gap-4 disease-card-${disease.specialty}`}
        >
          <header className="w-full md:w-fit md:max-w-[50%] flex flex-row md:flex-col justify-between gap-4 z-[5]">
            <h1 className="text-2xl md:text-3xl self-start font-bold uppercase ">
              {disease.name}
            </h1>
            <h2
              className={`text-xl self-start md:self-start md:text-xl font-semibold text-color-specialty disease-card-${disease.specialty}`}
            >
              {typeof disease.specialty === "string"
                ? disease.specialty
                : Array.isArray(disease.specialty)
                ? disease.specialty.map((s, index) =>
                    index !== disease.specialty.length - 1 ? `${s}, ` : `${s}`
                  )
                : "Non spécifié"}
            </h2>
          </header>
          <div className="disease-def flex flex-col md:flex-row w-full md:gap-4">
            <div className="divider" role="separator"></div>
            <p className="text-justify">
              {disease.definition ||
                "Aucune définition disponible pour cette maladie."}
            </p>
          </div>
        </article>

        {/* Main Content Grid */}
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* Rx Card */}
          <article
            id="Rx"
            className="detail-card Rx-card col-span-1 md:col-span-2 w-full min-h-[500px] md:min-h-[700px] h-fit flex justify-center items-center relative"
            aria-label="Ordonnance médicale"
          >
            <PillBottle className="w-1/6 absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 z-40" aria-hidden="true" />
            <Pills className="w-1/5 absolute bottom-0 right-0 translate-x-1/4 z-40" aria-hidden="true" />
            
            <div className="w-[calc(100%-20px)] min-h-[calc(100%-20px)] my-5 md:my-10 flex justify-center items-start flex-col gap-4 relative overflow-hidden rounded-[8.5%]">
              <WaveT className="absolute top-[-6%] left-[-2%] rotate-3" aria-hidden="true" />
              <WaveB className="absolute bottom-[-8%] right-[-2%] w-full" aria-hidden="true" />
              <Union className="absolute top-1/2 left-1/2 w-2/3 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
              
              <RxCard Rx={Rx}>
                {Rx ? (
                  Array.isArray(Rx) ? (
                    <RxArray Rx={Rx} />
                  ) : (
                    <RxObject Rx={Rx} />
                  )
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p>Aucune ordonnance disponible pour cette maladie.</p>
                  </div>
                )}
              </RxCard>
            </div>
          </article>

          {/* Dx Card */}
          <aside className="detail-card p-6 md:p-8 w-full m-0 flex justify-between items-start flex-col gap-4" aria-label="Diagnostic">
            <h2 className="text-2xl font-bold">Dx</h2>
            <div className="h-full">
              {Dx && Dx.length > 0 ? (
                <ul className="space-y-2" role="list">
                  {Dx.map((dx, index) => (
                    <li key={index} className="text-gray-700">
                      {dx}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Diagnostic non disponible</p>
              )}
            </div>
          </aside>
        </div>

        {/* Back Button */}
        <nav className="w-full md:w-3/4 flex justify-start">
          <Link
            href="/diseases"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            aria-label="Retour à la liste des maladies"
          >
            ← Retour à la liste
          </Link>
        </nav>
      </section>
    </>
  );
}
