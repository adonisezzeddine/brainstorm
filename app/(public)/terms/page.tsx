"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-lg text-[var(--muted-foreground)] mb-8">
              Please read these terms carefully before using BrainAIStorm.
            </p>
          </motion.div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="mb-6 text-[var(--muted-foreground)]">
              By using BrainAIStorm, you agree to these terms and our privacy policy.
            </p>
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <ul className="list-disc pl-6 mb-6 text-[var(--muted-foreground)]">
              <li>Provide accurate information</li>
              <li>Respect intellectual property</li>
              <li>Do not misuse the platform</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-6 text-[var(--muted-foreground)]">
              BrainAIStorm is provided "as is" without warranties. We are not liable for damages arising from use of the platform.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="mb-6 text-[var(--muted-foreground)]">
              We may update these terms from time to time. Continued use of the platform means you accept the new terms.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-[var(--muted-foreground)]">
              For questions about these terms, email <a href="mailto:legal@brainaistorm.com" className="text-[var(--primary)] underline">legal@brainaistorm.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 