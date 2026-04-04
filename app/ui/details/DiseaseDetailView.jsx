'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '@/app/ui/UIContext';
import { useEffect, useCallback, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import PrescriptionCard from '@/app/ui/details/PrescriptionCard';
import DiagnosticsGrid from '@/app/ui/details/DiagnosticsGrid';
import { getSpecialtyColors } from '@/app/libs/specialties';

export default function DiseaseDetailView() {
    const {
        selectedDisease,
        setSelectedDisease,
        setClickedSpecialty,
        setIsHeroExpanding,
        flipState,
        setFlipState
    } = useUI();
    const router = useRouter();

    // Full disease data fetched from API (includes Rx, Dx)
    const [fullData, setFullData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Ref for the target container to measure for FLIP
    const cardTargetRef = useRef(null);

    // Fetch full disease data when selected
    useEffect(() => {
        if (selectedDisease?.id) {
            setIsLoading(true);
            fetch(`/api/disease/${selectedDisease.id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.foundDisease) {
                        setFullData(data.foundDisease);
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching disease:', err);
                    setIsLoading(false);
                });
        }
    }, [selectedDisease?.id]);

    // Measure target and trigger animation
    useEffect(() => {
        if (cardTargetRef.current && selectedDisease && !flipState?.targetRect) {
            // Give a microtask for layout to settle? usually useLayoutEffect but we want to wait for mount
            // We use requestAnimationFrame to ensure we measure after paint/layout
            requestAnimationFrame(() => {
                if (cardTargetRef.current) {
                    const rect = cardTargetRef.current.getBoundingClientRect();
                    // Only update if we have an origin (meaning we came from a card click)
                    if (flipState?.originRect) {
                        setFlipState(prev => ({
                            ...prev,
                            targetRect: rectToJson(rect)
                        }));
                    }
                }
            });
        }
    }, [selectedDisease, setFlipState]); // Removed flipState dependency to avoid loop, check safely inside

    // Helper to serialize DOMRect
    const rectToJson = (rect) => ({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom
    });

    // Handle close / back
    const handleClose = useCallback(() => {
        // Reset ALL states
        setFlipState(null);
        setSelectedDisease(null);
        setClickedSpecialty(null);
        setFullData(null);
        setIsHeroExpanding(false);
        // Update URL back to list
        window.history.pushState(null, '', '/diseases');
    }, [setSelectedDisease, setClickedSpecialty, setIsHeroExpanding, setFlipState]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedDisease) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedDisease, handleClose]);

    // Handle browser back button
    useEffect(() => {
        const handlePopState = () => {
            if (selectedDisease) {
                handleClose();
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [selectedDisease, handleClose]);

    // Update URL when disease is selected
    useEffect(() => {
        if (selectedDisease) {
            window.history.pushState(null, '', `/diseases/${selectedDisease.id}`);
        }
    }, [selectedDisease]);

    if (!selectedDisease) return null;

    const { id, data, specialty } = selectedDisease;
    // Use full data if loaded, otherwise fall back to list data
    const disease = fullData?.disease || data?.disease;
    const Rx = fullData?.Rx || [];
    const Dx = fullData?.Dx || [];

    // Is the FLIP animation currently active/pending?
    // If flipState exists (meaning animation in progress or set up), we hide the real card.
    // Once DiseaseCard finishes animation and clears flipState, we show this one.
    // Wait, DiseaseCard clears flipState? 
    // If DiseaseCard clears flipState, then 'isFlipping' becomes false.
    const isFlipping = !!flipState;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col lg:flex-row w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* LEFT PANEL - Disease Info */}
            <motion.div
                className="w-full lg:w-[52%] p-6 lg:p-8 flex flex-col gap-4 lg:gap-4 text-white h-screen scrollbar-none"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {/* Navigation / Header */}
                <div className="flex flex-col items-start gap-4">
                    <button
                        onClick={handleClose}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors text-sm font-medium shrink-0"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        RECHERCHE
                    </button>
                </div>

                {/* Title & Description */}
                <div className="flex flex-row items-end gap-4">
                    {/* Removed layoutId to prevent conflicts and ensure manual fade-in */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="font-sans capitalize text-4xl lg:text-5xl font-black mb-3 lg:mb-0 leading-tight tracking-tight"
                    >
                        {disease.name}
                    </motion.h1>

                    {/* Specialty Tag */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-3 mb-4 lg:mb-0"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold border border-white/10 uppercase tracking-wide">
                            {specialty}
                        </span>
                    </motion.div>
                </div>

                <motion.div
                    className="text-lg text-white leading-snug font-medium text-justify shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {disease.definition || "Aucune définition disponible."}
                </motion.div>

                {/* Recommended Diagnostics */}
                <motion.div
                    className="mt-auto pt-8 pb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2 w-fit">
                        DIAGNOSTICS RECOMMANDÉS
                    </h3>
                    <DiagnosticsGrid Dx={Dx} />
                </motion.div>
            </motion.div>

            {/* RIGHT PANEL - Prescription Card */}
            <div className="w-full lg:w-[58%] p-6 lg:p-6 h-full flex flex-col justify-center items-center overflow-hidden">
                {/* 
                    This wrapper acts as the measurement target.
                    We hide the real card while flipping to avoid duplication.
                    But we MUST render it invisible so we can measure it?
                    Yes, measurement requires mounting.
                    So opacity: isFlipping ? 0 : 1
                */}
                <div
                    ref={cardTargetRef}
                    className="w-full h-full"
                    style={{
                        opacity: isFlipping ? 0 : 1,
                        // Ensure it takes up space during measurement
                        visibility: 'visible'
                    }}
                >
                    <PrescriptionCard Rx={Rx} specialty={specialty} id={id} />
                </div>
            </div>
        </motion.div>
    );
}
