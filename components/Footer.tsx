"use client";
import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Resources", href: "/resources" },
        { name: "Community", href: "/community" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" },
        { name: "Cookies", href: "/cookies" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@brainaistorm.com", label: "Email" },
  ];

  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 flex flex-col items-center md:items-start md:text-left">
            <Link href="/" className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center overflow-hidden p-1">
                <img 
                  src="/BrainAIStormOfficialLogo_Cropped.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                  style={{ background: 'black', objectPosition: 'center' }}
                />
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-purple-500">
                BrainAIStorm
              </span>
            </Link>
            <p className="mt-2 text-sm text-[var(--muted-foreground)] max-w-xs md:max-w-xs lg:max-w-sm leading-relaxed text-left">
              Empowering creativity through AI-powered brainstorming. Transform your ideas into reality with our intelligent platform.
            </p>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-[var(--muted-foreground)] flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> © {currentYear} BrainAIStorm. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 