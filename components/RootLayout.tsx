"use client";
import React from 'react';
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'sonner';
import Header from './Header';
import Footer from './Footer';

export default function RootLayout({
  children,
  showFooter = true,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        {showFooter && <Footer />}
      </div>
      <Toaster />
    </SessionProvider>
  );
} 