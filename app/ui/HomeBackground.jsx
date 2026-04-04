'use client';

import { motion } from "framer-motion";
import { useTransitionState } from "next-transition-router";
import { EASINGS, DURATIONS } from "@/app/libs/easings";

// Static variants defined outside component to prevent recreation
const backShapeVariants = {
    initial: {
        x: 300,
        y: 300,
        rotate: 55,
        scaleY: 2,
        clipPath: 'polygon(20% 5%, 100% 0, 100% 100%, 5% 95%)',
    },
    animate: {
        x: 0,
        y: 0,
        rotate: 15,
        scaleY: 1.5,
        clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)',
        transition: {
            duration: DURATIONS.backgroundMorph,
            ease: EASINGS.easeOutExpo,
        }
    },
    exit: {
        x: 300,
        y: 300,
        rotate: 55,
        scaleY: 2,
        clipPath: 'polygon(20% 5%, 100% 0, 100% 100%, 5% 95%)',
        transition: {
            duration: DURATIONS.slow,
            ease: EASINGS.easeOutExpo,
            delay: 0.1
        }
    }
};

const frontShapeVariants = {
    initial: {
        x: 300,
        y: 300,
        rotate: 55,
        scaleY: 2,
        clipPath: 'polygon(30% 0, 95% 5%, 100% 100%, 0 95%)',
    },
    animate: {
        x: 0,
        y: 0,
        rotate: 15,
        scaleY: 1.5,
        clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)',
        transition: {
            duration: DURATIONS.backgroundMorph,
            ease: EASINGS.easeOutExpo,
            delay: 0.2,
        }
    },
    exit: {
        x: 300,
        y: 300,
        rotate: 55,
        scaleY: 2,
        clipPath: 'polygon(30% 0, 95% 5%, 100% 100%, 0 95%)',
        transition: {
            duration: DURATIONS.slow,
            ease: EASINGS.easeOutExpo,
            delay: 0
        }
    }
};

export default function HomeBackground() {
    const { stage } = useTransitionState();
    const currentVariant = stage === 'leaving' ? 'exit' : 'animate';

    return (
        <>
            <motion.div
                key="home-bg-back"
                className="background origin-left"
                style={{
                    height: '300%',
                    width: '55%',
                    right: '10%',
                    backgroundColor: 'var(--shape-bg-1)',
                    pointerEvents: 'none',
                }}
                variants={backShapeVariants}
                initial="initial"
                animate={currentVariant}
                exit="exit"
            />
            <motion.div
                key="home-bg-front"
                className="background origin-left"
                style={{
                    height: '300%',
                    width: '55%',
                    right: '0%',
                    backgroundColor: 'var(--shape-bg-2)',
                    pointerEvents: 'none',
                }}
                variants={frontShapeVariants}
                initial="initial"
                animate={currentVariant}
                exit="exit"
            />
        </>
    );
}
