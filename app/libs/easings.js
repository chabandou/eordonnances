/**
 * Centralized easing curves for smooth animations
 * Based on smooth-techniques.md analysis
 */

// Signature easing curves as arrays (for framer-motion)
export const EASINGS = {
    // Primary easing - smooth deceleration for UI transitions
    outSwift: [0.55, 0, 0.1, 1],

    // Secondary - balanced acceleration/deceleration
    inOutCubic: [0.645, 0.045, 0.355, 1],

    // Exponential out - dramatic smooth landing (already used in codebase)
    easeOutExpo: [0.22, 1, 0.36, 1],

    // Quick start, smooth finish - good for card interactions
    easeOutQuart: [0.25, 1, 0.5, 1],

    // Gentle spring-like feel
    easeOutBack: [0.34, 1.56, 0.64, 1],
};

// CSS cubic-bezier strings for use in CSS/inline styles
export const CSS_EASINGS = {
    outSwift: 'cubic-bezier(0.55, 0, 0.1, 1)',
    inOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    easeOutExpo: 'cubic-bezier(0.22, 1, 0.36, 1)',
    easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
    easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

// Standard durations (in seconds) for consistent timing
export const DURATIONS = {
    fast: 0.2,
    normal: 0.4,
    slow: 0.7,
    pageTransition: 0.9,
    backgroundMorph: 1.5,
};

// Pre-configured framer-motion transition presets
export const TRANSITIONS = {
    // Quick micro-interactions (hover, focus)
    micro: {
        duration: DURATIONS.fast,
        ease: EASINGS.outSwift,
    },

    // Standard UI transitions (appear, disappear)
    standard: {
        duration: DURATIONS.normal,
        ease: EASINGS.outSwift,
    },

    // Card/modal transitions
    card: {
        duration: DURATIONS.slow,
        ease: EASINGS.easeOutExpo,
    },

    // FLIP transition for card expansion
    flip: {
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1], // fluid deceleration
    },

    // Background shape morphing
    background: {
        duration: DURATIONS.backgroundMorph,
        ease: EASINGS.easeOutExpo,
    },

    // Page enter/exit
    page: {
        duration: DURATIONS.pageTransition,
        ease: EASINGS.inOutCubic,
    },
};
