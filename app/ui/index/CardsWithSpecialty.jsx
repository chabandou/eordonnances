"use client";
import DiseaseCard from "../index/DiseaseCard";
import { motion, AnimatePresence } from "framer-motion";

export default function CardsWithSpecialty({ specialty, diseases }) {
  return (
    <AnimatePresence>
      <div className="specialty-h w-3/4 text-left m-2 mt-4">
        <h2
          key={specialty}
          className={`text-[3.5rem] font-bold specialty-h2 disease-card-${specialty} uppercase`}
        >
          {specialty}
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-5"
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
