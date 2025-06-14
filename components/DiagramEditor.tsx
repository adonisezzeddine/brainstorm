"use client";
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface DiagramEditorProps {
  onInsert: (type: 'mermaid' | 'plantuml', content: string) => void;
}

const DiagramEditor = ({ onInsert }: DiagramEditorProps) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<'mermaid' | 'plantuml'>('mermaid');

  const handleInsert = () => {
    if (!content.trim()) {
      toast.error('Please enter diagram content');
      return;
    }
    onInsert(type, content);
    setContent('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
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
            className="w-4 h-4"
          >
            <path d="M3 3h18v18H3z" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          Add Diagram
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Insert Diagram</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="mermaid" onValueChange={(value) => setType(value as 'mermaid' | 'plantuml')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mermaid">Mermaid</TabsTrigger>
            <TabsTrigger value="plantuml">PlantUML</TabsTrigger>
          </TabsList>
          <TabsContent value="mermaid" className="space-y-4">
            <div className="space-y-2">
              <Label>Mermaid Diagram</Label>
              <Input
                placeholder="graph TD&#10;A[Start] --> B{Is it?}&#10;B -- Yes --> C[OK]&#10;B -- No --> D[End]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="font-mono"
                rows={5}
                as="textarea"
              />
            </div>
          </TabsContent>
          <TabsContent value="plantuml" className="space-y-4">
            <div className="space-y-2">
              <Label>PlantUML Diagram</Label>
              <Input
                placeholder="@startuml&#10;Alice -> Bob: Hello&#10;Bob --> Alice: Hi there!&#10;@enduml"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="font-mono"
                rows={5}
                as="textarea"
              />
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setContent('')}>
            Clear
          </Button>
          <Button onClick={handleInsert}>
            Insert Diagram
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiagramEditor; 