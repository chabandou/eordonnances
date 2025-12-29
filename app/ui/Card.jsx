"use client";

import { useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "./Card.module.css";

/**
 * Base Card component following the "Rounded Information Cards" pattern.
 * Supports mouse-tracking glow effects and specialty branding.
 */
export default function Card({ 
  children, 
  className, 
  style, 
  glow = true, 
  specialty = false,
  isCenterFocus = false,
  onClick 
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!glow) return;

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [glow]);

  return (
    <div 
      ref={cardRef}
      style={style}
      onClick={onClick}
      data-specialty={specialty}
      className={clsx(
        styles.card, 
        glow && styles.glow,
        isCenterFocus && styles.centerFocus,
        className
      )}
    >
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
