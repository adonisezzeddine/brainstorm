"use client";
import { useState, useEffect, useRef, useMemo } from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { DrawIO } from '../lib/extensions/drawio';
import { Mermaid } from '../lib/extensions/mermaid';
import DrawIOEditor from './DrawIOEditor';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import ExportMenu from './ExportMenu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MermaidRenderer } from './MermaidRenderer';
import { EditorToolbar } from './EditorToolbar';
import { 
  Image as ImageIcon,
  Link as LinkIcon,
  MessageSquare,
  X,
  Type,
  Highlighter,
  ChevronDown,
  Palette,
  FileDown,
  Table as TableIcon,
} from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import DiagramEditor from './DiagramEditor';
import { createPortal } from 'react-dom';
import ImageUpload from './ImageUpload';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Editor } from "@tiptap/core";
import { TablePicker } from './TablePicker';
import { Superscript } from '../lib/extensions/superscript';
import { Subscript } from '../lib/extensions/subscript';
import TextStyle from "@tiptap/extension-text-style";
import { cn } from "@/lib/utils";
import { FontSize } from "@/lib/extensions/font-size";

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  onEditorReady?: (editor: Editor) => void;
}

// Memoize the lowlight instance at module scope (singleton)
const lowlightInstance = createLowlight(common);

export function TipTapEditor({ content, onChange, placeholder = 'Start writing...', className, onEditorReady }: TipTapEditorProps) {
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const fontMenuRef = useRef<HTMLDivElement>(null);
  const colorMenuRef = useRef<HTMLDivElement>(null);
  const [fontButtonRect, setFontButtonRect] = useState<DOMRect | null>(null);
  const [colorButtonRect, setColorButtonRect] = useState<DOMRect | null>(null);
  const fontButtonRef = useRef<HTMLButtonElement>(null);
  const colorButtonRef = useRef<HTMLButtonElement>(null);
  const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  const fonts = [
    { name: 'Default', value: 'Inter, sans-serif' },
    { name: 'Serif', value: 'Georgia, serif' },
    { name: 'Monospace', value: 'Consolas, monospace' },
    { name: 'Rounded', value: 'Varela Round, sans-serif' },
    { name: 'Handwritten', value: 'Caveat, cursive' },
  ];

  const highlightColors = [
    { name: 'Yellow', value: '#ffd43b' },
    { name: 'Lime', value: '#a9e34b' },
    { name: 'Green', value: '#69db7c' },
    { name: 'Teal', value: '#3bc9db' },
    { name: 'Blue', value: '#4dabf7' },
    { name: 'Indigo', value: '#748ffc' },
    { name: 'Purple', value: '#9775fa' },
    { name: 'Pink', value: '#f783ac' },
    { name: 'Red', value: '#ff6b6b' },
    { name: 'Orange', value: '#ffa94d' },
    { name: 'Gray', value: '#ced4da' },
    { name: 'Dark Gray', value: '#868e96' },
  ];

  // Add click away listener to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        showFontMenu &&
        fontMenuRef.current &&
        !fontMenuRef.current.contains(target)
      ) {
        setShowFontMenu(false);
      }
      if (
        showColorMenu &&
        colorMenuRef.current &&
        !colorMenuRef.current.contains(target)
      ) {
        setShowColorMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFontMenu, showColorMenu]);

  // Update button positions when menus are opened
  useEffect(() => {
    if (showFontMenu && fontButtonRef.current) {
      setFontButtonRect(fontButtonRef.current.getBoundingClientRect());
    }
  }, [showFontMenu]);

  useEffect(() => {
    if (showColorMenu && colorButtonRef.current) {
      setColorButtonRect(colorButtonRef.current.getBoundingClientRect());
    }
  }, [showColorMenu]);

  // Memoize the extensions array to ensure plugin singletons and prevent re-instantiation
  const extensions = useMemo(() => [
    StarterKit,
    Underline,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Highlight,
    Color,
    FontFamily,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: "text-primary underline underline-offset-4",
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: "max-w-full h-auto rounded-lg",
      },
    }),
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: "border-collapse w-full",
      },
    }),
    TableRow,
    TableCell.configure({
      HTMLAttributes: {
        class: "border border-border p-2",
      },
    }),
    TableHeader.configure({
      HTMLAttributes: {
        class: "border border-border p-2 bg-muted",
      },
    }),
    TaskList.configure({
      HTMLAttributes: {
        class: 'not-prose pl-2',
      },
    }),
    TaskItem.configure({
      nested: true,
      HTMLAttributes: {
        class: 'flex gap-2 items-start',
      },
    }),
    CodeBlockLowlight.configure({
      lowlight: lowlightInstance,
      HTMLAttributes: {
        class: "rounded-md bg-muted p-4 font-mono text-sm",
      },
    }),
    Placeholder.configure({ placeholder: placeholder || 'Start writing...' }),
    DrawIO,
    Mermaid,
    Superscript,
    Subscript,
    TextStyle,
    FontSize.configure({
      types: ["textStyle"],
    }),
  ], [placeholder]);

  // Memoize the editor instance for stability
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none',
      },
    },
  });

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            editor?.chain().focus().toggleBold().run();
            break;
          case 'i':
            e.preventDefault();
            editor?.chain().focus().toggleItalic().run();
            break;
          case 'u':
            e.preventDefault();
            editor?.chain().focus().toggleUnderline().run();
            break;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              editor?.chain().focus().redo().run();
            } else {
              editor?.chain().focus().undo().run();
            }
            break;
          case 'y':
            e.preventDefault();
            editor?.chain().focus().redo().run();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);

  // Call onEditorReady when editor is available
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  if (!editor) {
    return null;
  }

  const addImage = (file: File) => {
    if (!editor) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      editor.chain().focus().setImage({ src: url }).run();
      setShowImageModal(false);
      toast.success('Image added successfully');
    };
    reader.readAsDataURL(file);
  };

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setLinkText('');
      setShowLinkModal(false);
      toast.success('Link added successfully');
    }
  };

  const setFontFamily = (font: string) => {
    if (editor) {
      editor.chain().focus().setMark('textStyle', { fontFamily: font }).run();
    }
  };

  const setHighlight = (color: string) => {
    if (editor) {
      editor.chain().focus().setMark('textStyle', { backgroundColor: color }).run();
    }
  };

  const removeHighlight = () => {
    if (editor) {
      editor.chain().focus().unsetMark('textStyle').run();
    }
  };

  const toggleUnderline = () => {
    if (editor) {
      editor.chain().focus().toggleMark('textStyle', { textDecoration: 'underline' }).run();
    }
  };

  const insertTable = (rows: number, cols: number) => {
    editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    setShowTablePicker(false);
  };

  const handleDrawIOSave = (xml: string) => {
    editor.chain().focus().setDrawIO(xml).run();
  };

  const FontPicker = () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${
              editor.isActive('textStyle') ? 'bg-[var(--accent)] text-[var(--primary)]' : 'text-[var(--muted)] hover:bg-[var(--accent)]/50'
            }`}
            title="Font Family"
          >
            <Type className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent sideOffset={8} className="bg-white dark:bg-neutral-900 border border-[var(--border)]/50 rounded-lg shadow-lg py-1 min-w-[180px] z-50">
          {fonts.map(font => (
            <button
              key={font.value}
              onClick={() => setFontFamily(font.value)}
              className="flex items-center w-full px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--accent)]/50 hover:text-[var(--foreground)] transition-colors text-left"
              style={{ fontFamily: font.value }}
            >
              <span className="block truncate">{font.name}</span>
              <span className="ml-auto text-xs opacity-50">Aa</span>
            </button>
          ))}
        </PopoverContent>
      </Popover>
    );
  };

  const ColorPicker = () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${
              editor.isActive('textStyle') ? 'bg-[var(--accent)] text-[var(--primary)]' : 'text-[var(--muted)] hover:bg-[var(--accent)]/50'
            }`}
            title="Highlight"
          >
            <Highlighter className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent sideOffset={8} className="bg-white dark:bg-neutral-900 border border-[var(--border)]/50 rounded-lg shadow-lg p-2 min-w-[180px] z-50">
          <div className="grid grid-cols-4 gap-1">
            {highlightColors.map(color => (
              <button
                key={color.value}
                onClick={() => setHighlight(color.value)}
                className="w-8 h-8 rounded-lg border border-[var(--border)]/50 hover:scale-110 transition-transform"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
            <button
              onClick={removeHighlight}
              className="w-8 h-8 rounded-lg border border-[var(--border)]/50 hover:scale-110 transition-transform flex items-center justify-center"
              title="Remove highlight"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className={cn("min-h-[500px] w-full max-w-screen-lg border rounded-lg bg-background flex flex-col", className)}>
      <div className="p-4 flex-1">
        <EditorContent editor={editor} />
      </div>

      {/* Image Upload Dialog */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
          </DialogHeader>
          <ImageUpload onImageUpload={(url) => {
            if (editor) {
              editor.chain().focus().setImage({ src: url }).run();
            }
            setShowImageModal(false);
          }} />
        </DialogContent>
      </Dialog>

      {/* Link Dialog */}
      <Dialog open={showLinkModal} onOpenChange={setShowLinkModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowLinkModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                if (editor && linkUrl) {
                  editor.chain().focus().setLink({ href: linkUrl }).run();
                  setLinkUrl('');
                  setShowLinkModal(false);
                }
              }}>
                Add Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Table Picker */}
      <TablePicker
        open={showTablePicker}
        onOpenChange={setShowTablePicker}
        onInsert={insertTable}
      />
    </div>
  );
}

export default TipTapEditor; 