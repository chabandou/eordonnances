"use client";
import DiseaseCard from "../index/DiseaseCard";
import { motion, AnimatePresence } from "framer-motion";

export default function CardsWithSpecialty({ diseases }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid place-items-center gap-2 lg:gap-0"
      >
        {diseases.map((d, i) => (
          <DiseaseCard i={i} key={d._id} d={d} />
        ))}{" "}
      </motion.div>
    </AnimatePresence>
  );
}
