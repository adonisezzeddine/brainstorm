"use client";
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import BaseLayout from './BaseLayout';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BaseLayout showHeader={false} showFooter={false}>
      <div className="flex flex-1">
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
        <main className="flex-1 overflow-auto bg-[var(--background)]">
          {children}
        </main>
      </div>
    </BaseLayout>
  );
} 