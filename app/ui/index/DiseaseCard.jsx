"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import stetho from "@/public/stetho.svg";
import clsx from "clsx";
import ScrollAnimatedCard from "../ScrollAnimatedCard";

import Stetho from "@/app/ui/index/Stetho";
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
  const icon = specialties.find((s) => s.name === d.disease.specialty)
    ?.icon || <Stetho className="stetho" />;

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
          rootMargin="-35% 0px -35% 0px"
          className={`disease-card w-full min-h-[120px] lg:aspect-[3.75/1] mx-auto disease-card-${d.disease.specialty}`}
        >
          <div
            className=" *:z-10 z-[5] flex flex-col rounded-3xl p-4 gap-3 disease-card-content"
            key={d._id}
          >
            <h2 className="font-bold text-gray-300 text-2xl line-clamp-1 transition ease-out duration-250">
              {d.disease.name}
            </h2>
            <h3 className="text-white text-opacity-80 uppercase text-base tracking-wide">
              {typeof d.disease.specialty === "string"
                ? d.disease.specialty
                : d.disease.specialty.join(", ")}
            </h3>
            {/* <span className="text-white text-opacity-70 text-sm text-right">{i+1}</span> */}
            {icon}
          </div>
        </ScrollAnimatedCard>
      </Link>
    </motion.div>
  );
}
