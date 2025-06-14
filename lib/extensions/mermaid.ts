import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export interface MermaidOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mermaid: {
      setMermaid: (attributes: { content: string; id: string }) => ReturnType;
    };
  }
}

export const Mermaid = Extension.create<MermaidOptions>({
  name: 'mermaid',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addCommands() {
    return {
      setMermaid:
        attributes =>
        ({ commands }) => {
          return commands.insertContent({
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [
                  {
                    type: 'mermaid',
                    attrs: attributes,
                  },
                ],
                text: attributes.content,
              },
            ],
          });
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('mermaid'),
        props: {
          decorations: state => {
            const { doc } = state;
            const decorations: Decoration[] = [];

            doc.descendants((node, pos) => {
              if (node.isText) {
                node.marks.forEach(mark => {
                  if (mark.type.name === 'mermaid') {
                    const { content, id } = mark.attrs;
                    const widget = document.createElement('div');
                    widget.className = 'mermaid-diagram-container';
                    widget.setAttribute('data-mermaid', content);
                    widget.setAttribute('data-id', id);

                    decorations.push(
                      Decoration.widget(pos, widget, {
                        key: id,
                      })
                    );
                  }
                });
              }
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
}); 