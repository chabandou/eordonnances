"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import stetho from "@/public/stetho.svg";
import clsx from "clsx";
import ScrollAnimatedCard from "../ScrollAnimatedCard";
import Card from "../Card";
import styles from "./DiseaseCard.module.css";

import Stetho from "@/app/ui/index/Stetho";
import { getSpecialtyColors } from "@/app/libs/specialties";
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
    icon: <Skin className="icon" />,
  },
  {
    name: "Cardiologie",
    icon: <Heart className=" icon" />,
  },
  {
    name: "Gastro-entérologie",
    icon: <Stomach className="icon" />,
  },
  {
    name: "Urologie",
    icon: <Bladder className="icon" />,
  },
  {
    name: "Neurologie",
    icon: <Brain className="icon" />,
  },
  {
    name: "Pneumologie",
    icon: <Lungs className="icon" />,
  },
  {
    name: "Gynécologie",
    icon: <Uterus className="icon" />,
  },
  { name: "ORL", icon: <Throat className="icon" /> },
  {
    name: "Uregences",
    icon: <Ambulance className="icon" />,
  },
];

export default function DiseaseCard({ d, i }) {
  const diseaseCardRef = useRef();
  const specialtyName = typeof d.disease.specialty === "string"
    ? d.disease.specialty
    : d.disease.specialty[0];
  
  const colors = getSpecialtyColors(specialtyName);
  
  const icon = specialties.find((s) => s.name === specialtyName)
    ?.icon; // We'll handle class in the icon directly or via CSS

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-[90%] lg:w-[40vw] p-0 lg:max-h-fit m-2 mt-4"
    >
      <Link
        key={d._id}
        href={`/diseases/${d._id}`}
        className="hover:cursor-pointer border-transparent rounded-3xl text-xl w-full"
      >
        <ScrollAnimatedCard
          cardRef={diseaseCardRef}
          className="w-full min-h-[120px] lg:aspect-[3.75/1] mx-auto"
          render={({ isCenterFocus }) => (
            <Card
              specialty={true}
              glow={true}
              isCenterFocus={isCenterFocus}
              style={{
                "--g1": colors.g1,
                "--g2": colors.g2,
                "--g3": colors.g3,
              }}
              className={clsx("w-full h-full", styles.card)}
            >
              <div className={styles.content}>
                <h2 className={styles.title}>
                  {d.disease.name}
                </h2>
                <h3 className={styles.specialty}>
                  {typeof d.disease.specialty === "string"
                    ? d.disease.specialty
                    : d.disease.specialty.join(", ")}
                </h3>
                
                {icon ? (
                  <div className={styles.iconOverlay}>
                    {icon}
                  </div>
                ) : (
                  <div className={styles.stethoOverlay}>
                    <Stetho />
                  </div>
                )}
              </div>
            </Card>
          )}
        />
      </Link>
    </motion.div>
  );
}
