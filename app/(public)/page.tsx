"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Brain, Zap } from 'lucide-react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className="bg-[var(--background)]">
      <div className="relative">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--accent)] opacity-50"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-purple-500">
              Transform Your Ideas with AI
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
              BrainAIStorm helps you capture, organize, and develop your thoughts with the power of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary)]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-[var(--primary)]/30"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--accent)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Feature highlights */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'var(--accent)',
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="h-8 w-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">AI-Powered Insights</h3>
              <p className="text-[var(--muted-foreground)] mb-6 group-hover:text-[var(--foreground)] transition-colors duration-300">Get intelligent suggestions and connections between your ideas.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                  <ArrowRight className="h-4 w-4 mr-2 text-[var(--primary)]" />
                  Get intelligent suggestions and connections between your ideas.
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'var(--accent)',
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Brain className="h-8 w-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">Smart Organization</h3>
              <p className="text-[var(--muted-foreground)] mb-6 group-hover:text-[var(--foreground)] transition-colors duration-300">Automatically categorize and link related thoughts.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                  <ArrowRight className="h-4 w-4 mr-2 text-[var(--primary)]" />
                  Automatically categorize and link related thoughts.
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'var(--accent)',
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Zap className="h-8 w-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">Lightning Fast</h3>
              <p className="text-[var(--muted-foreground)] mb-6 group-hover:text-[var(--foreground)] transition-colors duration-300">Capture and process your ideas in real-time.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                  <ArrowRight className="h-4 w-4 mr-2 text-[var(--primary)]" />
                  Capture and process your ideas in real-time.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 