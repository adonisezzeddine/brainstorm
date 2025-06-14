"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, Rocket, BookOpen, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: "Features", href: "/features", icon: Sparkles },
    { name: "Pricing", href: "/pricing", icon: Rocket },
    { name: "Resources", href: "/resources", icon: BookOpen },
    { name: "Community", href: "/community", icon: Users },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center overflow-hidden p-1">
                <Image 
                  src="/BrainAIStormOfficialLogo_Cropped.png" 
                  alt="Logo" 
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  style={{ background: 'black', objectPosition: 'center' }}
                  priority
                />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-purple-500">
                BrainAIStorm
              </span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[var(--primary)] flex items-center gap-1.5 ${
                  pathname === item.href ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {!session ? (
              <>
                <Link 
                  href="/login" 
                  className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${
                    pathname === '/login' ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'
                  }`}
                >
                  Sign in
                </Link>
                <Link 
                  href="/register"
                  className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </>
            ) : (
              <Link 
                href="/brainstorm"
                className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Brain className="mr-2 h-4 w-4" />
                Start Brainstorming
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
} 