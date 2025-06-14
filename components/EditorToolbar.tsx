"use client";

import { Editor } from "@tiptap/core";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Table,
  Image,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Eraser,
  Type,
  Minus,
  Subscript,
  Superscript,
  Highlighter,
  Palette,
  Indent,
  Outdent,
  GitBranch,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { MermaidRenderer } from "./MermaidRenderer";
import { TablePicker } from "@/components/TablePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EditorToolbarProps {
  editor: Editor | null;
}

const FONT_FAMILIES = [
  { label: "Default", value: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Helvetica", value: "Helvetica, sans-serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
  { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
  { label: "Impact", value: "Impact, sans-serif" },
  { label: "Comic Sans MS", value: "Comic Sans MS, cursive" },
];

const FONT_SIZES = [
  { label: "8pt", value: "8pt" },
  { label: "10pt", value: "10pt" },
  { label: "12pt", value: "12pt" },
  { label: "14pt", value: "14pt" },
  { label: "16pt", value: "16pt" },
  { label: "18pt", value: "18pt" },
  { label: "20pt", value: "20pt" },
  { label: "24pt", value: "24pt" },
  { label: "28pt", value: "28pt" },
  { label: "32pt", value: "32pt" },
  { label: "36pt", value: "36pt" },
  { label: "48pt", value: "48pt" },
  { label: "72pt", value: "72pt" },
];

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [isDiagramDialogOpen, setIsDiagramDialogOpen] = useState(false);
  const [diagramContent, setDiagramContent] = useState("");
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  if (!editor) {
    return null;
  }

  const colors = [
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#b7b7b7",
    "#cccccc",
    "#d9d9d9",
    "#efefef",
    "#f3f3f3",
    "#ffffff",
    "#980000",
    "#ff0000",
    "#ff9900",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#4a86e8",
    "#0000ff",
    "#9900ff",
    "#ff00ff",
  ];

  const addMermaidDiagram = () => {
    if (diagramContent.trim()) {
      editor.chain().focus().setMermaid({ 
        content: diagramContent,
        id: `mermaid-${Date.now()}` 
      }).run();
      setDiagramContent("");
      setIsDiagramDialogOpen(false);
    }
  };

  const setFontFamily = (fontFamily: string) => {
    editor
      .chain()
      .focus()
      .setFontFamily(fontFamily)
      .run();
  };

  const setFontSize = (size: string) => {
    if (!editor) return;
    
    // First focus the editor
    editor.commands.focus();
    
    // Then set the font size
    editor
      .chain()
      .setFontSize(size)
      .run();
  };

  // Get the current font size from the editor
  const getCurrentFontSize = () => {
    if (!editor) return '16pt';
    const { fontSize } = editor.getAttributes('textStyle');
    return fontSize || '16pt';
  };

  return (
    <div className="border-b p-1.5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-wrap items-center gap-1">
        {/* Font Family */}
        <Select
          onValueChange={setFontFamily}
          defaultValue={FONT_FAMILIES[0].value}
        >
          <SelectTrigger className="h-7 w-[140px] text-xs">
            <SelectValue placeholder="Font" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border">
            {FONT_FAMILIES.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Font Size */}
        <Select
          onValueChange={setFontSize}
          value={getCurrentFontSize()}
        >
          <SelectTrigger className="h-7 w-[80px] text-xs">
            <SelectValue>
              {FONT_SIZES.find(size => size.value === getCurrentFontSize())?.label || '16pt'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-background border border-border">
            {FONT_SIZES.map((size) => (
              <SelectItem 
                key={size.value} 
                value={size.value}
                className="cursor-pointer hover:bg-accent"
              >
                <span>{size.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="h-5 w-px bg-border" />

        {/* Text Formatting */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-7 w-7 p-0 ${editor.isActive("bold") ? "bg-accent" : ""}`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-7 w-7 p-0 ${editor.isActive("italic") ? "bg-accent" : ""}`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`h-7 w-7 p-0 ${editor.isActive("underline") ? "bg-accent" : ""}`}
          title="Underline (Ctrl+U)"
        >
          <Underline className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`h-7 w-7 p-0 ${editor.isActive("strike") ? "bg-accent" : ""}`}
          title="Strikethrough (Ctrl+Shift+X)"
        >
          <Strikethrough className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`h-7 w-7 p-0 ${editor.isActive("code") ? "bg-accent" : ""}`}
          title="Code (Ctrl+E)"
        >
          <Code className="h-3.5 w-3.5" />
        </Button>

        <div className="h-5 w-px bg-border" />

        {/* Text Color */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Text Color">
              <Palette className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="grid grid-cols-5 gap-1 p-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className="h-5 w-5 rounded border"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    editor.chain().focus().setColor(color).run();
                  }}
                />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Highlight Color */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Highlight Color">
              <Highlighter className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="grid grid-cols-5 gap-1 p-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className="h-5 w-5 rounded border"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    editor.chain().focus().setHighlight({ color }).run();
                  }}
                />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-5 w-px bg-border" />

        {/* Headings */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`h-7 w-7 p-0 ${editor.isActive("heading", { level: 1 }) ? "bg-accent" : ""}`}
          title="Heading 1 (Ctrl+1)"
        >
          <Heading1 className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`h-7 w-7 p-0 ${editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""}`}
          title="Heading 2 (Ctrl+2)"
        >
          <Heading2 className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`h-7 w-7 p-0 ${editor.isActive("heading", { level: 3 }) ? "bg-accent" : ""}`}
          title="Heading 3 (Ctrl+3)"
        >
          <Heading3 className="h-3.5 w-3.5" />
        </Button>

        <div className="h-5 w-px bg-border" />

        {/* Lists */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-7 w-7 p-0 ${editor.isActive("bulletList") ? "bg-accent" : ""}`}
          title="Bullet List (Ctrl+Shift+8)"
        >
          <List className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`h-7 w-7 p-0 ${editor.isActive("orderedList") ? "bg-accent" : ""}`}
          title="Ordered List (Ctrl+Shift+7)"
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </Button>

        {/* Indent/Outdent */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
          className="h-7 w-7 p-0"
          title="Indent (Ctrl+Alt+Right Arrow)"
        >
          <Indent className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().liftListItem('listItem').run()}
          className="h-7 w-7 p-0"
          title="Outdent (Ctrl+Alt+Left Arrow)"
        >
          <Outdent className="h-3.5 w-3.5" />
        </Button>

        <div className="h-5 w-px bg-border" />

        {/* Alignment */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`h-7 w-7 p-0 ${editor.isActive({ textAlign: 'left' }) ? "bg-accent" : ""}`}
          title="Align Left (Ctrl+L)"
        >
          <AlignLeft className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`h-7 w-7 p-0 ${editor.isActive({ textAlign: 'center' }) ? "bg-accent" : ""}`}
          title="Align Center (Ctrl+E)"
        >
          <AlignCenter className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`h-7 w-7 p-0 ${editor.isActive({ textAlign: 'right' }) ? "bg-accent" : ""}`}
          title="Align Right (Ctrl+R)"
        >
          <AlignRight className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`h-7 w-7 p-0 ${editor.isActive({ textAlign: 'justify' }) ? "bg-accent" : ""}`}
          title="Justify (Ctrl+J)"
        >
          <AlignJustify className="h-3.5 w-3.5" />
        </Button>

        <div className="h-5 w-px bg-border" />

        {/* Other Tools */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`h-7 w-7 p-0 ${editor.isActive("blockquote") ? "bg-accent" : ""}`}
          title="Blockquote (Ctrl+Shift+Q)"
        >
          <Quote className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="h-7 w-7 p-0"
          title="Horizontal Rule (Ctrl+Shift+R)"
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`h-7 w-7 p-0 ${editor.isActive("codeBlock") ? "bg-accent" : ""}`}
          title="Code Block (Ctrl+Shift+C)"
        >
          <Code2 className="h-3.5 w-3.5" />
        </Button>

        {/* Table */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTablePicker(true)}
          className="h-7 w-7 p-0"
          title="Table (Ctrl+T)"
        >
          <Table className="h-3.5 w-3.5" />
        </Button>

        {/* Image */}
        <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              title="Insert Image"
            >
              <Image className="h-3.5 w-3.5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Image</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="url">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">Image URL</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowImageModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    if (editor && imageUrl) {
                      editor.chain().focus().setImage({ src: imageUrl }).run();
                      setImageUrl("");
                      setShowImageModal(false);
                    }
                  }}>
                    Insert Image
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="upload" className="space-y-4">
                <div className="space-y-2">
                  <Label>Upload Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const result = e.target?.result;
                          if (typeof result === 'string' && editor) {
                            editor.chain().focus().setImage({ src: result }).run();
                            setShowImageModal(false);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Mermaid Diagram */}
        <Dialog open={isDiagramDialogOpen} onOpenChange={setIsDiagramDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              title="Insert Mermaid Diagram"
            >
              <GitBranch className="h-3.5 w-3.5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Mermaid Diagram</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <textarea
                  className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={diagramContent}
                  onChange={(e) => setDiagramContent(e.target.value)}
                  placeholder="Enter Mermaid diagram code..."
                />
                {diagramContent && (
                  <div 
                    className="mt-4 rounded-md border border-border p-4"
                    data-mermaid={diagramContent}
                    data-id={`preview-${Date.now()}`}
                  />
                )}
              </div>
              <Button onClick={addMermaidDiagram}>Insert Diagram</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Table Picker */}
        <TablePicker
          open={showTablePicker}
          onOpenChange={setShowTablePicker}
          onInsert={(rows, cols) => {
            editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
            setShowTablePicker(false);
          }}
        />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleMark('subscript').run()}
          className={`h-7 w-7 p-0 ${editor.isActive("subscript") ? "bg-accent" : ""}`}
          title="Subscript (Ctrl+Shift+=)"
        >
          <Subscript className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleMark('superscript').run()}
          className={`h-7 w-7 p-0 ${editor.isActive("superscript") ? "bg-accent" : ""}`}
          title="Superscript (Ctrl+=)"
        >
          <Superscript className="h-3.5 w-3.5" />
        </Button>

        <div className="h-5 w-px bg-border" />

        {/* History */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          className="h-7 w-7 p-0"
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          className="h-7 w-7 p-0"
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="h-7 w-7 p-0"
          title="Clear Formatting (Ctrl+Shift+N)"
        >
          <Eraser className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
} 