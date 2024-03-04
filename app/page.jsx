"use client";

import { useRef } from "react";
import clsx from "clsx";
import Link from "next/link";

const specialties = [
  "Cardiologie",
  "Dermatologie",
  "Endocrinologie",
  "Gastro-entérologie",
  "Hématologie",
  "Neurologie",
  "Pédiatrie",
  "Pneumologie",
  "Infectiologie"
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
              href={`/diseases?specialty=${s}`}
              className={
                "specialty-card-content"
              }
            >
            </div>
            <Link href={`/diseases?specialty=${s}`} className="specialty-text w-full h-full flex justify-center items-center">
              <span>{s}</span>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
