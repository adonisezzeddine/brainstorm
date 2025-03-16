// app/layout.tsx
import "./globals.css";
import React from "react";
import { Sidebar } from "@/components/Sidebar";

export const metadata = {
  title: "Brainstorm App",
  description: "An AI-powered note-taking and web search app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-neutral-900 text-white">
        <Sidebar />
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}


// // app/layout.tsx
// import "./globals.css";
// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// // Import some icons from lucide-react
// import { Zap, Bookmark, Search, Coffee, Menu, X } from "lucide-react";

// export const metadata = {
//   title: "Brainstorm App",
//   description: "An AI-powered note-taking and web search app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="flex min-h-screen bg-neutral-900 text-white">
//         <Sidebar />
//         <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
//       </body>
//     </html>
//   );
// }

// function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   const navItems = [
//     {
//       name: "Brainstorm",
//       href: "/",
//       icon: <Zap className="h-6 w-6" />,
//     },
//     {
//       name: "Bookmarks",
//       href: "/bookmarks",
//       icon: <Bookmark className="h-6 w-6" />,
//     },
//     {
//       name: "Search",
//       href: "/search",
//       icon: <Search className="h-6 w-6" />,
//     },
//     {
//       name: "Brewing",
//       href: "/brewing",
//       icon: <Coffee className="h-6 w-6" />,
//     },
//   ];

//   return (
//     <aside
//       className={`bg-neutral-800 p-4 flex flex-col ${
//         collapsed ? "w-20" : "w-64"
//       } transition-all duration-200`}
//     >
//       {/* Header with SAAS name */}
//       <div className="flex items-center justify-between">
//         {!collapsed && (
//           <div>
//             <h1
//               className="text-2xl font-extrabold bg-clip-text text-transparent"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(90deg, #2acfcf, #a855f7)",
//               }}
//             >
//               Brain AI Storm
//             </h1>
//             <p className="text-sm text-gray-300">Search in folders</p>
//           </div>
//         )}
//         <button
//           onClick={() => setCollapsed((prev) => !prev)}
//           className="p-1 focus:outline-none"
//           aria-label="Toggle sidebar"
//         >
//           {collapsed ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
//         </button>
//       </div>

//       <nav className="mt-8 flex-1 space-y-4">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             href={item.href}
//             className={`flex items-center space-x-4 p-2 rounded hover:bg-neutral-700 transition-colors ${
//               pathname === item.href ? "bg-neutral-700" : ""
//             }`}
//           >
//             <span>{item.icon}</span>
//             {!collapsed && <span className="text-lg">{item.name}</span>}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }


// // app/layout.tsx
// import "./globals.css";
// import React from "react";
// import Link from "next/link";

// export const metadata = {
//   title: "Brainstorm App",
//   description: "An AI-powered note-taking and web search app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="flex min-h-screen bg-neutral-900 text-white">
//         <Sidebar />
//         <main className="flex-1 container mx-auto px-4 py-6">
//           {children}
//         </main>
//       </body>
//     </html>
//   );
// }

// function Sidebar() {
//   const navItems = [
//     { name: "Brainstorm", href: "/" },
//     { name: "Bookmarks", href: "/bookmarks" },
//     { name: "Search", href: "/search" },
//     { name: "Brewing", href: "/brewing" },
//   ];

//   return (
//     <aside className="w-64 bg-neutral-800 p-6">
//       <nav className="space-y-4">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             href={item.href}
//             className="block text-lg font-medium hover:text-teal-400"
//           >
//             {item.name}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }


// // app/layout.tsx
// import "./globals.css";
// import React from "react";
// import Link from "next/link";

// export const metadata = {
//   title: "Brainstorm App",
//   description: "An AI-powered note-taking + web search app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="flex min-h-screen">
//         <Sidebar />
//         <div className="flex-1 flex flex-col">
//           <TopNav />
//           <main className="flex-1 container mx-auto px-4 py-6">
//             {children}
//           </main>
//         </div>
//       </body>
//     </html>
//   );
// }

// function TopNav() {
//   return (
//     <header className="border-b bg-white shadow-sm">
//       <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Link href="/" className="text-xl font-bold text-brainstorm-primary">
//             Brainstorm
//           </Link>
//           <Link href="/notes" className="text-gray-600 hover:text-brainstorm-primary">
//             Notes
//           </Link>
//           <Link href="/search" className="text-gray-600 hover:text-brainstorm-primary">
//             Search
//           </Link>
//           <Link href="/bookmarks" className="text-gray-600 hover:text-brainstorm-primary">
//             Bookmarks
//           </Link>
//           <Link href="/brewing" className="text-gray-600 hover:text-brainstorm-primary">
//             Brewing
//           </Link>
//         </div>
//         {/* Add additional items here, e.g., user avatar, sign out button */}
//       </nav>
//     </header>
//   );
// }

// function Sidebar() {
//   const navItems = [
//     { name: "Brainstorm", href: "/" },
//     { name: "Bookmarks", href: "/bookmarks" },
//     { name: "Search", href: "/search" },
//     { name: "Brewing", href: "/brewing" },
//   ];

//   return (
//     <aside className="w-64 bg-gray-800 text-white p-6">
//       <nav className="space-y-6">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             href={item.href}
//             className="block text-lg hover:text-brainstorm-primary"
//           >
//             {item.name}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }


// // app/layout.tsx
// import "./globals.css";
// import React from "react";
// import Link from "next/link";

// export const metadata = {
//   title: "Brainstorm App",
//   description: "An AI-powered note-taking + web search app",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="flex min-h-screen">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main area */}
//         <div className="flex-1 flex flex-col">
//           <TopNav />
//           <main className="flex-1 container mx-auto px-4 py-6">
//             {children}
//           </main>
//         </div>
//       </body>
//     </html>
//   );
// }

// function TopNav() {
//   return (
//     <header className="border-b bg-white shadow-sm">
//       <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Link href="/" className="text-xl font-bold text-brainstorm-primary">
//             Brainstorm
//           </Link>
//           {/* You can add additional nav links here if needed */}
//         </div>
//         {/* Add user avatar, sign-out button, etc. here */}
//       </nav>
//     </header>
//   );
// }

// function Sidebar() {
//   return (
//     <aside className="w-64 bg-gray-800 text-white p-6">
//       <nav className="space-y-6">
//         <Link href="/" className="block text-xl font-bold hover:text-brainstorm-primary">
//           Brainstorm
//         </Link>
//         <Link href="/bookmarks" className="block text-lg hover:text-brainstorm-primary">
//           Bookmarks
//         </Link>
//         <Link href="/search" className="block text-lg hover:text-brainstorm-primary">
//           Search
//         </Link>
//         <Link href="/brewing" className="block text-lg hover:text-brainstorm-primary">
//           Brewing
//         </Link>
//       </nav>
//     </aside>
//   );
// }

// // app/layout.tsx
// import "./globals.css";
// import React from "react";
// import Link from "next/link";

// export const metadata = {
//   title: "Brainstorm App",
//   description: "An AI-powered note-taking + web search app",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="flex flex-col min-h-screen">
//         <TopNav />
//         <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
//       </body>
//     </html>
//   );
// }

// function TopNav() {
//   return (
//     <header className="border-b bg-white shadow-sm">
//       <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Link href="/" className="text-xl font-bold text-brainstorm-primary">
//             Brainstorm
//           </Link>
//           <Link href="/notes" className="text-gray-600 hover:text-brainstorm-primary">
//             Notes
//           </Link>
//           <Link href="/search" className="text-gray-600 hover:text-brainstorm-primary">
//             Search
//           </Link>
//           <Link href="/bookmarks" className="text-gray-600 hover:text-brainstorm-primary">
//             Bookmarks
//           </Link>
//         </div>
//         {/* You can add a user avatar, sign out button, etc. on the right */}
//       </nav>
//     </header>
//   );
// }



// // app/layout.tsx
// import "./globals.css";
// import React from "react";

// export const metadata = {
//   title: "Brainstorm - AI-Powered Notes",
//   description: "A sleek note-taking app inspired by NotebookLM, Notion, and Perplexity",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="flex flex-col min-h-screen">
//         <TopNav />
//         <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
//       </body>
//     </html>
//   );
// }

// /**
//  * A simple top navigation bar using Tailwind
//  */
// function TopNav() {
//   return (
//     <header className="border-b bg-white">
//       <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <a href="/" className="text-xl font-bold text-brainstorm-primary">
//             Brainstorm
//           </a>
//           <a
//             href="/notes"
//             className="text-gray-600 hover:text-brainstorm-primary transition"
//           >
//             Notes
//           </a>
//         </div>

//         <div className="flex space-x-4">
//           <a
//             href="/login"
//             className="text-gray-600 hover:text-brainstorm-primary transition"
//           >
//             Log In
//           </a>
//           <a
//             href="/register"
//             className="px-3 py-1 bg-brainstorm-primary text-white rounded hover:bg-indigo-600 transition"
//           >
//             Sign Up
//           </a>
//         </div>
//       </nav>
//     </header>
//   );
// }




// // app/layout.tsx
// import React from "react";
// import "./globals.css"; // optional global CSS

// export const metadata = {
//   title: "Brainstorm App",
//   description: "AI-powered note-taking SaaS",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }


// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
