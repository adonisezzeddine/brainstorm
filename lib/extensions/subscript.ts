import { Mark, mergeAttributes } from '@tiptap/core';

export const Subscript = Mark.create({
  name: 'subscript',
  parseHTML() {
    return [{ tag: 'sub' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['sub', mergeAttributes(HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setSubscript: () => ({ commands }) => commands.setMark(this.name),
      unsetSubscript: () => ({ commands }) => commands.unsetMark(this.name),
      toggleSubscript: () => ({ commands }) => commands.toggleMark(this.name),
    };
  },
}); 