"use client";

import { useRef } from "react";
import clsx from "clsx";
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
  { name: "Dermatologie", icon: <Skin className="main-icon disease-card-Dermatologie" /> },
  { name: "Cardiologie", icon: <Heart className="main-icon disease-card-Cardiologie" /> },
  { name: "Gastro-entérologie", icon: <Stomach className="main-icon .disease-card-Gastro-entérologie" /> },
  { name: "Urologie", icon: <Bladder className="main-icon disease-card-Uregences" /> },
  { name: "Neurologie", icon: <Brain className="main-icon disease-card-Neurologie" /> },
  { name: "Pneumologie", icon: <Lungs className="main-icon disease-card-Pneumologie" /> },
  { name: "Gynécologie", icon: <Uterus className="main-icon disease-card-Urologie" /> },
  { name: "ORL", icon: <Throat className="main-icon disease-card-ORL" /> },
  { name: "Uregences", icon: <Ambulance className="main-icon disease-card-Gynécologie" /> },
];

export default function Home() {
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
    <main className="container p-5">
      <div
        onMouseMove={(e) => handleMouseMove(e)}
        className="w-3/4 m-auto flex flex-wrap justify-center items-center gap-3 specialty-cards"
      >
        {specialties.map((s, i) => (
          <div ref={specialtyCardRefs[i]} key={i} className="specialty-card">
            <div
              href={`/diseases?specialty=${s.name}`}
              className={"specialty-card-content"}
            ></div>
            <Link
              href={`/diseases?specialty=${s.name}`}
              className="specialty-text w-full h-full flex flex-col flex-wrap justify-center items-center"
            >
              {s.icon && s.icon}
              <span className={`disease-card-${s.name}`}>{s.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
