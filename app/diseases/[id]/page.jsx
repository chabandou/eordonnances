import { connectToMongoDB } from "@/app/libs/mongodb";
import Disease from "@/models/diseaseModel";
import Link from "next/link";
import { notFound } from "next/navigation";

import DetailsBackground from "@/app/ui/details/DetailsBackground";
import PrescriptionCard from "@/app/ui/details/PrescriptionCard";
import DiagnosticsGrid from "@/app/ui/details/DiagnosticsGrid";
import AnimatedTitle from "@/app/ui/details/AnimatedTitle";

export const dynamic = "force-dynamic";

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

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

// Imports updated

export default async function DiseasePage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

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
    // ...
  };

  // Extract specialty for colors
  const specialtyName = typeof disease.specialty === 'string'
    ? disease.specialty
    : Array.isArray(disease.specialty)
      ? disease.specialty[0]
      : "Médecine générale";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Background Layer */}
      <DetailsBackground specialty={specialtyName} />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100vh-80px)] lg:h-[calc(100vh)] w-full font-sans overflow-hidden">

        {/* LEFT PANEL - Disease Info */}
        <div className="w-full lg:w-[48%] p-6 lg:p-8 flex flex-col gap-4 lg:gap-4 text-white h-screen scrollbar-none">
          {/* Navigation / Header */}
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/diseases"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors text-sm font-medium shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              RECHERCHE
            </Link>
          </div>

          {/* Title & Description */}
          <div className="flex flex-row items-end gap-4">
            <AnimatedTitle id={id} className="capitalize text-4xl lg:text-5xl font-black mb-3 lg:mb-0 leading-tight tracking-tight">
              {disease.name}
            </AnimatedTitle>

            {/* Visual Tags - Now showing Specialty only */}
            <div className="flex flex-wrap gap-3 mb-4 lg:mb-0">
              <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold border border-white/10 uppercase tracking-wide">
                {specialtyName}
              </span>
              {/* Previous generic tags removed as requested */}
            </div>
          </div>
          <div className="text-lg text-white leading-snug font-medium text-justify shadow-sm">
            {disease.definition || "Aucune définition disponible."}
          </div>

          {/* Recommended Diagnostics */}
          <div className="mt-auto pt-8 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2 w-fit">
              DIAGNOSTICS RECOMMANDÉS
            </h3>
            <DiagnosticsGrid Dx={Dx} />
          </div>
        </div>

        {/* RIGHT PANEL - Prescription Card */}
        <div className="w-full lg:w-[52%] p-6 lg:p-6 h-full flex flex-col justify-center items-center overflow-hidden">
          {/* Pass specialty for dynamic coloring */}
          <PrescriptionCard Rx={Rx} specialty={specialtyName} id={id} />
        </div>

      </div>
    </>
  );
}

