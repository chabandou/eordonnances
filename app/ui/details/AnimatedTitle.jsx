'use client';

import { motion } from 'framer-motion';

export default function AnimatedTitle({ children, id, className }) {
    return (
        <motion.h1
            layoutId={`card-title-${id}`}
            transition={{

                layout: {
                    duration: 0.5,
                    ease: "easeOut"
                }
            }}
            className={`font-sans ${className}`}
        >
            {children}
        </motion.h1>
    );
}
