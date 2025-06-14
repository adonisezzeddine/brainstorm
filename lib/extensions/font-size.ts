import { Extension } from '@tiptap/core'
import { TextStyle } from '@tiptap/extension-text-style'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Editor } from '@tiptap/core'

export interface FontSizeOptions {
  types: string[]
  defaultSize: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSize = Extension.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
      defaultSize: '16pt',
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: this.options.defaultSize,
            parseHTML: element => {
              const size = element.style.fontSize?.replace(/['"]/g, '')
              return size || this.options.defaultSize
            },
            renderHTML: attributes => {
              const fontSize = attributes.fontSize || this.options.defaultSize
              return {
                style: `font-size: ${fontSize}`,
                'data-font-size': fontSize,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain, editor }: { chain: any; editor: Editor }) => {
        // Store the current selection
        const { from, to } = editor.state.selection
        
        // If there's no selection, set the default font size for new text
        if (from === to) {
          return chain()
            .setMark('textStyle', { fontSize })
            .run()
        }
        
        // If there's a selection, apply to the selected text
        return chain()
          .setMark('textStyle', { fontSize })
          .run()
      },
      
      unsetFontSize: () => ({ chain }: { chain: any }) => {
        return chain()
          .setMark('textStyle', { fontSize: this.options.defaultSize })
          .run()
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('fontSize'),
        props: {
          handleDOMEvents: {
            focus: (view: any, event: FocusEvent) => {
              // Ensure font size is applied when editor is focused
              const marks = view.state.selection.$head.marks()
              const textStyleMark = marks.find((mark: any) => mark.type.name === 'textStyle')
              const fontSize = textStyleMark?.attrs?.fontSize
              
              if (fontSize) {
                view.dispatch(view.state.tr.setMeta('fontSize', fontSize))
              }
              return false
            },
          },
        },
      }),
    ]
  },

  addKeyboardShortcuts() {
    return {
      'Mod-z': () => this.editor.commands.undo(),
      'Mod-y': () => this.editor.commands.redo(),
    }
  },

  addInputRules() {
    return []
  },
}) 