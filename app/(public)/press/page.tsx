"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '@/lib/icons';
import Link from 'next/link';

export default function PressPage() {
  const pressReleases = [
    {
      title: "BrainAIStorm Raises $10M Series A Funding",
      date: "2024-03-15",
      description: "Leading AI-powered brainstorming platform secures funding to accelerate growth and innovation.",
      link: "/press/brainaistorm-series-a"
    },
    {
      title: "BrainAIStorm Launches Enterprise Solution",
      date: "2024-02-20",
      description: "New enterprise features enable large organizations to scale their brainstorming efforts.",
      link: "/press/enterprise-launch"
    },
    {
      title: "BrainAIStorm Partners with Major Tech Companies",
      date: "2024-01-10",
      description: "Strategic partnerships to enhance AI capabilities and expand market reach.",
      link: "/press/tech-partnerships"
    }
  ];

  const mediaCoverage = [
    {
      title: "TechCrunch",
      article: "How AI is Revolutionizing Team Collaboration",
      date: "2024-03-10",
      link: "https://techcrunch.com"
    },
    {
      title: "Forbes",
      article: "The Future of AI-Powered Productivity Tools",
      date: "2024-02-25",
      link: "https://forbes.com"
    },
    {
      title: "Wired",
      article: "BrainAIStorm: The Next Generation of Brainstorming",
      date: "2024-01-15",
      link: "https://wired.com"
    }
  ];

  const resources = [
    {
      title: "Company Overview",
      description: "Learn about our mission, vision, and values",
      icon: Icons.Download,
      link: "/press/company-overview.pdf"
    },
    {
      title: "Brand Assets",
      description: "Download our logo and brand guidelines",
      icon: Icons.Download,
      link: "/press/brand-assets.zip"
    },
    {
      title: "Fact Sheet",
      description: "Key information about BrainAIStorm",
      icon: Icons.Download,
      link: "/press/fact-sheet.pdf"
    }
  ];

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
              Press Room
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
              Latest news, press releases, and media coverage about BrainAIStorm
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Latest Press Releases</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Stay updated with our latest announcements and company news
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] group hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                <div className="flex items-center text-sm text-[var(--muted-foreground)] mb-4">
                  <Icons.Calendar className="w-4 h-4 mr-2" />
                  {release.date}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                  {release.title}
                </h3>
                <p className="text-[var(--muted-foreground)] mb-4 group-hover:text-[var(--foreground)] transition-colors duration-300">
                  {release.description}
                </p>
                <Link
                  href={release.link}
                  className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors"
                >
                  Read More
                  <Icons.ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-20 bg-[var(--accent)]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Media Coverage</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Recent articles and features about BrainAIStorm
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaCoverage.map((coverage, index) => (
              <motion.div
                key={coverage.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] group hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                <div className="flex items-center text-sm text-[var(--muted-foreground)] mb-4">
                  <Icons.Newspaper className="w-4 h-4 mr-2" />
                  {coverage.title}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                  {coverage.article}
                </h3>
                <div className="flex items-center text-sm text-[var(--muted-foreground)] mb-4">
                  <Icons.Calendar className="w-4 h-4 mr-2" />
                  {coverage.date}
                </div>
                <a
                  href={coverage.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors"
                >
                  Read Article
                  <Icons.ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Press Resources</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Download our press kit and brand assets
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] group hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                <resource.icon className="h-8 w-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                  {resource.title}
                </h3>
                <p className="text-[var(--muted-foreground)] mb-4 group-hover:text-[var(--foreground)] transition-colors duration-300">
                  {resource.description}
                </p>
                <a
                  href={resource.link}
                  className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors"
                >
                  Download
                  <Icons.Download className="ml-2 h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[var(--accent)]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Press Inquiries</h2>
            <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
              For press inquiries, please contact our media relations team
            </p>
            <Link
              href="mailto:press@brainaistorm.com"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary)]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-[var(--primary)]/30"
            >
              Contact Press Team
              <Icons.Mail className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 