/**
 * Optimized event handling utilities
 * Throttle/debounce + dynamic viewport variables
 */

/**
 * Throttle function - limits execution to once per interval
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Minimum ms between calls (default: 50ms for scroll)
 */
export function throttle(fn, limit = 50) {
    let inThrottle = false;
    let lastArgs = null;

    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
                if (lastArgs) {
                    fn.apply(this, lastArgs);
                    lastArgs = null;
                }
            }, limit);
        } else {
            lastArgs = args;
        }
    };
}

/**
 * Debounce function - delays execution until after wait period
 * @param {Function} fn - Function to debounce
 * @param {number} wait - Ms to wait after last call (default: 300ms for resize)
 */
export function debounce(fn, wait = 300) {
    let timeout = null;

    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    };
}

/**
 * Updates CSS custom properties for viewport dimensions
 * Solves mobile 100vh issue and provides accurate viewport values
 */
export function updateViewportVariables() {
    if (typeof window === 'undefined') return;

    const vw = window.innerWidth * 0.01;
    const vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vw', `${vw}px`);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--viewport-width', `${window.innerWidth}px`);
    document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
}

/**
 * Initialize viewport variable tracking with debounced resize handler
 * Call this once in your app's root layout
 */
export function initViewportTracking() {
    if (typeof window === 'undefined') return () => { };

    // Initial update
    updateViewportVariables();

    // Debounced resize handler
    const handleResize = debounce(updateViewportVariables, 100);

    window.addEventListener('resize', handleResize, { passive: true });

    // Also update on orientation change (mobile)
    window.addEventListener('orientationchange', () => {
        // Small delay to let the browser settle
        setTimeout(updateViewportVariables, 100);
    }, { passive: true });

    // Cleanup function
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}

/**
 * Passive event listener helper
 * @param {Element} element - DOM element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {object} options - Additional options
 */
export function addPassiveListener(element, event, handler, options = {}) {
    element.addEventListener(event, handler, { passive: true, ...options });
    return () => element.removeEventListener(event, handler);
}
