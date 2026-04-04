import { useState, useCallback } from 'react';
import { useAnimationControls } from 'framer-motion';

/**
 * Hook to handle FLIP (First, Last, Invert, Play) animations
 * @param {Object} config Configuration object
 * @param {Object} config.originRef Ref of the element to animate
 * @param {Object} config.targetRect Target bounding rectangle { x, y, width, height }
 * @param {number} config.duration Animation duration in seconds
 * @param {Array} config.easing Easing curve array [x1, y1, x2, y2]
 * @returns {Object} { controls, startFlip, isAnimating }
 */
export function useFlipAnimation({ originRef, targetRect, duration = 0.6, easing = [0.32, 0.72, 0, 1] }) {
    const [isAnimating, setIsAnimating] = useState(false);
    const controls = useAnimationControls();

    const startFlip = useCallback(async () => {
        if (!originRef.current || !targetRect) return;

        // 1. First: Get current position of the element we're animating
        const first = originRef.current.getBoundingClientRect();
        const last = targetRect;

        // 2. Invert: Calculate the delta to make the element look like it's at 'First'
        // The element will be physically positioned at 'Last' (via fixed positioning in the portal)
        // So we translate it BACK to 'First'
        const deltaX = first.left - last.x;
        const deltaY = first.top - last.y;
        const scaleX = first.width / last.width;
        const scaleY = first.height / last.height;

        // Apply the inverted transform immediately (no animation)
        controls.set({
            x: deltaX,
            y: deltaY,
            scaleX,
            scaleY,
            transformOrigin: "top left",
            opacity: 1
        });

        setIsAnimating(true);

        // 3. Play: Animate to identity transform (0, 0, 1, 1) - which is the 'Last' position
        await controls.start({
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            transition: {
                duration,
                ease: easing,
                // Ensure scale animations are smooth
                layout: { duration, ease: easing }
            }
        });

        // Animation complete
        setIsAnimating(false);
    }, [originRef, targetRect, duration, easing, controls]);

    return { controls, startFlip, isAnimating };
}
