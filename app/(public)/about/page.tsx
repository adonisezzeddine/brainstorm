"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '@/lib/icons';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-purple-500">
              Our Story
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
              Empowering teams to capture, organize, and transform their ideas through AI-powered collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              To revolutionize the way teams capture and organize their ideas, making brainstorming more efficient and effective through AI.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Innovation",
                description: "Pushing the boundaries of what's possible with AI",
                icon: Icons.Brain
              },
              {
                title: "Community",
                description: "Building a global network of creative thinkers",
                icon: Icons.Users
              },
              {
                title: "Growth",
                description: "Helping teams and individuals reach their potential",
                icon: Icons.Target
              },
              {
                title: "Passion",
                description: "Dedicated to making brainstorming better",
                icon: Icons.Lightbulb
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] group hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                <value.icon className="h-8 w-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[var(--accent)]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "1M+", label: "Ideas Generated" },
              { value: "50+", label: "Countries" },
              { value: "98%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">
                  {stat.value}
                </div>
                <div className="text-[var(--muted-foreground)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
              Be part of the future of brainstorming and collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary)]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-[var(--primary)]/30"
              >
                Get Started
                <Icons.ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300"
              >
                Contact Us
                <Icons.Mail className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 