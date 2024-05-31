
import PrintForm from "./PrintForm";

export default function Modal({ children, open, onClose }) {
    if (!open) return null;
    return (
        <div className="modal flex flex-col items-center justify-center">
            <button className="modal-close" onClick={onClose}>X</button>
            <div className="modal-content">
            <span className="text-white">Imprimez votre ordonnance</span>
                {children}
            </div>
        </div>
    );
}