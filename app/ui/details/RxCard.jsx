"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import RxArray from "@/app/ui/details/RxArray";
import RxObject from "@/app/ui/details/RxObject";
import Button from "@/app/ui/details/Button";
import Modal from "@/app/ui/details/Modal";
import PrintForm from "@/app/ui/details/PrintForm";
import Print from "@/app/ui/icons/Print";

export default function RxCard({ Rx, children }) {
  const [open, setOpen] = useState(false);
  // const RxContent = Array.isArray(Rx) ? (
  //   <RxArray Rx={Rx} />
  // ) : (
  //   <RxObject Rx={Rx} />
  // );
  return (
    <div className="z-30 w-full bg-transparent">
      {children}
      <Modal open={open} onClose={() => setOpen(!open)}>
        <PrintForm />
        <Button Text="Print" id="print-btn" />
      </Modal>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="z-99 print-button"
        onClick={() => setOpen(!open)}
      >
        <Print width={37} height={37} />
      </motion.button>
    </div>
  );
}
