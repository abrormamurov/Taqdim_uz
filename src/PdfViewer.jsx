import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

function PdfViewer({ pdfUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPdf = async () => {
      if (pdfUrl) {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport,
        };
        await page.render(renderContext).promise;
      }
    };
    loadPdf();
  }, [pdfUrl]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", border: "1px solid gray" }}
    />
  );
}

export default PdfViewer;
