import PrintForm from "./PrintForm";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export default function Modal({ children, open, onClose }) {
    const modalRef = useRef(null);
    const previouslyFocused = useRef(null);

    useEffect(() => {
        if (!open) return;
        previouslyFocused.current = document.activeElement;
        // focus modal container for keyboard users
        modalRef.current?.focus?.();

        function onKey(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("keydown", onKey);
            // restore focus
            try {
                previouslyFocused.current?.focus?.();
            } catch (err) {}
        };
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className={styles.modal}
        >
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={styles.modalContent}
                ref={modalRef}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={styles.closeButton}
                    aria-label="Close dialog"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    ×
                </button>
                <h2 id="modal-title" className="sr-only">
                    Imprimez votre ordonnance
                </h2>
                <span style={{ color: "var(--text-color)" }}>Imprimez votre ordonnance</span>
                {children}
            </motion.div>
        </div>
    );
}

const fadeIn = {
    hidden: { opacity: 0.7, scale: 0.7 },
    visible: { opacity: 1, transition: { duration: 0.2 }, scale: 1 },
    exit: { opacity: 0.7, scale: 0.7 },
};