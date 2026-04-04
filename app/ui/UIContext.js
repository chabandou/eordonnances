"use client";

import React, { createContext, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [isHeroExpanding, setIsHeroExpanding] = useState(false);
    const [clickedSpecialty, setClickedSpecialty] = useState(null);

    // Selected disease for in-page detail view
    // Shape: { id, data, specialty } or null
    const [selectedDisease, setSelectedDisease] = useState(null);

    // FLIP Animation State
    // Shape: { diseaseId, originRect, targetRect } or null
    const [flipState, setFlipState] = useState(null);

    // Closing state for reverse animation
    const [isClosing, setIsClosing] = useState(false);

    return (
        <AnimatePresence mode="wait">
            <UIContext.Provider value={{
                isHeroExpanding, setIsHeroExpanding,
                clickedSpecialty, setClickedSpecialty,
                selectedDisease, setSelectedDisease,
                flipState, setFlipState,
                isClosing, setIsClosing
            }}>
                {children}
            </UIContext.Provider>
        </AnimatePresence>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error("useUI must be used within a UIProvider");
    }
    return context;
};

