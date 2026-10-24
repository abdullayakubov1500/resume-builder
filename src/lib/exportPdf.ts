import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

export async function exportResumeToPdf(
  elementId: string,
  fileName: string,
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Элемент для экспорта не найден");
  }

  element.classList.add("pdf-export");

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = A4_WIDTH_MM;
    const pageHeight = A4_HEIGHT_MM;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const safeName =
      fileName.trim().replace(/[^\wа-яА-ЯёЁ\s-]/gi, "").trim() || "resume";
    pdf.save(`${safeName}-resume.pdf`);
  } finally {
    element.classList.remove("pdf-export");
  }
}
