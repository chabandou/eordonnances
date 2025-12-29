"use client";

import DiseaseCard from "../index/DiseaseCard";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CardsWithSpecialty.module.css";
import { getSpecialtyColors } from "@/app/libs/specialties";

export default function CardsWithSpecialty({ specialty, diseases }) {
  const colors = getSpecialtyColors(specialty);

  return (
    <AnimatePresence>
      <div className={styles.headerContainer}>
        <span
          key={specialty}
          style={{
            "--g1": colors.g1,
            "--g2": colors.g2,
            "--g3": colors.g3,
          }}
          className={styles.specialtyTitle}
        >
          {specialty}
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 place-items-center gap-2"
      >
        {diseases.map((d, i) => (
          <DiseaseCard i={i} key={d._id} d={d} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
