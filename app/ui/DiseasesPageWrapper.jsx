"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "./UIContext";
import { useEffect, useLayoutEffect, useCallback, useState, useRef } from "react";
import AnimatedBackground from "./diseases/AnimatedBackground";
import PrescriptionCard from "./details/PrescriptionCard";
import DiagnosticsGrid from "./details/DiagnosticsGrid";
import HeroCardTransition from "./HeroCardTransition";
import SpecialtyIcon from "./SpecialtyIcon";

export default function DiseasesPageWrapper({ children, specialty }) {
  const {
    selectedDisease,
    setSelectedDisease,
    clickedSpecialty,
    setClickedSpecialty,
    setIsHeroExpanding,
    flipState,
    setFlipState,
    isClosing,
    setIsClosing,
  } = useUI();

  useLayoutEffect(() => {
    setIsHeroExpanding(false);
    setClickedSpecialty(null);
  }, [setIsHeroExpanding, setClickedSpecialty]);

  // Use clicked specialty for background color during transition
  const activeSpecialty = clickedSpecialty || specialty;

  // Full disease data fetched from API (includes Rx, Dx)
  const [fullData, setFullData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Ref for the target card container to measure for FLIP
  const cardTargetRef = useRef(null);

  // Fetch full disease data when selected
  useEffect(() => {
    if (selectedDisease?.id) {
      setIsLoading(true);
      fetch(`/api/disease/${selectedDisease.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.foundDisease) {
            setFullData(data.foundDisease);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching disease:", err);
          setIsLoading(false);
        });
    } else {
      setFullData(null);
    }
  }, [selectedDisease?.id]);

  // Measure target and update flipState for animation
  useEffect(() => {
    if (
      cardTargetRef.current &&
      selectedDisease &&
      flipState?.originRect &&
      !flipState?.targetRect
    ) {
      requestAnimationFrame(() => {
        if (cardTargetRef.current) {
          const rect = cardTargetRef.current.getBoundingClientRect();
          setFlipState((prev) => ({
            ...prev,
            targetRect: {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height,
            },
          }));
        }
      });
    }
  }, [
    selectedDisease,
    flipState?.originRect,
    flipState?.targetRect,
    setFlipState,
  ]);

  // isClosing and setIsClosing already destructured from useUI() above

  // Handle close / back - triggers reverse animation
  const handleClose = useCallback(() => {
    // Trigger closing animation
    setIsClosing(true);
    // Update URL immediately
    window.history.pushState(null, "", "/diseases");
  }, [setIsClosing]);

  // Cleanup after close animation completes (called by HeroCardTransition)
  const handleCloseComplete = useCallback(() => {
    // Delay the state reset slightly to ensure the layout transition is smooth
    // and the "absolute" positioning of the list view holds until the visual transition is fully done.
    setTimeout(() => {
      setFlipState(null);
      setSelectedDisease(null);
      setClickedSpecialty(null);
      setFullData(null);
      setIsHeroExpanding(false);
      setIsClosing(false);
    }, 50);
  }, [
    setSelectedDisease,
    setClickedSpecialty,
    setIsHeroExpanding,
    setFlipState,
    setIsClosing,
  ]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedDisease) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDisease, handleClose]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (selectedDisease) {
        handleClose();
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedDisease, handleClose]);

  // Update URL when disease is selected
  useEffect(() => {
    if (selectedDisease) {
      window.history.pushState(null, "", `/diseases/${selectedDisease.id}`);
    }
  }, [selectedDisease]);

  // Derived data
  const disease = fullData?.disease || selectedDisease?.data?.disease;
  const Rx = fullData?.Rx || [];
  const Dx = fullData?.Dx || [];
  const isFlipping = !!flipState;

  return (
    <>
      {/* Background - morphs to specialty color when disease is selected */}
      <AnimatedBackground
        specialty={
          selectedDisease ? selectedDisease.specialty : activeSpecialty
        }
        className="absolute top-0 z-[1] h-full min-w-[450px] overflow-hidden brightness-110 transition-[filter] duration-300 dark:brightness-[0.8]"
      />

      {/* Hero card animation portal - becomes the detail card container */}
      <HeroCardTransition
        Rx={Rx}
        Dx={Dx}
        onCloseComplete={handleCloseComplete}
      />

      {/* LIST MODE - Always mounted, hidden when detail is active */}
      {/* This preserves scroll position and loaded items */}
      {/* Keep list hidden/absolute during closing animation to prevent page height jump/glitch */}
      <motion.div
        animate={{
          opacity: selectedDisease && !isClosing ? 0 : 1,
        }}
        transition={{
          duration: selectedDisease && !isClosing ? 0.4 : 0.5,
          delay: selectedDisease && !isClosing ? 0.1 : (isClosing ? 0.4 : 0),
        }}
        style={{
          pointerEvents: selectedDisease && !isClosing ? "none" : "auto",
          // Use absolute positioning when hidden to not affect layout
          // CRITICAL: Must be absolute during 'isClosing' to keep background from stretching
          position: selectedDisease ? "absolute" : "relative",
          inset: selectedDisease ? 0 : undefined,
          width: selectedDisease ? "100%" : undefined,
          height: selectedDisease ? "100%" : undefined,
          zIndex: selectedDisease ? 20 : undefined,
        }}
      >
        {children}
      </motion.div>

      {/* DETAIL MODE - Rendered when disease is selected */}
      <AnimatePresence>
        {selectedDisease && !isClosing && (
          <motion.div
            key="detail-mode"
            className="relative flex h-[calc(100vh-78px)] w-full flex-col overflow-hidden bg-[var(--background-color)] lg:h-screen lg:flex-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* LEFT PANEL - Disease Info - matches [id]/page.jsx layout */}
            <motion.div
              className="scrollbar-none relative z-10 flex h-screen w-full flex-col gap-4 overflow-hidden p-6 text-white lg:w-[48%] lg:p-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Decorative Specialty Icon - bottom left, tilted, low opacity */}
              <motion.div
                className="pointer-events-none absolute -bottom-32 -left-32"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  transform: "rotate(-55deg)",
                }}
              >
                <SpecialtyIcon
                  specialty={selectedDisease.specialty}
                  className="h-[400px] w-[400px] text-white lg:h-[500px] lg:w-[500px]"
                />
              </motion.div>

              {/* Navigation / Header */}
              <div className="flex flex-col items-start gap-4">
                <button
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  RECHERCHE
                </button>
              </div>

              {/* Title & Specialty placeholder - reserves space for the portal content */}
              {/* Increased height to accommodate wrapped titles (2-3 lines) */}
              <div className="invisible" id="disease-title-target">
                <div
                  className="flex flex-row items-end gap-4 text-white"
                  style={{ maxWidth: "calc(42vw - 64px)" }}
                >
                  <h1 className="text-4xl font-black capitalize leading-tight tracking-tight lg:text-5xl">
                    {disease?.name || selectedDisease.data?.disease?.name}
                  </h1>
                  <div className="mb-1 flex shrink-0 flex-wrap gap-3">
                    <span className="rounded-full border border-white/10 bg-white/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide backdrop-blur-md">
                      {selectedDisease.specialty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Definition - appears below the title area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-justify text-lg font-medium leading-snug text-white"
              >
                {disease?.definition || "Chargement de la définition..."}
              </motion.div>

              {/* Diagnostics */}
              <motion.div
                className="mt-auto pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-white/80">
                  DIAGNOSTICS RECOMMANDÉS
                </h3>
                <DiagnosticsGrid Dx={Dx} />
              </motion.div>
            </motion.div>

            {/* RIGHT PANEL - matches [id]/page.jsx width (52%) */}
            <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden p-6 lg:w-[52%]">
              {/* Placeholder - actual card is rendered in HeroCardTransition portal */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
