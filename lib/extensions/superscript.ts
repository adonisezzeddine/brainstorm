import { Mark, mergeAttributes } from '@tiptap/core';

export const Superscript = Mark.create({
  name: 'superscript',
  parseHTML() {
    return [{ tag: 'sup' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['sup', mergeAttributes(HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setSuperscript: () => ({ commands }) => commands.setMark(this.name),
      unsetSuperscript: () => ({ commands }) => commands.unsetMark(this.name),
      toggleSuperscript: () => ({ commands }) => commands.toggleMark(this.name),
    };
  },
}); 