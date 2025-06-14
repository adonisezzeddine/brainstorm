import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import DrawIODiagram from '../../components/DrawIODiagram';

export interface DrawIOOptions {
  HTMLAttributes: Record<string, any>;
}

interface DrawIOAttributes {
  xml: string;
  id: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    drawio: {
      setDrawIO: (xml: string) => ReturnType;
    };
  }
}

export const DrawIO = Node.create<DrawIOOptions>({
  name: 'drawio',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      xml: {
        default: '',
      },
      id: {
        default: () => `drawio-${Math.random().toString(36).substr(2, 9)}`,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="drawio"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'drawio' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DrawIODiagram);
  },

  addCommands() {
    return {
      setDrawIO:
        (xml: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { 
              xml,
              id: `drawio-${Math.random().toString(36).substr(2, 9)}`,
            },
          });
        },
    };
  },
}); 