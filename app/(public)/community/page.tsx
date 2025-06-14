"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Trophy, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  const events = [
    {
      title: "AI Brainstorming Workshop",
      date: "March 15, 2024",
      time: "2:00 PM EST",
      description: "Learn advanced techniques for AI-powered brainstorming.",
      link: "/events/ai-workshop",
      type: "Workshop"
    },
    {
      title: "Community Meetup",
      date: "March 22, 2024",
      time: "6:00 PM EST",
      description: "Connect with other BrainAIStorm users and share experiences.",
      link: "/events/community-meetup",
      type: "Meetup"
    },
    {
      title: "Product Roadmap Q&A",
      date: "March 29, 2024",
      time: "1:00 PM EST",
      description: "Join our product team for a Q&A session about upcoming features.",
      link: "/events/roadmap-qa",
      type: "Webinar"
    }
  ];

  const successStories = [
    {
      title: "How Company X Increased Productivity by 200%",
      author: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      image: "/success-stories/company-x.jpg",
      link: "/success-stories/company-x"
    },
    {
      title: "From Idea to Launch in 2 Weeks",
      author: "Michael Chen",
      role: "Startup Founder",
      company: "InnovateAI",
      image: "/success-stories/innovate-ai.jpg",
      link: "/success-stories/innovate-ai"
    },
    {
      title: "Transforming Team Collaboration",
      author: "Emma Rodriguez",
      role: "Team Lead",
      company: "DesignHub",
      image: "/success-stories/design-hub.jpg",
      link: "/success-stories/design-hub"
    }
  ];

  const communityResources = [
    {
      title: "Community Forum",
      description: "Join discussions with other users, share tips, and get help.",
      icon: MessageSquare,
      link: "https://community.brainaistorm.com",
      external: true
    },
    {
      title: "Discord Server",
      description: "Real-time chat and collaboration with the community.",
      icon: Users,
      link: "https://discord.gg/brainaistorm",
      external: true
    },
    {
      title: "Feature Requests",
      description: "Suggest and vote on new features for BrainAIStorm.",
      icon: Trophy,
      link: "/community/feature-requests",
      external: false
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
              Join Our Community
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
              Connect with fellow innovators, share experiences, and grow together.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Community Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {communityResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] group hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
            >
              <resource.icon className="h-8 w-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">{resource.title}</h3>
              <p className="text-[var(--muted-foreground)] mb-4 group-hover:text-[var(--foreground)] transition-colors duration-300">{resource.description}</p>
              <Link
                href={resource.link}
                className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors duration-300"
              >
                Learn More
                {resource.external ? (
                  <ExternalLink className="ml-2 h-4 w-4" />
                ) : (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] group hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-[var(--accent)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300">
                    {event.type}
                  </span>
                  <Calendar className="h-5 w-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">{event.title}</h3>
                <p className="text-[var(--muted-foreground)] mb-4 group-hover:text-[var(--foreground)] transition-colors duration-300">{event.description}</p>
                <div className="flex items-center text-sm text-[var(--muted-foreground)] mb-4 group-hover:text-[var(--foreground)] transition-colors duration-300">
                  <span>{event.date}</span>
                  <span className="mx-2">•</span>
                  <span>{event.time}</span>
                </div>
                <Link
                  href={event.link}
                  className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors duration-300"
                >
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={story.link} className="block">
                  <div className="relative overflow-hidden rounded-xl mb-4 group-hover:shadow-lg group-hover:shadow-[var(--primary)]/20 transition-all duration-300">
                    <div className="aspect-w-16 aspect-h-9 bg-[var(--accent)] group-hover:bg-[var(--primary)]/10 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                    {story.title}
                  </h3>
                  <div className="flex items-center text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                    <span>{story.author}</span>
                    <span className="mx-2">•</span>
                    <span>{story.role}</span>
                    <span className="mx-2">•</span>
                    <span>{story.company}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 