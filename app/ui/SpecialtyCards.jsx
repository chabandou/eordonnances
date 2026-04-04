"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const specialtyCardRefs = specialties.map(() => useRef());

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10 lg:mt-0 lg:hidden uppercase">
        Spécialités
      </h1>
      <div className={styles.container}>
        {specialties.map((s, i) => {
          const colors = getSpecialtyColors(s.href || s.name);
          const bg = colors.g1;
          const targetHref = `/diseases?specialty=${s.href || s.name}`;

          return (
            <ScrollAnimatedCard
              key={s.name}
              cardRef={specialtyCardRefs[i]}
              className={styles.wrapper} // Wrapper gets the scroll ref logic if possible, or we wrap internal
              render={({ isCenterFocus }) => (
                <Link
                  href={targetHref}
                  className={styles.link}
                  style={{ "--specialty-bg": bg }}
                  onMouseEnter={() => router.prefetch(targetHref)}
                >
                  <Card
                    glow={true}
                    specialty={false} // We handle custom coloring via border
                    isCenterFocus={isCenterFocus}
                    className={styles.specialtyCard}
                    // We don't pass style bg here to avoid overriding internal card bg to white
                  >
                    <div className={styles.iconContainer}>{s.icon}</div>
                  </Card>
                  <span
                    className={clsx(
                      styles.text,
                      isCenterFocus && styles.visible,
                    )}
                  >
                    {s.name}
                  </span>
                </Link>
              )}
            />
          );
        })}
      </div>
    </>
  );
}
