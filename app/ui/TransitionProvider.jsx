'use client';

import { TransitionRouter } from 'next-transition-router';
import { animate } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export function TransitionProvider({ children }) {
    const router = useRouter();
    const skipEnterAnimation = useRef(false);

    return (
        <TransitionRouter
            auto={true}
            leave={(next, from, to) => {
                // Prefetch the next page immediately logic
                if (to) {
                    router.prefetch(to);
                }

                // Skip delay for disease detail pages (layoutId animations handle transition)
                const isDetailPage = to && /^\/diseases\/[a-f0-9]{24}$/.test(to);
                if (isDetailPage) {
                    next();  // Immediate navigation for layout animation sync
                    return;
                }

                // Wait for background exit animations (approx 0.9s)
                setTimeout(() => {
                    next();
                }, 900);
            }}
            enter={(next) => {
                next();
            }}
        >
            {children}
        </TransitionRouter>
    );
}
