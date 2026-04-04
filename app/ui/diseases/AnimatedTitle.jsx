"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTransitionState } from "next-transition-router";
import { useUI } from "../UIContext";
import { EASINGS, DURATIONS } from "@/app/libs/easings";

export default function AnimatedTitle({ specialty, className }) {
  const { stage } = useTransitionState();
  const { selectedDisease, isClosing } = useUI();

  // Dynamic transition based on state
  const transition = {
    opacity: { 
        duration: isClosing ? DURATIONS.normal : DURATIONS.fast, 
        ease: "linear", 
        delay: isClosing ? 0.1 : 0.6 // 0.6 initial delay kept for entrance, 0.4 for closing sync
    },
    y: { 
        duration: DURATIONS.normal, 
        ease: EASINGS.easeOutBack, 
        delay: isClosing ? 0.1 : 0.6 
    },
  };
  
  // Override for initial entrance if not closing (handled by mounting mostly, but we want clean logic)
  // Actually, the original code had an effect to reset delay to 0. Let's replicate that logic cleaner:
  // If simply viewing the list (no selection, not closing), we want normal entrance.
  // Ideally, 'isClosing' handles the return trip.
  
  // Simplified:
  // If isClosing -> delay 0.4s
  // Else (initial mount) -> delay 0s (or keep original stagger behavior? Original had setTransition to 0 in useEffect)
  
  const activeTransition = {
      opacity: { duration: DURATIONS.fast, ease: "ease", delay: isClosing ? 0.1 : 0 },
      y: { duration: DURATIONS.normal, ease: EASINGS.easeOutBack, delay: isClosing ? 0.1 : 0 },
  };

  return (
    <div className="relative overflow-hidden">
        <motion.h1
        key={specialty || "default"}
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
            opacity: selectedDisease && !isClosing ? 0 : 1, 
            y: 0 
        }}
        transition={activeTransition}
        >
        {specialty ? (
            specialty
        ) : (
            <>
            Recherchez
            <br />
            des maladies
            </>
        )}
        </motion.h1>
    </div>
  );
}
