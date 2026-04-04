'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutGroup } from 'framer-motion'
import { useEffect } from 'react'

import Navbar from "./ui/Navbar";
import { ThemeProvider } from "./ui/ThemeContext";
import { TransitionProvider } from "./ui/TransitionProvider";
import { UIProvider } from "./ui/UIContext";
import { initViewportTracking } from "./libs/event-utils";

const inter = Inter({ subsets: ["latin"] });
const themeInitScript = `
  (function () {
    try {
      var savedTheme = localStorage.getItem("theme");
      var theme = savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      root.style.colorScheme = theme;
    } catch (error) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
    }
  })();
`;

// export const metadata = {
//   metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://eordonnances.com'),
//   title: {
//     default: "eOrdonnances - Guide des Ordonnances Médicales",
//     template: "%s | eOrdonnances",
//   },
//   description:
//     "Guide complet des ordonnances médicales pour médecins et étudiants en médecine. Consultez les traitements par spécialité médicale : dermatologie, cardiologie, gastro-entérologie et plus.",
//   keywords: [
//     "ordonnances médicales",
//     "prescriptions médicales",
//     "guide médical",
//     "traitements médicaux",
//     "médecine",
//     "médicaments",
//     "cardiologie",
//     "dermatologie",
//     "gastro-entérologie",
//     "neurologie",
//     "pneumologie",
//     "gynécologie",
//     "ORL",
//     "urologie",
//     "urgences médicales",
//     "étudiants en médecine",
//     "formation médicale",
//   ],
//   authors: [{ name: "eOrdonnances Team" }],
//   creator: "eOrdonnances",
//   publisher: "eOrdonnances",
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   openGraph: {
//     type: "website",
//     locale: "fr_FR",
//     url: process.env.NEXT_PUBLIC_BASE_URL || 'https://eordonnances.com',
//     siteName: "eOrdonnances",
//     title: "eOrdonnances - Guide des Ordonnances Médicales",
//     description:
//       "Guide complet des ordonnances médicales pour médecins et étudiants en médecine. Consultez les traitements par spécialité médicale.",
//     images: [
//       {
//         url: "/og-image.png",
//         width: 1200,
//         height: 630,
//         alt: "eOrdonnances - Guide des Ordonnances Médicales",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "eOrdonnances - Guide des Ordonnances Médicales",
//     description:
//       "Guide complet des ordonnances médicales pour médecins et étudiants en médecine.",
//     images: ["/twitter-image.png"],
//     creator: "@eOrdonnances",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   alternates: {
//     canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://eordonnances.com',
//   },
//   verification: {
//     google: process.env.GOOGLE_SITE_VERIFICATION,
//     // yandex: 'yandex-verification-code',
//     // bing: 'bing-verification-code',
//   },
// };

export default function RootLayout({ children }) {

  // const segment = useSelectedLayoutSegment()

  // const variants = {
  //   null: { width: '55%', right: '0%', backgroundColor: '#00c7a9', clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)' }, // home
  //   diseases: { width: '42%', left: '0%', backgroundColor: '#0EA5E9', clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' },
  //   'diseases/add': { width: '42%', left: '-60%', backgroundColor: '#0EA5E9' },
  //   'diseases/:id': { width: '42%', left: '0%', backgroundColor: '#0EA5E9' },
  // }

  // Initialize viewport tracking for dynamic --vw/--vh CSS variables
  useEffect(() => {
    const cleanup = initViewportTracking();
    return cleanup;
  }, []);

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <UIProvider>
          <ThemeProvider>
            <div className="min-h-screen w-full flex flex-row overflow-clip relative" style={{ backgroundColor: 'var(--background-color, transparent)' }}>
              <Navbar />
              {/* <motion.div className="background" animate={variants[segment ?? 'null']}
                transition={{ duration: 0.5, ease: 'easeOut' }}></motion.div> */}
              <LayoutGroup>
                <TransitionProvider>
                  <main className="flex-1 max-lg:pb-[78px]">{children}</main>
                </TransitionProvider>
              </LayoutGroup>
            </div>
          </ThemeProvider>
        </UIProvider>
      </body>
    </html>
  );
}
