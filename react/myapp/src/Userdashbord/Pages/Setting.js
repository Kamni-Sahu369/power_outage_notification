import React from "react";
import { jsPDF } from "jspdf";

const ExportPDF = () => {
  const generatePDF = () => {
    // PDF ka object banayein
    const doc = new jsPDF();

    // Text ko PDF mein add karein
    doc.text("Hello, this is a simple PDF generated in React!", 10, 10);

    // PDF ko save ya download karne ke liye
    doc.save("generated-file.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Export PDF</button>
    </div>
  );
};

export default ExportPDF;
