"use client";

import { useState } from "react";
import RxArray from "@/app/ui/details/RxArray";
import RxObject from "@/app/ui/details/RxObject";
import Button from "@/app/ui/details/Button";
import Modal from "@/app/ui/details/Modal";
import PrintForm from "@/app/ui/details/PrintForm";
import Print from "@/app/ui/icons/Print";


export default function RxCard({ Rx }) {
  const [open, setOpen] = useState(false);
  const RxContent = Array.isArray(Rx) ? (
    <RxArray Rx={Rx} />
  ) : (
    <RxObject Rx={Rx} />
  );
  return (
    <div className="z-30">
      <div className="Rx-h1">
        <h1 className="font-bold">Rx</h1>
      </div>
      {Array.isArray(Rx) ? <RxArray Rx={Rx} /> : <RxObject Rx={Rx} />}
      <Modal open={open} onClose={() => setOpen(!open)}>
        <PrintForm Rx={RxContent} />
        <Button Text="Print" id="print-btn" />
      </Modal>
      <button className="z-99 print-button" onClick={() => setOpen(!open)}>
        <Print width={37} height={37} />
      </button>
    </div>
  );
}
