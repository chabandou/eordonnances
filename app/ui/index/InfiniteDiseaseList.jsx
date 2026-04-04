"use client";

import { useState, useCallback, useEffect } from "react";
import { VirtuosoGrid } from "react-virtuoso";
// import { LayoutGroup } from "framer-motion"; // Removed unused import
import DiseaseCard from "./DiseaseCard";
import { getDiseasesWithCountAction } from "@/app/actions/diseaseActions";
import styles from "./CardsWithSpecialty.module.css";
import clsx from "clsx";

export default function InfiniteDiseaseList({ initialDiseases, q, specialty, initialCount }) {
  const [diseases, setDiseases] = useState(initialDiseases);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialDiseases.length < initialCount);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when q or specialty changes (to handle client-side searches if any)
  useEffect(() => {
    setDiseases(initialDiseases);
    setCurrentPage(1);
    setHasMore(initialDiseases.length < initialCount);
  }, [initialDiseases, initialCount, q, specialty]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    const nextPage = currentPage + 1;
    try {
      const result = await getDiseasesWithCountAction(q, nextPage, specialty);
      setDiseases((prev) => [...prev, ...result.diseases]);
      setCurrentPage(nextPage);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error("Error loading more diseases:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, hasMore, isLoading, q, specialty]);



  return (
    // <LayoutGroup> // Removed wrapper
      <div className="w-full flex-1 flex flex-col items-center">


      <div className="w-[120%] -ml-[10%] flex-1 flex flex-col min-h-0 h-full">
        <VirtuosoGrid
          style={{ height: "100%" }}
          data={diseases}
          endReached={loadMore}
          // Preserve the original grid layouts
          listClassName={clsx(
            "w-full grid place-items-center gap-2 px-6",
            "grid-cols-1"
          )}
          itemClassName="w-full max-w-2xl flex justify-center !overflow-visible"
          itemContent={(index, d) => (
            <DiseaseCard i={index} key={`${d._id}-${index}`} d={d} />
          )}
          components={{
            Footer: () => (
              <div className="h-32 flex items-center justify-center w-full col-span-full">
                {isLoading && (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
                    <p className="text-sm text-gray-500">Chargement plus de maladies...</p>
                  </div>
                )}
              </div>
            )
          }}
        />
      </div>
      </div>
    // </LayoutGroup>
  );
}
