import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./ui/Navbar";
import { ThemeProvider } from "./ui/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://eordonnances.com'),
  title: {
    default: "eOrdonnances - Guide des Ordonnances Médicales",
    template: "%s | eOrdonnances",
  },
  description:
    "Guide complet des ordonnances médicales pour médecins et étudiants en médecine. Consultez les traitements par spécialité médicale : dermatologie, cardiologie, gastro-entérologie et plus.",
  keywords: [
    "ordonnances médicales",
    "prescriptions médicales",
    "guide médical",
    "traitements médicaux",
    "médecine",
    "médicaments",
    "cardiologie",
    "dermatologie",
    "gastro-entérologie",
    "neurologie",
    "pneumologie",
    "gynécologie",
    "ORL",
    "urologie",
    "urgences médicales",
    "étudiants en médecine",
    "formation médicale",
  ],
  authors: [{ name: "eOrdonnances Team" }],
  creator: "eOrdonnances",
  publisher: "eOrdonnances",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://eordonnances.com',
    siteName: "eOrdonnances",
    title: "eOrdonnances - Guide des Ordonnances Médicales",
    description:
      "Guide complet des ordonnances médicales pour médecins et étudiants en médecine. Consultez les traitements par spécialité médicale.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "eOrdonnances - Guide des Ordonnances Médicales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eOrdonnances - Guide des Ordonnances Médicales",
    description:
      "Guide complet des ordonnances médicales pour médecins et étudiants en médecine.",
    images: ["/twitter-image.png"],
    creator: "@eOrdonnances",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://eordonnances.com',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    // yandex: 'yandex-verification-code',
    // bing: 'bing-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen w-full flex flex-row overflow-x-hidden" style={{ backgroundColor: 'var(--background-color, transparent)' }}>
            <Navbar />
            <main className="flex-1 pb-[78px] lg:pl-[78px]">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
