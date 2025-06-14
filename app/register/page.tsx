"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      
      // Show success message and redirect
      alert("Registration successful! Please check your email to verify your account.");
      router.push("/login");
    } catch (error: any) {
      setError(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--accent)] relative overflow-hidden p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Main content */}
      <div className="w-full max-w-sm relative mt-8">
        {/* Logo and title */}
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
            Create Account
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1 text-sm">
            Join BrainAIStorm and start organizing your thoughts
          </p>
        </div>

        {/* Registration form */}
        <div className="bg-[var(--card)]/50 backdrop-blur-sm border border-[var(--border)] rounded-lg p-6 shadow-lg">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] transition-colors text-sm"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </button>
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] transition-colors text-sm"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border)]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-[var(--card)]/50 text-[var(--muted-foreground)]">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email input */}
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
                required
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all text-sm"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm password input */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all text-sm"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                {error}
              </div>
            )}

            {/* Register button */}
            <button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full px-3 py-1.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary)]/90 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm"
            >
              <span className="relative z-10">
                {loading ? "Creating Account..." : "Create Account"}
              </span>
              <div className={`absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </button>

            {/* Login link */}
            <p className="text-center text-xs text-[var(--muted-foreground)]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[var(--primary)] hover:text-[var(--primary)]/90 font-medium transition-colors"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
} 