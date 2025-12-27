
import PrintForm from "./PrintForm";
import { motion } from "framer-motion";

export default function Modal({ children, open, onClose }) {
    if (!open) return null;
    return (
        <div onClick={onClose} className="modal flex flex-col items-center justify-center">
            <button className="modal-close" onClick={onClose}>X</button>
            <motion.div
             variants={fadeIn}
             initial="hidden"
             animate="visible"
             exit="exit"
             className="modal-content">
             <span style={{ color: 'var(--text-color)' }}>Imprimez votre ordonnance</span>
                {children}
            </motion.div>
        </div>
    );
}

const fadeIn = {
    hidden: { opacity: 0.7, scale: 0.7 },
    visible: { opacity: 1, transition: { duration: 0.2 }, scale: 1 },
    exit: { opacity: 0.7, scale: 0.7 },
}