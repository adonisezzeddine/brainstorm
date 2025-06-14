"use client";
import { NodeViewProps } from '@tiptap/core';
import dynamic from 'next/dynamic';

const MermaidDiagram = dynamic(() => import('./MermaidDiagram'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-4 border rounded-lg bg-muted/50">
      <div className="animate-spin">Loading...</div>
    </div>
  ),
});

export function MermaidNodeView(props: NodeViewProps) {
  const { node } = props;
  const { diagram, id } = node.attrs;

  return <MermaidDiagram diagram={diagram} id={id} />;
} 