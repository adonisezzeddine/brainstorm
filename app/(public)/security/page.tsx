"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/10 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-purple-500">
              Security
            </h1>
            <p className="text-lg text-[var(--muted-foreground)] mb-8">
              We take your security seriously. Learn how BrainAIStorm protects your data and privacy.
            </p>
          </motion.div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-[var(--primary)]" /> Data Protection</h2>
            <ul className="list-disc pl-6 mb-6 text-[var(--muted-foreground)]">
              <li>End-to-end encryption for your notes and ideas</li>
              <li>Regular security audits and vulnerability testing</li>
              <li>Strict access controls and authentication</li>
              <li>Compliance with industry standards</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4">Report a Security Issue</h2>
            <p className="text-[var(--muted-foreground)]">
              If you discover a security vulnerability, please email <a href="mailto:security@brainaistorm.com" className="text-[var(--primary)] underline">security@brainaistorm.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 