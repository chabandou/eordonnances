"use client";

import { useRef, useState, useEffect } from "react";

import Link from "next/link";

import Lungs from "@/app/ui/icons/Lungs";
import Brain from "@/app/ui/icons/Brain";
import Skin from "@/app/ui/icons/Skin";
import Ambulance from "@/app/ui/icons/Ambulance";
import Stomach from "@/app/ui/icons/Stomach";
import Heart from "@/app/ui/icons/Heart";
import Uterus from "@/app/ui/icons/Uterus";
import Throat from "@/app/ui/icons/Throat";
import Bladder from "@/app/ui/icons/Bladder";

const specialties = [
  {
    name: "Dermatologie",
    icon: <Skin className="main-icon disease-card-Dermatologie" />,
  },
  {
    name: "Cardiologie",
    icon: <Heart className="main-icon disease-card-Cardiologie" />,
  },
  {
    name: "Gastro-entérologie",
    icon: <Stomach className="main-icon disease-card-Gastro-entérologie" />,
  },
  {
    name: "Urologie",
    icon: <Bladder className="main-icon disease-card-Urologie" />,
  },
  {
    name: "Neurologie",
    icon: <Brain className="main-icon disease-card-Neurologie" />,
  },
  {
    name: "Pneumologie",
    icon: <Lungs className="main-icon disease-card-Pneumologie" />,
  },
  {
    name: "Gynécologie",
    icon: <Uterus className="main-icon disease-card-Gynéco-Obstétrique" />,
    href: "Gynéco-Obstétrique",
  },
  {
    name: "ORL",
    icon: <Throat className="main-icon disease-card-Oto-rhino-laryngologie" />,
    href: "Oto-rhino-laryngologie",
  },
  {
    name: "Uregences",
    icon: <Ambulance className="main-icon disease-card-Uregences" />,
  },
];

export default function SpecialtyCards() {
  const specialtyCardRefs = specialties.map((_, i) => useRef());
  function handleMouseMove(e) {
    specialtyCardRefs.forEach((ref) => {
      const rect = ref.current.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
      ref.current.style.setProperty("--mouse-x", `${x}px`);
      ref.current.style.setProperty("--mouse-y", `${y}px`);
    });
  }
  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10 lg:mt-0 lg:hidden uppercase">
        Spécialités
      </h1>
      <div
        onMouseMove={(e) => handleMouseMove(e)}
      className="w-4/5 lg:w-full m-auto flex flex-wrap justify-center items-center gap-3 specialty-cards my-14 lg:my-0"
    > 
      {specialties.map((s, i) => (
        <ScrollAnimatedCard cardRef={specialtyCardRefs[i]} key={i} className="specialty-card lg:w-1/4 md:w-1/3 sm:w-2/3 w-full relative">
          <div
            href={`/diseases?specialty=${s.name}`}
            className={"specialty-card-content"}
          ></div>
          <Link
            href={`/diseases?specialty=${s.href ? s.href : s.name}`}
            className="specialty-text w-full h-full flex flex-col flex-wrap justify-center items-center"
          >
            {s.icon && s.icon}
            <span className={`disease-card-${s.href ? s.href : s.name} specialty-text-main`}>
              {s.name}
            </span>
          </Link>
        </ScrollAnimatedCard>
      ))}
    </div>
    </>
  );
}


const ScrollAnimatedCard = ({ children, className = '', cardRef }) => {
  const [isCenterFocus, setIsCenterFocus] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    // Check if device supports hover
    const checkHover = () => {
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setSupportsHover(hasHover);
      return hasHover;
    };

    const hasHover = checkHover();

    // Only set up scroll animation on non-hover devices
    if (!hasHover && cardRef.current) {
      const observerOptions = {
        root: null,
        rootMargin: '-180px 0px -240px 0px', // Adjust based on card height
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const ratio = entry.intersectionRatio;
          
          // Extra animation when element is centered
          setIsCenterFocus(ratio > 0.7);
        });
      }, observerOptions);

      observer.observe(cardRef.current);

      // Cleanup
      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }

    // Listen for media query changes (orientation/window resize)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const handleMediaChange = () => {
      setSupportsHover(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        animated-card 
        ${isCenterFocus && !supportsHover ? 'center-focus' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};
