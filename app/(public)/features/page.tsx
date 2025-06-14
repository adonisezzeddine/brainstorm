"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Zap, MessageSquare, Users, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Get intelligent suggestions and connections between your ideas. Our AI analyzes your thoughts and helps you discover new perspectives.",
      benefits: [
        "Smart idea connections",
        "Context-aware suggestions",
        "Pattern recognition",
        "Creative inspiration"
      ]
    },
    {
      icon: Brain,
      title: "Smart Organization",
      description: "Automatically categorize and link related thoughts. Keep your ideas organized and easily accessible.",
      benefits: [
        "Automatic categorization",
        "Intelligent tagging",
        "Smart search",
        "Visual mind mapping"
      ]
    },
    {
      icon: MessageSquare,
      title: "AI Chat Integration",
      description: "Chat directly with our AI to develop your ideas. Get instant feedback and suggestions.",
      benefits: [
        "Real-time AI assistance",
        "Contextual responses",
        "Idea refinement",
        "Creative problem-solving"
      ]
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time. Share ideas, give feedback, and build together.",
      benefits: [
        "Live collaboration",
        "Team workspaces",
        "Comment threads",
        "Version history"
      ]
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Capture and process your ideas in real-time. No lag, no waiting, just pure productivity.",
      benefits: [
        "Instant saving",
        "Quick search",
        "Fast AI responses",
        "Smooth performance"
      ]
    },
    {
      icon: Lock,
      title: "Privacy & Security",
      description: "Your ideas are protected with enterprise-grade security. Control who sees what.",
      benefits: [
        "End-to-end encryption",
        "Granular permissions",
        "Secure sharing",
        "Data privacy"
      ]
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--background)]">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-purple-500">
              Powerful Features for Creative Minds
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
              Discover how BrainAIStorm transforms your brainstorming process with cutting-edge AI technology
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
            >
              <feature.icon className="h-8 w-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">{feature.title}</h3>
              <p className="text-[var(--muted-foreground)] mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center text-sm text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                    <ArrowRight className="h-4 w-4 mr-2 text-[var(--primary)]" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Ideas?</h2>
          <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
            Join thousands of creative minds who are already using BrainAIStorm to bring their ideas to life.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary)]/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-[var(--primary)]/30"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 