"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useUI } from "./UIContext";
import { getSpecialtyColors } from "@/app/libs/specialties";
import { EASINGS, DURATIONS } from "@/app/libs/easings";
import SpecialtyIcon from "./SpecialtyIcon";
import PrescriptionCard from "./details/PrescriptionCard";

/**
 * HeroCardTransition
 *
 * Renders portal-based elements that:
 * 1. Card: Starts at DiseaseCard position, animates to right panel, becomes PrescriptionCard container
 * 2. Title: Starts inside card, animates to left panel, STAYS as the final title
 * 3. Reverse: When closing, animates back to origin position
 */
export default function HeroCardTransition({ Rx, Dx, onCloseComplete }) {
  const { flipState, selectedDisease, isClosing } = useUI();
  const cardControls = useAnimationControls();
  const titleControls = useAnimationControls();
  const [mounted, setMounted] = useState(false);
  const [animationPhase, setAnimationPhase] = useState("idle"); // 'idle' | 'animating' | 'complete' | 'closing'

  // Ensure we're on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset phase when selectedDisease changes
  useEffect(() => {
    if (!selectedDisease) {
      setAnimationPhase("idle");
    }
  }, [selectedDisease]);

  // Calculate target rect for card (right panel)
  const calculateCardTargetRect = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Layout Constants from [id]/page.jsx
    // Left Panel: lg:w-[48%]
    // Right Panel: lg:w-[52%]
    const rightPanelStart = vw * 0.48;
    const rightPanelWidth = vw * 0.52;
    const padding = 24; // lg:p-6 = 1.5rem = 24px

    // Card Constraints
    // PrescriptionCard has max-w-2xl (42rem = 672px)
    const maxCardWidth = 672;
    const availableWidth = rightPanelWidth - padding * 2;
    const cardWidth = Math.min(maxCardWidth, availableWidth);

    // Center card in Right Panel
    // x = PanelStart + (PanelWidth - CardWidth) / 2
    const cardX = rightPanelStart + (rightPanelWidth - cardWidth) / 2;

    // Height matches container content area: vh - top padding - bottom padding
    const cardHeight = vh - padding * 2;
    const cardY = padding;

    return { x: cardX, y: cardY, width: cardWidth, height: cardHeight };
  };

  // Calculate title target position (left panel)
  const calculateTitleTargetRect = () => {
    // Use calculated values based on the known layout
    // The left panel has p-6 lg:p-8 padding (32px on large screens)
    // Above the title: back button (~40px) + gap (16px)
    const paddingLeft = 32; // lg:p-8 = 2rem = 32px
    const paddingTop = 32; // lg:p-8 = 2rem = 32px
    const backButtonHeight = 44; // button height with padding
    const gapBetweenItems = 16; // gap-4 = 1rem = 16px

    return {
      x: paddingLeft,
      y: paddingTop + backButtonHeight + gapBetweenItems,
    };
  };

  // Start FORWARD animation when origin rect is available
  useLayoutEffect(() => {
    if (
      mounted &&
      flipState?.originRect &&
      animationPhase === "idle" &&
      selectedDisease &&
      !isClosing
    ) {
      setAnimationPhase("animating");

      const origin = flipState.originRect;
      const cardTarget = calculateCardTargetRect();

      // Set initial card position
      cardControls.set({
        x: origin.x,
        y: origin.y,
        width: origin.width,
        height: origin.height,
        borderRadius: "9999px",
        opacity: 1,
      });

      // Set initial title position
      titleControls.set({
        x: origin.x + 80,
        y: origin.y + origin.height / 2 - 15,
        scale: 0.45,
        opacity: 1,
      });

      // Use setTimeout to wait for left panel animation to settle before measuring title target
      // The left panel animates from x:-50 to x:0 with delay 0.1s and duration 0.5s
      // We wait ~150ms to let it mostly complete
      setTimeout(() => {
        // Calculate title target AFTER panel animation has settled
        const titleTarget = calculateTitleTargetRect();

        // Animate card
        cardControls
          .start({
            x: cardTarget.x,
            y: cardTarget.y,
            width: cardTarget.width,
            height: cardTarget.height,
            borderRadius: "1.5rem",
            opacity: 1,
            // Lift up slightly (shadow) to sell material feel
            boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.5)",
            transition: {
              // borderRadius morph to match the "unroll" (height expansion)
              borderRadius: {
                duration: DURATIONS.normal,
                ease: EASINGS.easeOutBack,
              },

              // STAGGER: Width first (Slide across), then Height (Unroll down)
              x: {
                type: "spring",
                stiffness: 250,
                damping: 28,
                duration: DURATIONS.fast,
              }, // Slightly smoother slide
              width: {
                type: "spring",
                stiffness: 250,
                damping: 28,
                duration: DURATIONS.fast,
              },

              // Height "Unrolls" distinctly LATER
              y: {
                type: "spring",
                stiffness: 180,
                damping: 24,
                delay: 0.4,
                duration: DURATIONS.normal,
              },
              height: {
                type: "spring",
                stiffness: 180,
                damping: 24,
                delay: 0.4,
                duration: DURATIONS.normal,
                ease: EASINGS.easeOutBack,
              },

              boxShadow: { duration: DURATIONS.fast, ease: EASINGS.outSwift },
            },
          })
          .then(() => {
            setAnimationPhase("complete");
          });

        // Animate title - Organic follow
        titleControls.start({
          x: titleTarget.x,
          y: titleTarget.y,
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 25,
            delay: 0.15,
          },
        });
      }, 150);
    }
  }, [
    mounted,
    flipState?.originRect,
    animationPhase,
    selectedDisease,
    isClosing,
    cardControls,
    titleControls,
  ]);

  // Handle REVERSE animation when isClosing becomes true
  useEffect(() => {
    if (isClosing && animationPhase === "complete" && flipState?.originRect) {
      setAnimationPhase("closing");

      const origin = flipState.originRect;

      // Animate card back to origin
      cardControls
        .start({
          x: origin.x,
          y: origin.y,
          width: origin.width,
          height: origin.height,
          borderRadius: "9999px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // Drop back down
          transition: {
            // Start morphing back to pill LATER (when width shrinks)
            // This keeps it a Rectangle while it "Rolls Up" (Height shrinks)
            borderRadius: {
              duration: DURATIONS.normal,
              delay: 0.25,
              ease: EASINGS.easeOutQuart,
            },

            // STAGGER REVERSE: Height rolls up first, then Width slides back
            y: { type: "spring", stiffness: 220, damping: 28 },
            height: { type: "spring", stiffness: 220, damping: 28 },

            x: { type: "spring", stiffness: 300, damping: 32, delay: 0.25 },
            width: { type: "spring", stiffness: 300, damping: 32, delay: 0.25 },

            boxShadow: { duration: DURATIONS.fast, ease: EASINGS.outSwift },
          },
        })
        .then(() => {
          // Animation complete, trigger cleanup
          if (onCloseComplete) {
            onCloseComplete();
          }
        });

      // Animate title back to card position
      titleControls.start({
        x: origin.x + 80,
        y: origin.y + origin.height / 2 - 15,
        scale: 0.45,
        opacity: 0,
        transition: { duration: DURATIONS.fast, ease: EASINGS.outSwift },
      });
    }
  }, [
    isClosing,
    animationPhase,
    flipState?.originRect,
    cardControls,
    titleControls,
    onCloseComplete,
  ]);

  // Don't render if no selection or no origin rect
  if (!mounted || !selectedDisease || !flipState?.originRect) {
    return null;
  }

  const specialty = selectedDisease.specialty;
  const diseaseName = selectedDisease.data?.disease?.name || "";
  const colors = getSpecialtyColors(specialty);
  const isAnimating = animationPhase === "animating";
  const isComplete = animationPhase === "complete";
  const isClosingPhase = animationPhase === "closing";
  const showWhiteBackground = isAnimating || isComplete;

  return createPortal(
    <>
      {/* Animated Title/Specialty Text */}
      <motion.div
        animate={titleControls}
        initial={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 70,
          // Keep visible when complete, only hide if we wanted to (requested to stay distinct)
          opacity: 1,
          pointerEvents: isComplete && !isClosingPhase ? "auto" : "none",
          transformOrigin: "left top",
        }}
      >
        <div
          className="flex flex-row items-end gap-4 text-white"
          style={{ maxWidth: "calc(42vw - 64px)" }}
        >
          <h1 className="capitalize text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            {diseaseName}
          </h1>
          <div className="flex flex-wrap gap-3 mb-1 shrink-0">
            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold border border-white/10 uppercase tracking-wide">
              {specialty}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Hero Card */}
      <motion.div
        animate={cardControls}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 60,
          overflow: "hidden",
          // boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          background:
            showWhiteBackground && !isClosingPhase
              ? "white"
              : `linear-gradient(135deg, ${colors.g1}, ${colors.g2}, ${colors.g3})`,
          transition: "background 0.35s ease",
        }}
      >
        {/* DiseaseCard-like content (fades out/in) */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isComplete && !isClosingPhase ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-4 absolute inset-0 p-6"
          style={{ pointerEvents: "none" }}
        >
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <SpecialtyIcon
              specialty={specialty}
              className="w-7 h-7 text-white"
            />
          </div>
        </motion.div>

        {/* PrescriptionCard content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete && !isClosingPhase ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute inset-0"
          style={{
            pointerEvents: isComplete && !isClosingPhase ? "auto" : "none",
          }}
        >
          <PrescriptionCard
            Rx={Rx}
            specialty={specialty}
            id={selectedDisease.id}
          />
        </motion.div>
      </motion.div>
    </>,
    document.body,
  );
}
