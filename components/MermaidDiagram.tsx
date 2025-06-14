"use client";
import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Loader2 } from "lucide-react";

interface MermaidDiagramProps {
  diagram: string;
  id: string;
}

function MermaidDiagram({ diagram, id }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMermaid = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Initialize mermaid with default settings
        mermaid.initialize({
          startOnLoad: true,
          theme: "default",
          securityLevel: "loose",
          fontFamily: "Inter, sans-serif",
        });

        if (containerRef.current && diagram) {
          // Clear previous content
          containerRef.current.innerHTML = "";
          
          // Render the diagram
          const { svg } = await mermaid.render(id, diagram);
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error("Error rendering Mermaid diagram:", err);
        setError("Failed to render diagram. Please check the syntax.");
      } finally {
        setIsLoading(false);
      }
    };

    initializeMermaid();
  }, [diagram, id]);

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
      className="mermaid-diagram my-4 p-4 bg-background/40 rounded-lg border border-border/50"
    />
  );
}

// Ensure the component is only rendered on the client side
if (typeof window === 'undefined') {
  MermaidDiagram.displayName = 'MermaidDiagram';
}

export default MermaidDiagram; 