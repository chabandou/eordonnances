"use client";

import Rx from "@/app/ui/icons/Rx";
import { motion } from "framer-motion";
import { getSpecialtyColorsWithShading } from "@/app/libs/specialties";
import { useRef, useEffect } from 'react';

export default function PrescriptionCard({ Rx: medications, specialty, id }) {
    const scrollContainerRef = useRef(null);

    // Scroll Hint Animation
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            // Check if scrollable
            if (container.scrollHeight > container.clientHeight) {
                const timer = setTimeout(() => {
                    // Smooth scroll down
                    container.scrollTo({ top: 50, behavior: 'smooth' });

                    // Then back up
                    setTimeout(() => {
                        container.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 800);
                }, 800);
                return () => clearTimeout(timer);
            }
        }
    }, [medications]);

    // Get specialty colors with pre-computed shading
    const { darker } = getSpecialtyColorsWithShading(specialty || "Médecine générale");

    // Dynamic styles for text/icons
    const dynamicStyle = {
        color: darker,
        backgroundColor: darker
    };

    // --- DATA NORMALIZATION ---
    // The Rx prop can be:
    // 1. An Array of medication objects/strings.
    // 2. An Object where keys are categories (e.g. "Adultes") and values are Arrays/Strings.

    let normalizedSections = [];

    if (!medications) {
        normalizedSections = [];
    } else if (Array.isArray(medications)) {
        normalizedSections = [{ title: null, items: medications }];
    } else if (typeof medications === 'object') {
        normalizedSections = Object.entries(medications).map(([key, value]) => ({
            title: key, // e.g., "Adultes", "Enfants"
            items: Array.isArray(value) ? value : [value]
        }));
    } else {
        // Fallback for single string or unknown
        normalizedSections = [{ title: null, items: [medications] }];
    }

    // Helper to extract medication fields safely
    const getMedData = (med) => {
        if (typeof med === 'string') return { name: med };

        return {
            name: med.name || med.mdc || "Médicament sans nom",
            dosage: Array.isArray(med.dosage) ? med.dosage.join(" | ") : med.dosage,
            quantity: med.quantity,
            instructions: med.instructions || med.Instructions, // Handle capitalized version
            notes: med.note
        };
    };

    const renderInstructions = (instr) => {
        if (!instr) return;
        if (Array.isArray(instr)) {
            return (
                <ul className="list-disc pl-4 space-y-1">
                    {instr.map((i, idx) => <li key={idx}>{i}</li>)}
                </ul>
            );
        }
        return instr;
    };

    return (
        <motion.div
            id="prescription-card-target"
            transition={{
                duration: 0.3,
                ease: "easeOut"
            }}
            style={{
                borderRadius: "1.5rem",
            }}
            className="bg-white shadow-xl w-full max-w-2xl h-full max-h-full flex flex-col relative overflow-hidden text-gray-800"
        >
            {/* Header */}
            <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex items-start justify-between p-8 pb-6 border-b border-dashed border-gray-300 shrink-0">
                <div className="flex items-center gap-4">
                    <div
                        className="p-3 rounded-2xl text-white transition-colors duration-300"
                        style={{ backgroundColor: dynamicStyle.backgroundColor }}
                    >
                        <Rx className="w-8 h-8 fill-current text-white" />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                            TRAITEMENT SUGGÉRÉ
                        </h3>
                        <h2
                            className="text-xl font-bold transition-colors duration-300"
                            style={{ color: dynamicStyle.color }}
                        >
                            Ordonnance Médicale
                        </h2>
                    </div>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="font-bold text-gray-800">Dr. Amari H.</p>
                    <p className="text-xs text-gray-400">Lic. #849302-AZ</p>
                </div>
            </motion.div>

            {/* Medication List Section - Scrollable */}
            <motion.div ref={scrollContainerRef} animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex-1 overflow-y-auto px-8 py-6 space-y-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {normalizedSections.length > 0 ? (
                    normalizedSections.map((section, sectionIdx) => (
                        <div key={sectionIdx} className="space-y-6">
                            {/* Section Header if exists */}
                            {section.title && (
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 mt-4 mb-4">
                                    {section.title}
                                </h3>
                            )}

                            {section.items.map((rawMed, medIdx) => {
                                const med = getMedData(rawMed);
                                const displayIndex = (medIdx + 1).toString().padStart(2, "0");

                                return (
                                    <div key={medIdx} className="relative pl-10 mb-6 last:mb-0">
                                        <span className="absolute left-0 top-1 text-gray-300 font-bold text-sm">
                                            {displayIndex}
                                        </span>

                                        <div className="flex flex-row items-end justify-between mb-2 w-full">
                                            <h4 className="text-lg font-bold text-gray-800 leading-tight block shrink-0 max-w-[70%]">
                                                {med.name}
                                            </h4>

                                            {med.quantity && (
                                                <>
                                                    <div className="flex-1 mx-2 mb-2 border-b-2 border-gray-300"></div>
                                                    <div className="shrink-0 text-right">
                                                        <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 whitespace-nowrap">
                                                            Qté: {med.quantity}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Dosage Badge */}
                                        <div className="inline-block bg-gray-100 rounded px-3 py-1 text-sm font-medium text-gray-600 mb-2">
                                            {med.dosage || "Dosage standard"}
                                        </div>

                                        {/* Instructions */}
                                        <div className="text-gray-500 text-sm leading-relaxed">
                                            {renderInstructions(med.instructions)}
                                        </div>

                                        {/* Notes */}
                                        {med.notes && (
                                            <p className="text-gray-400 text-xs mt-2 italic border-l-2 border-gray-200 pl-2">
                                                Note: {med.notes}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 italic py-10">
                        Aucun médicament listé.
                    </p>
                )}
            </motion.div>

            {/* Footer / Actions - Fixed at bottom of card */}
            <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }} transition={{ duration: 0.5, delay: 0.5 }} className="p-8 pt-6 border-t border-dashed border-gray-300 flex flex-col sm:flex-row justify-end items-center gap-4 shrink-0 bg-white z-10">
                {/* Buttons */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button disabled className="px-6 py-2 rounded-full text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors font-medium text-sm flex-1 sm:flex-none">
                        Modifier
                    </button>
                    <button className="px-6 py-2 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm hover:shadow transition-shadow font-bold text-sm flex items-center justify-center gap-2 flex-1 sm:flex-none">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                            />
                        </svg>
                        Imprimer / Envoyer
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
