"use client";

import { useState } from "react";

import Button from "@/app/ui/details/Button";
import Modal from "@/app/ui/details/Modal";
import PrintForm from "@/app/ui/details/PrintForm";
import Print from "@/app/ui/icons/Print";
import { motion } from "framer-motion";

export default function RxCard({ Rx, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="z-30 w-full bg-transparent min-h-fit flex flex-col justify-center items-center ">
      {children}
      <Modal open={open} onClose={() => setOpen(!open)}>
        <PrintForm />
        <Button Text="Print" id="print-btn" />
      </Modal>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="z-99 print-button absolute top-[5%] left-[85%] h-fit"
        onClick={() => setOpen(!open)}
        title="Imprimer la prescription"
      >
        <Print width={37} height={37} />
      </motion.button>
    </div>
  );
}
