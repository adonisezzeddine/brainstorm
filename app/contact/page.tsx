import React from 'react';

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-[var(--foreground)]">
      <h1 className="text-4xl font-bold mb-6 text-[var(--primary)]">Contact Us</h1>
      <p className="mb-6 text-lg">We love hearing from our users! Whether you have a question, feedback, or want to partner with <span className="font-semibold">BrainAIStorm</span>, our team is here for you.</p>
      <form className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-6 mb-8 shadow-lg">
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-[var(--primary)]" htmlFor="name">Name</label>
          <input className="w-full px-4 py-2 rounded border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" id="name" type="text" placeholder="Your Name" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-[var(--primary)]" htmlFor="email">Email</label>
          <input className="w-full px-4 py-2 rounded border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" id="email" type="email" placeholder="you@email.com" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-[var(--primary)]" htmlFor="message">Message</label>
          <textarea className="w-full px-4 py-2 rounded border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" id="message" rows={5} placeholder="How can we help you?" />
        </div>
        <button type="submit" className="w-full py-2 px-4 rounded bg-[var(--primary)] text-white font-bold hover:bg-[var(--primary)]/90 transition-colors">Send Message</button>
      </form>
      <div className="text-sm text-[var(--muted-foreground)]">
        <p><span className="font-semibold">BrainAIStorm HQ</span></p>
        <p>123 Future Lane, Innovation City, 2025</p>
        <p>Email: <a href="mailto:support@brainaistorm.com" className="text-[var(--primary)] underline">support@brainaistorm.com</a></p>
      </div>
    </div>
  );
} 