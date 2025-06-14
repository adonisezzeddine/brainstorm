"use client";
import { useState } from 'react';
import { FileDown, FileText, FileType, FileImage } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

interface ExportOptionsProps {
  content: string;
  title: string;
}

const ExportOptions = ({ content, title }: ExportOptionsProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.querySelector('.ProseMirror');
      if (!element) return;

      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToDocx = async () => {
    setIsExporting(true);
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: title,
                  bold: true,
                  size: 32,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: content,
                  size: 24,
                }),
              ],
            }),
          ],
        }],
      });

      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, `${title}.docx`);
    } catch (error) {
      console.error('Error exporting to DOCX:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToMarkdown = () => {
    setIsExporting(true);
    try {
      const blob = new Blob([content], { type: 'text/markdown' });
      saveAs(blob, `${title}.md`);
    } catch (error) {
      console.error('Error exporting to Markdown:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToHTML = () => {
    setIsExporting(true);
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Inter, sans-serif; line-height: 1.6; }
              .content { max-width: 800px; margin: 0 auto; padding: 20px; }
            </style>
          </head>
          <body>
            <div class="content">
              ${content}
            </div>
          </body>
        </html>
      `;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      saveAs(blob, `${title}.html`);
    } catch (error) {
      console.error('Error exporting to HTML:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={exportToPDF}
        disabled={isExporting}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        title="Export as PDF"
      >
        <FileDown className="w-4 h-4" />
        PDF
      </button>
      <button
        onClick={exportToDocx}
        disabled={isExporting}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        title="Export as DOCX"
      >
        <FileText className="w-4 h-4" />
        DOCX
      </button>
      <button
        onClick={exportToMarkdown}
        disabled={isExporting}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        title="Export as Markdown"
      >
        <FileType className="w-4 h-4" />
        MD
      </button>
      <button
        onClick={exportToHTML}
        disabled={isExporting}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        title="Export as HTML"
      >
        <FileImage className="w-4 h-4" />
        HTML
      </button>
    </div>
  );
};

export default ExportOptions; 