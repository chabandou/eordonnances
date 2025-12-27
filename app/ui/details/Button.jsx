"use client";

import { motion } from "framer-motion";
import Print from "@/app/ui/icons/Print";

export default function Button({ Text, Icon }) {
  const printElement = () => {
    // const element = document.getElementById("Rx");
    const element = document.getElementById("prescription");
    const printWindow = window.open("", "", "height=720,width=1080");
    const stylesheetLink = document.querySelector('link[rel="stylesheet"]');
    const stylesheetURL = stylesheetLink ? stylesheetLink.href : null;

    printWindow.document.write("<html><head><title>Print</title>");
    if (stylesheetURL) {
      printWindow.document.write('<link rel="stylesheet" href="' + stylesheetURL + '">');
    }
    printWindow.document.write('</head><body>');
    printWindow.document.write(element.outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      id="print-button" style={{ color: 'var(--text-color)' }} className="print-button" onClick={printElement}>
      {Text}
      <Print width={37} height={37} />
    </motion.button>
  );
}
