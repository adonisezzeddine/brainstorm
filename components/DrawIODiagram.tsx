"use client";
import { useEffect, useRef, useState } from 'react';
import { Loader2 } from "lucide-react";
import { NodeViewProps } from '@tiptap/core';

interface DrawIOAttributes {
  xml: string;
  id: string;
}

const DrawIODiagram = ({ node }: NodeViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { xml, id } = node.attrs as DrawIOAttributes;

  useEffect(() => {
    const loadDiagram = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (containerRef.current) {
          // Clear previous content
          containerRef.current.innerHTML = "";
          
          // Create a new iframe for the diagram
          const iframe = document.createElement('iframe');
          iframe.style.width = '100%';
          iframe.style.height = '400px';
          iframe.style.border = 'none';
          iframe.src = `https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=${id}#${encodeURIComponent(xml)}`;
          
          containerRef.current.appendChild(iframe);
        }
      } catch (err) {
        console.error("Error loading Draw.io diagram:", err);
        setError("Failed to load diagram.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDiagram();
  }, [xml, id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 border rounded-lg bg-muted/50">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-destructive/10 text-destructive">
        {error}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="drawio-diagram my-4 p-4 bg-background/40 rounded-lg border border-border/50"
    />
  );
};

export default DrawIODiagram; 