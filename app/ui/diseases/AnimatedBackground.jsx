"use client";

import { motion } from "framer-motion";
import { useTransitionState } from "next-transition-router";
import { getSpecialtyColorsWithShading } from "@/app/libs/specialties";
import { useTheme } from "@/app/ui/ThemeContext";
import { useUI } from "@/app/ui/UIContext";
import { useEffect, useState } from "react";
import { EASINGS, DURATIONS } from "@/app/libs/easings";

// Duration synchronized with geometry animation for consistent feel
const transitionConfig = {
  duration: DURATIONS.backgroundMorph,
  ease: EASINGS.easeOutExpo,
  backgroundColor: { delay: 0, duration: DURATIONS.fast, ease: "easeOut" },
  filter: { delay: 0, duration: DURATIONS.fast, ease: "easeOut" },
};

// Static variants that accept custom props for dynamic values
// This ensures the variant objects never change, preventing Framer Motion resets
const backVariants = {
  initial: ({ backgroundColor, filter }) => ({
    x: -300,
    y: 300,
    rotate: -70,
    scaleY: 2,
    clipPath: "polygon(0 0, 70% 5%, 85% 100%, 0 100%)",
    backgroundColor,
    filter,
    height: "300%",
    top: "-100%",
    width: "52%",
  }),
  animate: ({ backgroundColor, filter }) => ({
    x: 0,
    y: 0,
    rotate: 0,
    scaleY: 1,
    clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
    backgroundColor,
    filter,
    height: "100%",
    top: "0%",
    left: "0%",
    width: "52%",
    transition: transitionConfig,
  }),
  exit: {
    x: -300,
    y: 300,
    rotate: -70,
    scaleY: 2,
    clipPath: "polygon(0 0, 70% 5%, 85% 100%, 0 100%)",
    height: "300%",
    top: "-100%",
    width: "52%",
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeOutExpo,
      delay: 0.2,
    },
  },
};

const frontVariants = {
  initial: ({ backgroundColor, filter }) => ({
    x: -300,
    y: 300,
    rotate: -70,
    scaleY: 2,
    clipPath: "polygon(0 0, 70% 5%, 85% 100%, 0 100%)",
    backgroundColor,
    filter,
    height: "300%",
    top: "-100%",
    width: "52%",
  }),
  animate: ({ backgroundColor, filter }) => ({
    x: 0,
    y: 0,
    rotate: 0,
    scaleY: 1,
    clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
    backgroundColor,
    filter,
    height: "100%",
    left: "-10%",
    top: "0%",
    width: "52%",
    transition: { ...transitionConfig, delay: 0.2 },
  }),
  exit: {
    x: -300,
    y: 300,
    rotate: -70,
    scaleY: 2,
    clipPath: "polygon(0 0, 70% 5%, 85% 100%, 0 100%)",
    height: "300%",
    top: "-100%",
    width: "52%",
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeOutExpo,
      delay: 0,
    },
  },
};

export default function AnimatedBackground({ specialty, className }) {
  const { stage } = useTransitionState();
  const { theme, mounted } = useTheme();
  const { clickedSpecialty, setClickedSpecialty, isClosing } = useUI();

  // Track if component has rendered once - used to prevent initial animation on variant recreation
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setClickedSpecialty(null);
  }, [setClickedSpecialty]);

  // Active "Detail Mode" state for COLORS: click is active
  // We want to keep the dark colors DURING the closing animation, so we don't fade to light while shrinking.
  // Keep detail colors active if isClosing is true to prevent variant recreation during close
  const showDetailColors = clickedSpecialty || isClosing;

  // Use clicked specialty only if we are in active detail state
  // If closing, we still want to use that specialty's color so it matches the shrinking card
  const effectiveSpecialty = clickedSpecialty || specialty;
  const { darker, lighter } = getSpecialtyColorsWithShading(effectiveSpecialty);

  // Default to dark mode logic if not mounted
  const isDark = mounted ? theme === "dark" : true;

  // Light Mode: Back=Darker, Front=Lighter
  // Dark Mode: Back=Lighter, Front=Darker
  // Transition (Clicked): Both=Darker (to match Details/Loading page)
  let bgBack, bgFront;
  if (showDetailColors) {
    bgBack = darker;
    bgFront = darker;
  } else {
    bgBack = isDark ? lighter : darker;
    bgFront = isDark ? darker : lighter;
  }

  // Filter should always exist in dark mode, decoupled from animation state
  const filter = isDark
    ? "brightness(0.6) saturate(1.1)"
    : "brightness(1) saturate(1)";

  // Trigger 'exit' variant only if stage is 'leaving' AND we haven't clicked a specialty
  const currentVariant =
    stage === "leaving" && !clickedSpecialty ? "exit" : "animate";

  return (
    <>
      <motion.div
        className={`${className} origin-right`}
        initial={hasMounted ? false : "initial"}
        custom={{ backgroundColor: bgBack, filter }}
        animate={currentVariant}
        exit="exit"
        variants={backVariants}
        style={{ pointerEvents: "none", position: "absolute" }}
      />
      <motion.div
        className={`${className} origin-right`}
        initial={hasMounted ? false : "initial"}
        custom={{ backgroundColor: bgFront, filter }}
        animate={currentVariant}
        exit="exit"
        variants={frontVariants}
        style={{ pointerEvents: "none", position: "absolute" }}
      />
    </>
  );
}
