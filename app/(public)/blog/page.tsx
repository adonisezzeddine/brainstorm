"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  const categories = [
    "All",
    "AI & Technology",
    "Productivity",
    "Brainstorming",
    "Case Studies",
    "Updates"
  ];

  const posts = [
    {
      title: "How AI is Revolutionizing Brainstorming",
      excerpt: "Discover how artificial intelligence is transforming the way we generate and organize ideas.",
      category: "AI & Technology",
      date: "2024-03-15",
      readTime: "5 min read",
      image: "/blog/ai-brainstorming.jpg"
    },
    {
      title: "10 Tips for More Effective Brainstorming Sessions",
      excerpt: "Learn proven techniques to make your brainstorming sessions more productive and engaging.",
      category: "Productivity",
      date: "2024-03-10",
      readTime: "7 min read",
      image: "/blog/effective-brainstorming.jpg"
    },
    {
      title: "The Future of Collaborative Thinking",
      excerpt: "Explore how technology is enabling new forms of collaboration and idea generation.",
      category: "Case Studies",
      date: "2024-03-05",
      readTime: "6 min read",
      image: "/blog/collaborative-thinking.jpg"
    },
    {
      title: "New Features: Enhanced AI Suggestions",
      excerpt: "Introducing our latest AI-powered features designed to boost your creativity.",
      category: "Updates",
      date: "2024-03-01",
      readTime: "4 min read",
      image: "/blog/new-features.jpg"
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
              BrainAIStorm Blog
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto mb-8">
              Insights, tips, and updates about AI-powered brainstorming and productivity
            </p>
            <div className="relative max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-[var(--card)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="rounded-xl overflow-hidden bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-[var(--primary)]/20 to-purple-500/20" />
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-[var(--primary)] font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-sm text-[var(--muted-foreground)]">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center text-sm text-[var(--muted-foreground)]">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-[var(--muted-foreground)] mb-4 group-hover:text-[var(--foreground)] transition-colors duration-300">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[var(--accent)]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest insights and updates about AI-powered brainstorming.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--card)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                <button className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary)]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-[var(--primary)]/30">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 