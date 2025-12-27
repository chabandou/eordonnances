import SpecialtyCards from "./ui/SpecialtyCards";

export const revalidate = 60;
export const dynamic = 'force-static';

export const metadata = {
  title: "Accueil",
  description:
    "Explorez notre guide complet des ordonnances médicales organisé par spécialité. Trouvez rapidement les traitements recommandés pour diverses pathologies.",
  openGraph: {
    title: "eOrdonnances - Guide des Ordonnances par Spécialité",
    description:
      "Explorez notre guide complet des ordonnances médicales organisé par spécialité médicale.",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  // Structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "eOrdonnances",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://eordonnances.com",
    "description": "Guide complet des ordonnances médicales pour médecins et étudiants en médecine",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_BASE_URL || "https://eordonnances.com"}/diseases?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "eOrdonnances",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || "https://eordonnances.com"}/logo.png`
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="overflow-x-hidden flex flex-col items-center justify-center py-4 lg:my-auto" style={{ backgroundColor: 'var(--background-color, var(--card-color))' }}>
        <SpecialtyCards />
      </main>
    </>
  );
}
