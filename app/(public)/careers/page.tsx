"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Rocket, Heart, ArrowRight, MapPin, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
  const benefits = [
    {
      icon: Rocket,
      title: "Growth Opportunities",
      description: "Continuous learning and career development programs"
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work with talented individuals in a supportive environment"
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible hours and remote work options"
    },
    {
      icon: Briefcase,
      title: "Competitive Benefits",
      description: "Health insurance, 401(k), and generous PTO"
    }
  ];

  const positions = [
    {
      title: "Senior AI Engineer",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $180k",
      description: "Join our AI team to build and improve our intelligent brainstorming algorithms."
    },
    {
      title: "Product Designer",
      location: "San Francisco",
      type: "Full-time",
      salary: "$90k - $140k",
      description: "Create beautiful and intuitive user experiences for our platform."
    },
    {
      title: "Full Stack Developer",
      location: "Remote",
      type: "Full-time",
      salary: "$100k - $160k",
      description: "Build and maintain our web application using modern technologies."
    },
    {
      title: "Marketing Manager",
      location: "New York",
      type: "Full-time",
      salary: "$80k - $120k",
      description: "Lead our marketing efforts and grow our user base."
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
              Join Our Team
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
              Help us revolutionize how people brainstorm and collaborate. We're looking for passionate individuals to join our mission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Join Us?</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              We offer a range of benefits to support your growth and well-being
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] group hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                <benefit.icon className="h-8 w-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-[var(--accent)]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Explore our current job openings and find your perfect role
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] group hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                  {position.title}
                </h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm text-[var(--muted-foreground)]">
                    <MapPin className="w-4 h-4 mr-1" />
                    {position.location}
                  </div>
                  <div className="flex items-center text-sm text-[var(--muted-foreground)]">
                    <Clock className="w-4 h-4 mr-1" />
                    {position.type}
                  </div>
                  <div className="flex items-center text-sm text-[var(--muted-foreground)]">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {position.salary}
                  </div>
                </div>
                <p className="text-[var(--muted-foreground)] mb-4 group-hover:text-[var(--foreground)] transition-colors duration-300">
                  {position.description}
                </p>
                <Link
                  href={`/careers/${position.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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
            <h2 className="text-3xl font-bold mb-6">Don't See Your Role?</h2>
            <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary)]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-[var(--primary)]/30"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 