"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Brain, Zap, MessageSquare, Users, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started with AI-powered brainstorming",
      features: [
        "Basic AI suggestions",
        "Up to 5 projects",
        "1GB storage",
        "Basic organization",
        "Community support"
      ],
      cta: "Get Started",
      href: "/register",
      popular: false
    },
    {
      name: "Pro",
      price: "12",
      description: "For individuals who need more power and features",
      features: [
        "Advanced AI insights",
        "Unlimited projects",
        "10GB storage",
        "Smart organization",
        "Priority support",
        "AI chat integration",
        "Export capabilities"
      ],
      cta: "Start Free Trial",
      href: "/register?plan=pro",
      popular: true
    },
    {
      name: "Team",
      price: "29",
      description: "For teams that collaborate and innovate together",
      features: [
        "Everything in Pro",
        "Team workspaces",
        "50GB storage",
        "Real-time collaboration",
        "Advanced permissions",
        "Team analytics",
        "API access",
        "Dedicated support"
      ],
      cta: "Contact Sales",
      href: "/contact",
      popular: false
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Get intelligent suggestions and connections between your ideas"
    },
    {
      icon: Brain,
      title: "Smart Organization",
      description: "Automatically categorize and link related thoughts"
    },
    {
      icon: MessageSquare,
      title: "AI Chat Integration",
      description: "Chat directly with our AI to develop your ideas"
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Capture and process your ideas in real-time"
    },
    {
      icon: Lock,
      title: "Privacy & Security",
      description: "Your ideas are protected with enterprise-grade security"
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your creative journey. All plans include a 14-day free trial.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-xl bg-[var(--card)] border ${
                plan.popular 
                  ? 'border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20 hover:shadow-xl hover:shadow-[var(--primary)]/30' 
                  : 'border-[var(--border)] hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/20'
              } relative group transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[var(--primary)] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">{plan.name}</h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-[var(--muted-foreground)] ml-2">/month</span>
                </div>
                <p className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm group-hover:text-[var(--foreground)] transition-colors duration-300">
                    <Check className="h-5 w-5 text-[var(--primary)] mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block w-full text-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  plan.popular
                    ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-[var(--primary)]/30'
                    : 'bg-[var(--accent)] text-[var(--foreground)] hover:bg-[var(--accent)]/80 hover:shadow-lg hover:shadow-[var(--primary)]/20'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">All Plans Include</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] group hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                <feature.icon className="h-8 w-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">{feature.title}</h3>
                <p className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
            Check out our FAQ or contact our sales team for more information.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/faq"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--accent)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
            >
              View FAQ
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary)]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-[var(--primary)]/30"
            >
              Contact Sales
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 