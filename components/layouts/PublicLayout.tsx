"use client";
import React from 'react';
import BaseLayout from './BaseLayout';

interface PublicLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PublicLayout({
  children,
  className = "",
}: PublicLayoutProps) {
  return (
    <BaseLayout
      showHeader={true}
      showFooter={true}
      className={className}
      mainClassName="min-h-[calc(100vh-4rem)]"
    >
      {children}
    </BaseLayout>
  );
} 