"use client";
import DiseaseCard from "../index/DiseaseCard";
import { motion, AnimatePresence } from "framer-motion";

export default function CardsWithSpecialty({ specialty, diseases }) {
  return (
    <AnimatePresence>
      <div className="specialty-h w-[90%] flex flex-col items-center lg:items-start m-2 mt-4">
        <span
          key={specialty}
          className={`text-[2.75rem] leading-none lg:leading-tight md:text-4xl lg:text-[3.5rem] text-center lg:text-left font-bold specialty-h2 disease-card-${specialty} uppercase`}
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
          <AnimatePresence>
            <DiseaseCard i={i} key={d._id} d={d} />
          </AnimatePresence>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
