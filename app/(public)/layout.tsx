"use client";

import PublicLayout from '@/components/layouts/PublicLayout';

export default function PublicLayoutSegment({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
} 