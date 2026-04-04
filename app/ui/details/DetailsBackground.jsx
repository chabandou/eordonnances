"use client";

import { motion } from "framer-motion";
import { getSpecialtyColorsWithShading } from "@/app/libs/specialties";
import { useTheme } from "@/app/ui/ThemeContext";

export default function DetailsBackground({ specialty }) {
    const { theme } = useTheme();
    const { darker } = getSpecialtyColorsWithShading(specialty);

    const isDark = theme === 'dark';

    // Design request: Always use the darker of the two colors
    const bgColor = darker;

    return (
        <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            initial={false}
            animate={{
                backgroundColor: bgColor,
                filter: isDark ? "brightness(0.6) saturate(1.1)" : "brightness(1) saturate(1)"
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
                width: '52%',
                left: '0%',
                clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)',
                height: '100vh'
            }}
        />
    );
}
