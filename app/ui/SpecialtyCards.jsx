"use client";

import { useRef } from "react";

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
    <div
      onMouseMove={(e) => handleMouseMove(e)}
      className="w-4/5 lg:w-full m-auto flex flex-wrap justify-center items-center gap-3 specialty-cards pt-4 pb-[calc(78px+1rem)] lg:pb-4 lg:my-auto"
    > 
      {specialties.map((s, i) => (
        <div ref={specialtyCardRefs[i]} key={i} className="specialty-card lg:w-1/4 md:w-1/3 sm:w-2/3 w-full relative">
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
        </div>
      ))}
    </div>
  );
}
