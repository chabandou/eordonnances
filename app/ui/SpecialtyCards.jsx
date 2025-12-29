"use client";

import { useRef } from "react";
import Link from "next/link";
import ScrollAnimatedCard from "./ScrollAnimatedCard";
import Lungs from "@/app/ui/icons/Lungs";
import Brain from "@/app/ui/icons/Brain";
import Skin from "@/app/ui/icons/Skin";
import Ambulance from "@/app/ui/icons/Ambulance";
import Stomach from "@/app/ui/icons/Stomach";
import Heart from "@/app/ui/icons/Heart";
import Uterus from "@/app/ui/icons/Uterus";
import Throat from "@/app/ui/icons/Throat";
import Bladder from "@/app/ui/icons/Bladder";

import Card from "./Card";
import styles from "./SpecialtyCards.module.css";
import clsx from "clsx";

import { getSpecialtyColors } from "@/app/libs/specialties";

// ... specialties array remains same
const specialties = [
  { name: "Dermatologie", icon: <Skin className={styles.icon} /> },
  { name: "Cardiologie", icon: <Heart className={styles.icon} /> },
  { name: "Gastro-entérologie", icon: <Stomach className={styles.icon} /> },
  { name: "Urologie", icon: <Bladder className={styles.icon} /> },
  { name: "Neurologie", icon: <Brain className={styles.icon} /> },
  { name: "Pneumologie", icon: <Lungs className={styles.icon} /> },
  {
    name: "Gynécologie",
    icon: <Uterus className={styles.icon} />,
    href: "Gynéco-Obstétrique",
  },
  {
    name: "ORL",
    icon: <Throat className={styles.icon} />,
    href: "Oto-rhino-laryngologie",
  },
  { name: "Urgences", icon: <Ambulance className={styles.icon} /> },
];

export default function SpecialtyCards() {
  const specialtyCardRefs = specialties.map(() => useRef());

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10 lg:mt-0 lg:hidden uppercase">
        Spécialités
      </h1>
      <div className={clsx(styles.container, "w-4/5 lg:w-full mx-auto")}> 
        {specialties.map((s, i) => {
          const colors = getSpecialtyColors(s.href || s.name);
          return (
            <ScrollAnimatedCard 
              key={s.name}
              cardRef={specialtyCardRefs[i]} 
              className="lg:w-1/4 md:w-1/3 sm:w-2/3 w-full"
              render={({ isCenterFocus }) => (
                <Card
                  glow={true}
                  specialty={false}
                  isCenterFocus={isCenterFocus}
                  style={{
                    "--specialty-bg": colors.g1,
                  }}
                  className={styles.specialtyCard}
                >
                  <Link
                    href={`/diseases?specialty=${s.href || s.name}`}
                    className={styles.link}
                  >
                    {s.icon}
                    <span className={styles.text}>
                      {s.name}
                    </span>
                  </Link>
                </Card>
              )}
            />
          );
        })}
      </div>
    </>
  );
}



