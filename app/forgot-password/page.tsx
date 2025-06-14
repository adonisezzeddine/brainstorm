"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleResetPassword() {
    setLoading(true);
    setMessage("");
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      
      setMessage("Password reset instructions have been sent to your email.");
    } catch (error: any) {
      setMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--accent)] relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="w-full max-w-sm relative mt-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center overflow-hidden p-1">
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
          </div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
            Reset Password
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1 text-sm">
            Enter your email to receive reset instructions
          </p>
        </div>

        <div className="bg-[var(--card)] p-6 rounded-lg shadow-lg border border-[var(--border)]">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleResetPassword();
                  }
                }}
              />
            </div>

            {message && (
              <div className={`text-sm ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </div>
            )}

            <button
              disabled={loading}
              onClick={handleResetPassword}
              className="w-full px-3 py-1.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary)]/90 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm"
            >
              {loading ? "Sending..." : "Send Reset Instructions"}
            </button>

            <p className="text-center text-xs text-[var(--muted-foreground)]">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-[var(--primary)] hover:text-[var(--primary)]/90 font-medium transition-colors"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 