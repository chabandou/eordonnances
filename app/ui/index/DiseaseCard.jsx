"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useMemo, useCallback } from "react";
import { useTransitionState } from "next-transition-router";
import { useUI } from "../UIContext";
import clsx from "clsx";
import styles from "./DiseaseCard.module.css";
import SpecialtyIcon from "../SpecialtyIcon";
import { getSpecialtyColors } from "@/app/libs/specialties";
import { DURATIONS, EASINGS, TRANSITIONS } from "@/app/libs/easings";

// Variants for cleaner state management
const cardVariants = {
  hidden: { opacity: 0, y: 20, pointerEvents: "none" },
  visible: { opacity: 1, y: 0, pointerEvents: "auto" },
  exit: { opacity: 0, y: -20, pointerEvents: "none" },
};

// Props: d = disease object, i = index for staggered animation
export default function DiseaseCard({ d, i }) {
  const { stage } = useTransitionState();
  const cardRef = useRef();
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-50px" });

  const specialtyName =
    typeof d.disease.specialty === "string"
      ? d.disease.specialty
      : d.disease.specialty[0];

  const colors = getSpecialtyColors(specialtyName);
  const {
    selectedDisease,
    setSelectedDisease,
    setIsHeroExpanding,
    setClickedSpecialty,
    setFlipState,
  } = useUI();

  // Memoize to prevent hydration mismatch and re-render flicker
  const matchScore = useMemo(
    () => Math.floor(Math.random() * 26) + 74,
    [d._id],
  );

  // Check if this card is currently selected
  const isSelected = selectedDisease?.id === d._id;
  // Check if another card is selected (so this one should fade out)
  const isOtherSelected = selectedDisease && !isSelected;

  // Determine current interaction state
  const { isClosing } = useUI();
  
  const currentVariant = useMemo(() => {
    // If closing, force visible so parent DiseasesPageWrapper can handle the fade-in
    if (isClosing) return "visible";
    
    if (isSelected || isOtherSelected) return "hidden";
    return isInView ? "visible" : "hidden";
  }, [isSelected, isOtherSelected, isInView, isClosing]);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      // If already selected, ignore
      if (selectedDisease) return;

      // Capture origin rect for FLIP animation
      const rect = cardRef.current?.getBoundingClientRect();

      // Trigger animations
      setIsHeroExpanding(true);
      setClickedSpecialty(specialtyName);

      // Set FLIP state with origin (target will be set by DiseasesPageWrapper)
      setFlipState({
        diseaseId: d._id,
        originRect: rect
          ? {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height,
            }
          : null,
        targetRect: null,
      });

      // Set selected disease with full data
      setSelectedDisease({
        id: d._id,
        data: d,
        specialty: specialtyName,
      });
    },
    [
      d,
      specialtyName,
      selectedDisease,
      setSelectedDisease,
      setIsHeroExpanding,
      setClickedSpecialty,
      setFlipState,
    ],
  );

  return (
    <AnimatePresence>
      {stage !== "leaving" && (
        <motion.div
          key="card-motion"
          ref={inViewRef}
          variants={cardVariants}
          initial="hidden"
          animate={currentVariant}
          exit="exit"
          transition={{
            delay: i * 0.03, // Stagger effect
            duration: DURATIONS.normal,
            ease: EASINGS.outSwift,
          }}
          className="w-full px-0 py-2"
        >
          <motion.button
            ref={cardRef}
            onClick={handleClick}
            whileHover={{ x: -12 }}
            transition={{
              x: { type: "tween", duration: 0.3, ease: EASINGS.easeOutBack },
            }}
            className={clsx(
              styles.card,
              "group",
              "cursor-pointer",
              "text-left",
            )}
            style={{
              "--g1": colors.g1,
              "--g2": colors.g2,
              "--g3": colors.g3,
              borderRadius: "9999px",
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.icon}>
                <SpecialtyIcon
                  specialty={specialtyName}
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className={styles.textContainer}>
              <h2 className={styles.title}>{d.disease.name}</h2>
              <p className={styles.subtitle}>{specialtyName}</p>
            </div>

            <div className={styles.tail}>{matchScore}%</div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
