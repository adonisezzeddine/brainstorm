import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrainAIStorm - AI-Powered Brainstorming Platform",
  description: "Transform your ideas into reality with our AI-powered brainstorming platform.",
  openGraph: {
    title: "BrainAIStorm - AI-Powered Brainstorming Platform",
    description: "Transform your ideas into reality with our AI-powered brainstorming platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainAIStorm - AI-Powered Brainstorming Platform",
    description: "Transform your ideas into reality with our AI-powered brainstorming platform.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// import "./globals.css";
// import { Metadata } from "next";
// import ClientLayout from "@/components/ClientLayout";

// export const metadata: Metadata = {
//   title: "Brainstorm App",
//   description: "An AI-powered note-taking and web search app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <ClientLayout>{children}</ClientLayout>;
// }
