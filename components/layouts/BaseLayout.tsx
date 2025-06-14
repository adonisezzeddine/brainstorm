"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BaseLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
  headerClassName?: string;
  footerClassName?: string;
  mainClassName?: string;
}

export default function BaseLayout({
  children,
  showHeader = true,
  showFooter = true,
  className = "",
  headerClassName = "",
  footerClassName = "",
  mainClassName = "",
}: BaseLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {showHeader && (
        <div className={headerClassName}>
          <Header />
        </div>
      )}
      <main className={`flex-1 ${showHeader ? 'pt-16' : ''} ${mainClassName}`}>
        {children}
      </main>
      {showFooter && (
        <div className={footerClassName}>
          <Footer />
        </div>
      )}
    </div>
  );
} 