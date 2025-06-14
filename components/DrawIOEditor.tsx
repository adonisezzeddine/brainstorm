"use client";
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DrawIOEditorProps {
  onSave: (xml: string) => void;
}

const DrawIOEditor = ({ onSave }: DrawIOEditorProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen && iframeRef.current) {
      const iframe = iframeRef.current;
      const handleMessage = (event: MessageEvent) => {
        if (event.data.event === 'init') {
          setIsLoading(false);
        } else if (event.data.event === 'save') {
          onSave(event.data.xml);
          setIsOpen(false);
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [isOpen, onSave]);

  const handleSave = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({ action: 'save' }, '*');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M3 3h18v18H3z" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] h-[90vh]">
        <DialogHeader>
          <DialogTitle>Draw.io Editor</DialogTitle>
        </DialogHeader>
        <div className="relative flex-1">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          )}
          <iframe
            ref={iframeRef}
            src="https://embed.diagrams.net/"
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DrawIOEditor; 