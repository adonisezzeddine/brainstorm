"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-lg text-[var(--muted-foreground)] mb-8">
              Your privacy is important to us. This policy explains how BrainAIStorm collects, uses, and protects your information.
            </p>
          </motion.div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 mb-6 text-[var(--muted-foreground)]">
              <li>Email address and account details</li>
              <li>Usage data and analytics</li>
              <li>Content you create and upload</li>
              <li>Device and log information</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-6 text-[var(--muted-foreground)]">
              <li>To provide and improve our services</li>
              <li>To personalize your experience</li>
              <li>To communicate updates and offers</li>
              <li>To ensure security and prevent abuse</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <ul className="list-disc pl-6 mb-6 text-[var(--muted-foreground)]">
              <li>Access, update, or delete your data</li>
              <li>Opt out of marketing communications</li>
              <li>Request data portability</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-[var(--muted-foreground)]">
              If you have questions about our privacy practices, email us at <a href="mailto:privacy@brainaistorm.com" className="text-[var(--primary)] underline">privacy@brainaistorm.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 