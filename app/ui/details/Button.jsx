"use client";

import Print from "@/app/ui/icons/Print";

export default function Button({ Text, Icon }) {
  const printElement = () => {
    // const element = document.getElementById("Rx");
    const element = document.getElementById("prescription");
    const printWindow = window.open("", "", "height=720,width=1080");
    const stylesheetURL = document.querySelector('link[rel="stylesheet"]').href;

    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(
      '<link rel="stylesheet" href="' + stylesheetURL + '">'
    );
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
    <button id="print-button" className="print-button text-white" onClick={printElement}>
      {Text}
      <Print width={37} height={37} />
    </button>
  );
}
