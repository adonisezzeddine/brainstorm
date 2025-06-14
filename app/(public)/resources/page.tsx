"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Book, FileText, Video, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ResourcesPage() {
  const resources = [
    {
      category: "Guides",
      icon: Book,
      items: [
        {
          title: "Getting Started with BrainAIStorm",
          description: "Learn the basics of AI-powered brainstorming and how to make the most of your ideas.",
          link: "/guides/getting-started",
          external: false
        },
        {
          title: "Advanced AI Features Guide",
          description: "Master the advanced features of our AI assistant for better idea generation.",
          link: "/guides/advanced-ai",
          external: false
        },
        {
          title: "Team Collaboration Best Practices",
          description: "Learn how to effectively collaborate with your team using BrainAIStorm.",
          link: "/guides/team-collaboration",
          external: false
        }
      ]
    },
    {
      category: "Documentation",
      icon: FileText,
      items: [
        {
          title: "API Documentation",
          description: "Comprehensive guide to our API endpoints and integration options.",
          link: "https://docs.brainaistorm.com/api",
          external: true
        },
        {
          title: "Security & Privacy",
          description: "Detailed information about our security measures and data handling.",
          link: "/docs/security",
          external: false
        },
        {
          title: "Feature Reference",
          description: "Complete reference of all features and their configurations.",
          link: "/docs/features",
          external: false
        }
      ]
    },
    {
      category: "Tutorials",
      icon: Video,
      items: [
        {
          title: "Quick Start Video Series",
          description: "Video tutorials to help you get up and running quickly.",
          link: "/tutorials/quick-start",
          external: false
        },
        {
          title: "AI Integration Tutorial",
          description: "Learn how to integrate our AI features into your workflow.",
          link: "/tutorials/ai-integration",
          external: false
        },
        {
          title: "Advanced Workflows",
          description: "Discover advanced workflows and automation techniques.",
          link: "/tutorials/advanced-workflows",
          external: false
        }
      ]
    },
    {
      category: "Community",
      icon: MessageSquare,
      items: [
        {
          title: "Community Forum",
          description: "Join discussions with other BrainAIStorm users.",
          link: "https://community.brainaistorm.com",
          external: true
        },
        {
          title: "Success Stories",
          description: "Read about how others are using BrainAIStorm.",
          link: "/community/success-stories",
          external: false
        },
        {
          title: "Feature Requests",
          description: "Suggest and vote on new features.",
          link: "/community/feature-requests",
          external: false
        }
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
              Resources & Learning
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
              Everything you need to master BrainAIStorm and unlock your creative potential.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((section, index) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] group hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
            >
              <section.icon className="h-8 w-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-2xl font-bold mb-6 group-hover:text-[var(--primary)] transition-colors duration-300">{section.category}</h2>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.link}
                    className="block p-4 rounded-lg hover:bg-[var(--accent)] transition-all duration-300 group/item"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 group-hover/item:text-[var(--primary)] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-[var(--muted-foreground)] text-sm group-hover/item:text-[var(--foreground)] transition-colors duration-300">
                          {item.description}
                        </p>
                      </div>
                      {item.external ? (
                        <ExternalLink className="h-5 w-5 text-[var(--muted-foreground)] group-hover/item:text-[var(--primary)] transition-colors duration-300" />
                      ) : (
                        <ArrowRight className="h-5 w-5 text-[var(--muted-foreground)] group-hover/item:text-[var(--primary)] transition-colors duration-300" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest updates, tips, and resources.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-300"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary)]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-[var(--primary)]/30"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 