"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function CookiesPage() {
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
              Cookies Policy
            </h1>
            <p className="text-lg text-[var(--muted-foreground)] mb-8">
              This page explains how BrainAIStorm uses cookies and similar technologies.
            </p>
          </motion.div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
            <p className="mb-6 text-[var(--muted-foreground)]">
              Cookies are small text files stored on your device to help us improve your experience.
            </p>
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <ul className="list-disc pl-6 mb-6 text-[var(--muted-foreground)]">
              <li>To remember your preferences and settings</li>
              <li>To analyze site usage and performance</li>
              <li>To provide personalized content and ads</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="mb-6 text-[var(--muted-foreground)]">
              You can control cookies through your browser settings. Disabling cookies may affect your experience.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-[var(--muted-foreground)]">
              For questions about our cookies policy, email <a href="mailto:privacy@brainaistorm.com" className="text-[var(--primary)] underline">privacy@brainaistorm.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 