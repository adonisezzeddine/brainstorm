"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, FileCode, FileImage, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";

interface ExportMenuProps {
  content: string;
  title: string;
}

const ExportMenu = ({ content, title }: ExportMenuProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportAsPDF = async () => {
    try {
      setIsExporting(true);
      const element = document.createElement("div");
      element.innerHTML = content;
      document.body.appendChild(element);

      const canvas = await html2canvas(element);
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title}.pdf`);

      document.body.removeChild(element);
    } catch (error) {
      console.error("Error exporting as PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsDOCX = async () => {
    try {
      setIsExporting(true);
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: title,
                heading: "Heading1",
              }),
              new Paragraph({
                text: content,
              }),
            ],
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      saveAs(blob, `${title}.docx`);
    } catch (error) {
      console.error("Error exporting as DOCX:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsHTML = () => {
    try {
      setIsExporting(true);
      const blob = new Blob([content], { type: "text/html" });
      saveAs(blob, `${title}.html`);
    } catch (error) {
      console.error("Error exporting as HTML:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsMarkdown = () => {
    try {
      setIsExporting(true);
      // Convert HTML to Markdown (you might want to use a library like turndown for this)
      const markdown = content.replace(/<[^>]*>/g, "");
      const blob = new Blob([markdown], { type: "text/markdown" });
      saveAs(blob, `${title}.md`);
    } catch (error) {
      console.error("Error exporting as Markdown:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting} className="flex items-center gap-2 px-3">
          <Share2 className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border border-border shadow-lg">
        <DropdownMenuItem onClick={exportAsPDF}>
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsDOCX}>
          <FileText className="mr-2 h-4 w-4" />
          Export as DOCX
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsHTML}>
          <FileCode className="mr-2 h-4 w-4" />
          Export as HTML
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsMarkdown}>
          <FileCode className="mr-2 h-4 w-4" />
          Export as Markdown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportMenu; 