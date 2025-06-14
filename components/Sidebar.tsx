"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Zap,
  Bookmark,
  Search,
  Coffee,
  ArrowLeftCircle,
  ArrowRightCircle,
  Brain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import UserMenu from "@/components/UserMenu";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname();

  // Our main nav items
  const navItems = [
    { name: "Brainstorm", href: "/brainstorm", icon: Zap },
    { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    { name: "Search", href: "/search", icon: Search },
    { name: "Brewing", href: "/brewing", icon: Coffee },
  ];

  return (
    <div className="flex h-screen">
      <div className={`${collapsed ? 'w-16' : 'w-64'} bg-[var(--background)] border-r border-[var(--border)] transition-all duration-300 flex flex-col`}>
        <div className="p-3 flex items-center justify-between border-b border-[var(--border)] bg-[var(--background)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center overflow-hidden p-1">
              <Image 
                src="/BrainAIStormOfficialLogo_Cropped.png" 
                alt="Logo" 
                width={32}
                height={32}
                className="w-full h-full object-contain"
                style={{ background: 'black', objectPosition: 'center' }}
                priority
              />
            </div>
            {!collapsed && (
              <h1 className="text-lg font-bold text-[var(--primary)]">
                BrainAIStorm
              </h1>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={() => onCollapse(!collapsed)}>
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150
                  ${pathname === item.href
                    ? 'bg-[var(--accent)] text-[var(--primary)] shadow-md scale-[1.03]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] hover:shadow-md hover:scale-[1.03]'}
                `}
                style={{ position: 'relative' }}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-[var(--foreground)] text-sm ml-1">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-3 border-t border-[var(--border)] bg-[var(--background)] flex justify-center">
          <UserMenu />
        </div>
      </div>
      <main className="flex-1 overflow-auto bg-[var(--background)] p-6">
        {/* Placeholder for children */}
      </main>
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   Zap,
//   Bookmark,
//   Search,
//   Coffee,
//   ArrowLeftCircle,
//   ArrowRightCircle,
//   User,
// } from "lucide-react";

// export default function Sidebar() {
//   const pathname = usePathname();

//   // Our main nav items
//   const navItems = [
//     { name: "Brainstorm", href: "/", icon: <Zap /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark /> },
//     { name: "Search", href: "/search", icon: <Search /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee /> },
//   ];

//   return (
//     <aside
//       className={`
//         fixed top-0 left-0 h-screen bg-neutral-800 flex flex-col transition-all duration-200 z-50
//         ${collapsed ? "w-20" : "w-56"}
//       `}
//     >
//       {/* header */}
//       <div className="p-3 flex items-center justify-between border-b border-neutral-700">
//         <div className="flex items-center space-x-3">
//           <Image
//             src="/brain-ai-storm-logo-round-cropped-black.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           {!collapsed && (
//             <h1 className="text-lg font-bold text-brainstorm-primary">
//               BrainAIStorm
//             </h1>
//           )}
//         </div>
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           aria-label="Toggle sidebar"
//           className="p-1 text-gray-400 hover:text-white"
//         >
//           {collapsed ? (
//             <ArrowRightCircle className="h-6 w-6" />
//           ) : (
//             <ArrowLeftCircle className="h-6 w-6" />
//           )}
//         </button>
//       </div>

//       {/* nav */}
//       <nav className="flex-1 px-3 py-4 space-y-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             href={item.href}
//             className={`
//               flex items-center space-x-3 px-3 py-2 rounded
//               ${pathname === item.href ? "bg-neutral-700" : "hover:bg-neutral-700"}
//               transition-colors
//             `}
//           >
//             {React.cloneElement(item.icon, { className: "h-5 w-5 text-white" })}
//             {!collapsed && <span className="text-white text-sm">{item.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* bottom user icon */}
//       <div className="mt-auto p-3 border-t border-neutral-700 flex justify-center">
//         <User className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
//       </div>
//     </aside>
//   );
// }


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   Zap,
//   Bookmark,
//   Search,
//   Coffee,
//   ArrowLeftCircle,
//   ArrowRightCircle,
//   LogOut,
//   Settings,
// } from "lucide-react";
// import UserMenu from "@/components/UserMenu";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   const navItems = [
//     { name: "Brainstorm", href: "/", icon: <Zap /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark /> },
//     { name: "Search", href: "/search", icon: <Search /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee /> },
//   ];

//   return (
//     <aside
//       className={`
//         fixed top-0 left-0 h-screen bg-neutral-800 flex flex-col transition-all duration-200 z-50
//         ${collapsed ? "w-20" : "w-56"}
//       `}
//     >
//       {/* header */}
//       <div className="p-3 flex items-center justify-between border-b border-neutral-700">
//         <div className="flex items-center space-x-3">
//           <Image
//             src="/brain-ai-storm-logo-round-cropped-black.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           {!collapsed && (
//             <h1 className="text-lg font-bold text-brainstorm-primary">
//               BrainAIStorm
//             </h1>
//           )}
//         </div>
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           aria-label="Toggle sidebar"
//           className="p-1 text-gray-400 hover:text-white"
//         >
//           {collapsed ? (
//             <ArrowRightCircle className="h-6 w-6" />
//           ) : (
//             <ArrowLeftCircle className="h-6 w-6" />
//           )}
//         </button>
//       </div>

//       {/* nav */}
//       <nav className="flex-1 px-3 py-4 space-y-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             href={item.href}
//             className={`
//               flex items-center space-x-3 px-3 py-2 rounded
//               ${pathname === item.href ? "bg-neutral-700" : "hover:bg-neutral-700"}
//               transition-colors
//             `}
//           >
//             {React.cloneElement(item.icon, { className: "h-5 w-5 text-white" })}
//             {!collapsed && <span className="text-white text-sm">{item.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* bottom user menu */}
//       <div className="mt-auto p-3 border-t border-neutral-700 flex justify-center">
//         <UserMenu collapsed={collapsed} />
//       </div>
//     </aside>
//   );
// }


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { Zap, Bookmark, Search, Coffee, Plus, Menu } from "lucide-react";

// const items = [
//   { href: "/", icon: <Zap />, label: "Brainstorm" },
//   { href: "/bookmarks", icon: <Bookmark />, label: "Bookmarks" },
//   { href: "/search", icon: <Search />, label: "Search" },
//   { href: "/brewing", icon: <Coffee />, label: "Brewing" },
// ];

// export function Sidebar() {
//   const path = usePathname();
//   return (
//     <aside className="fixed left-0 top-0 h-full flex flex-col
//                     w-16 hover:w-48 transition-[width] duration-200
//                     bg-white/30 dark:bg-black/30 backdrop-blur">
//       <div className="flex-1 mt-4 space-y-2">
//         {items.map(({ href, icon, label }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center gap-3 px-3 py-2
//                         ${path === href ? "bg-indigo-500 text-white" : "text-gray-700 dark:text-gray-300"}
//                         rounded-md hover:bg-indigo-400 hover:text-white`}
//           >
//             <span className="h-6 w-6">{icon}</span>
//             <span className="whitespace-nowrap overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
//           </Link>
//         ))}
//       </div>
//       <div className="p-3">
//         <button className="flex items-center justify-center w-full p-2 bg-indigo-500 text-white rounded-full">
//           <Plus />
//         </button>
//       </div>
//     </aside>
//   );
// }


// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   Zap,
//   Bookmark,
//   Search,
//   Coffee,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import UserMenu from "@/components/UserMenu";

// export function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   // Navigation items (using slightly larger icons for better aesthetics)
//   const navItems = [
//     { name: "Brainstorm", href: "/brainstorm", icon: <Zap className="h-5 w-5" /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-5 w-5" /> },
//     { name: "Search", href: "/search", icon: <Search className="h-5 w-5" /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee className="h-5 w-5" /> },
//   ];

//   return (
//     <aside className={`bg-neutral-800 flex flex-col ${collapsed ? "w-16" : "w-55"} transition-all duration-200`}>
//       {/* Header: Logo, Title, and Toggle Button */}
//       <div className="flex items-center border-b border-neutral-700 py-3 px-4">
//         {/* Left: Logo and Title */}
//         <div className="flex items-center flex-1 space-x-3">
//           <Image
//             src="/brain-ai-storm-logo-round-cropped-black.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           {!collapsed && (
//             <h1 className="text-xl font-bold text-brainstorm-primary whitespace-nowrap">
//               BrainAI-Storm
//             </h1>
//           )}
//         </div>
//         {/* Right: Toggle Button */}
//         <div className="flex-none">
//           <button
//             onClick={() => setCollapsed(prev => !prev)}
//             className="p-1 focus:outline-none"
//             aria-label="Toggle sidebar"
//           >
//             {collapsed ? (
//               <ChevronRight className="h-6 w-6 text-gray-200" />
//             ) : (
//               <ChevronLeft className="h-6 w-6 text-gray-200" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-4 space-y-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             href={item.href}
//             className={`flex items-center space-x-3 rounded px-3 py-2 text-md hover:bg-neutral-700 transition ${
//               pathname === item.href ? "bg-neutral-700" : ""
//             }`}
//           >
//             <span>{item.icon}</span>
//             {!collapsed && <span className="text-gray-100">{item.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* Bottom User Section: Display the user icon with dropdown (UserMenu) */}
//       <div className="mt-auto border-t border-neutral-700 px-4 py-3 flex justify-center">
//         <UserMenu />
//       </div>
//     </aside>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   Zap,
//   Bookmark,
//   Search,
//   Coffee,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import UserMenu from "@/components/UserMenu";

// export function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   // Navigation items (using slightly larger icons for better aesthetics)
//   const navItems = [
//     { name: "Brainstorm", href: "/brainstorm", icon: <Zap className="h-5 w-5" /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-5 w-5" /> },
//     { name: "Search", href: "/search", icon: <Search className="h-5 w-5" /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee className="h-5 w-5" /> },
//   ];

//   return (
//     <aside className={`bg-neutral-800 flex flex-col ${collapsed ? "w-16" : "w-48"} transition-all duration-200`}>
//       {/* Header: Logo, Title, and Toggle Button */}
//       <div className="flex items-center border-b border-neutral-700 py-3 px-4">
//         {/* Left: Logo and Title */}
//         <div className="flex items-center flex-1 space-x-3">
//           <Image
//             src="/brain-ai-storm-logo-round-cropped-black.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           {!collapsed && (
//             <h1 className="text-xl font-extrabold text-brainstorm-primary whitespace-nowrap">
//               BrainAIStorm
//             </h1>
//           )}
//         </div>
//         {/* Right: Toggle Button */}
//         <div className="flex-none">
//           <button
//             onClick={() => setCollapsed(prev => !prev)}
//             className="p-1 focus:outline-none"
//             aria-label="Toggle sidebar"
//           >
//             {collapsed ? (
//               <ChevronRight className="h-6 w-6 text-gray-200" />
//             ) : (
//               <ChevronLeft className="h-6 w-6 text-gray-200" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-4 space-y-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             href={item.href}
//             className={`flex items-center space-x-3 rounded px-3 py-2 text-md hover:bg-neutral-700 transition ${
//               pathname === item.href ? "bg-neutral-700" : ""
//             }`}
//           >
//             <span>{item.icon}</span>
//             {!collapsed && <span className="text-gray-100">{item.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* Bottom User Section: Display the user icon with dropdown (UserMenu) */}
//       <div className="mt-auto border-t border-neutral-700 px-4 py-3 flex justify-center">
//         <UserMenu />
//       </div>
//     </aside>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   Zap,
//   Bookmark,
//   Search,
//   Coffee,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import UserMenu from "@/components/UserMenu";

// export function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   // Navigation items (using slightly larger icons for better aesthetics)
//   const navItems = [
//     { name: "Brainstorm", href: "/brainstorm", icon: <Zap className="h-5 w-5" /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-5 w-5" /> },
//     { name: "Search", href: "/search", icon: <Search className="h-5 w-5" /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee className="h-5 w-5" /> },
//   ];

//   return (
//     <aside className={`bg-neutral-800 flex flex-col ${collapsed ? "w-16" : "w-48"} transition-all duration-200`}>
//       {/* Header: Logo, Title, and Toggle Button */}
//       <div className="flex items-center border-b border-neutral-700 py-3 px-4">
//         {/* Left: Logo and Title */}
//         <div className="flex items-center flex-1 space-x-3">
//           <Image
//             src="/brain-ai-storm-logo-round-cropped-black.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           {!collapsed && (
//             <h1 className="text-xl font-extrabold text-brainstorm-primary whitespace-nowrap">
//               BrainAIStorm
//             </h1>
//           )}
//         </div>
//         {/* Right: Toggle Button */}
//         <div className="flex-none">
//           <button
//             onClick={() => setCollapsed(prev => !prev)}
//             className="p-1 focus:outline-none"
//             aria-label="Toggle sidebar"
//           >
//             {collapsed ? (
//               <ChevronRight className="h-6 w-6 text-gray-200" />
//             ) : (
//               <ChevronLeft className="h-6 w-6 text-gray-200" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-4 space-y-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             href={item.href}
//             className={`flex items-center space-x-3 rounded px-3 py-2 text-md hover:bg-neutral-700 transition ${
//               pathname === item.href ? "bg-neutral-700" : ""
//             }`}
//           >
//             <span>{item.icon}</span>
//             {!collapsed && <span className="text-gray-100">{item.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* Bottom User Section: Display the user icon with dropdown (UserMenu) */}
//       <div className="mt-auto border-t border-neutral-700 px-4 py-3 flex justify-center">
//         <UserMenu />
//       </div>
//     </aside>
//   );
// }


// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   Zap,
//   Bookmark,
//   Search,
//   Coffee,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import UserMenu from "@/components/UserMenu";

// export function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   // Navigation items
//   const navItems = [
//     { name: "Brainstorm", href: "/brainstorm", icon: <Zap className="h-4 w-4" /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-4 w-4" /> },
//     { name: "Search", href: "/search", icon: <Search className="h-4 w-4" /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee className="h-4 w-4" /> },
//   ];

//   return (
//     <aside
//       className={`bg-neutral-800 flex flex-col ${
//         collapsed ? "w-12" : "w-45"
//       } transition-all duration-200`}
//     >
//       {/* Header with Logo, Title, and Toggle Button */}
//       <div className="flex items-center border-b border-neutral-700 py-3 px-4">
//         <div className="flex items-center space-x-1 flex-1 px-3">
//           <Image
//             src="/brain-ai-storm-logo-round-cropped-black.png"
//             alt="Logo"
//             width={41}
//             height={40}
//             className="rounded-full"
//           />
//           {!collapsed && (
//             <h1 className="text-lg font-extrabold text-brainstorm-primary">
//               BrainAIStorm
//             </h1>
//           )}
//         </div>
//         {/* Toggle Button in its own container with extra right padding */}
//         <div className="flex-none pr-1">
//           <button
//             onClick={() => setCollapsed((prev) => !prev)}
//             className="p-0.5 focus:outline-none"
//             aria-label="Toggle sidebar"
//           >
//             {collapsed ? (
//               <CircleChevronRight className="h-5 w-5 text-gray-200" />
//             ) : (
//               <CircleChevronLeft className="h-5 w-4 text-gray-200" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-2 py-3 space-y-1">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             href={item.href}
//             className={`flex items-center rounded px-2 py-1 text-sm hover:bg-neutral-700 transition-colors ${
//               pathname === item.href ? "bg-neutral-700" : ""
//             }`}
//           >
//             <span className="mr-2">{item.icon}</span>
//             {!collapsed && <span className="text-gray-100">{item.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* Bottom User Section: Only the user icon that triggers the dropdown */}
//       <div className="mt-auto border-t border-neutral-700 p-2 flex justify-left">
//         <UserMenu />
//       </div>
//     </aside>
//   );
// }




// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   Zap,
//   Bookmark,
//   Search,
//   Coffee,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import UserMenu from "@/components/UserMenu";

// export function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   // Navigation items
//   const navItems = [
//     { name: "Brainstorm", href: "/brainstorm", icon: <Zap className="h-4 w-4" /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-4 w-4" /> },
//     { name: "Search", href: "/search", icon: <Search className="h-4 w-4" /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee className="h-4 w-4" /> },
//   ];

//   return (
//     <aside
//       className={`bg-neutral-800 flex flex-col ${
//         collapsed ? "w-16" : "w-45"
//       } transition-all duration-200`}
//     >
//       {/* Header with Logo, Title, and Toggle Button */}
//       <div className="flex items-center border-b border-neutral-700 py-3 px-4">
//         {/* Left: Logo and Title */}
//         <div className="flex items-center flex-1 space-x-3">
//           <Image
//             src="/brain-ai-storm-logo-round-cropped-black.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           {!collapsed && (
//             <h1 className="text-xl font-extrabold text-brainstorm-primary whitespace-nowrap">
//               BrainAIStorm
//             </h1>
//           )}
//         </div>
//         {/* Right: Toggle Button */}
//         <div className="flex-none">
//           <button
//             onClick={() => setCollapsed(prev => !prev)}
//             className="p-1 focus:outline-none"
//             aria-label="Toggle sidebar"
//           >
//             {collapsed ? (
//               <ChevronRight className="h-6 w-6 text-gray-200" />
//             ) : (
//               <ChevronLeft className="h-6 w-6 text-gray-200" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-4 space-y-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             href={item.href}
//             className={`flex items-center space-x-3 rounded px-3 py-2 text-md hover:bg-neutral-700 transition ${
//               pathname === item.href ? "bg-neutral-700" : ""
//             }`}
//           >
//             <span>{item.icon}</span>
//             {!collapsed && <span className="text-gray-100">{item.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* Bottom User Section: Display the user icon with dropdown (UserMenu) */}
//       <div className="mt-auto border-t border-neutral-700 px-4 py-3 flex justify-center">
//         <UserMenu />
//       </div>
//     </aside>
//   );
// }


// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Zap, Bookmark, Search, Coffee, ChevronLeft, ChevronRight } from "lucide-react";

// export function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   const navItems = [
//     { name: "Brainstorm", href: "/", icon: <Zap className="h-6 w-6" /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-6 w-6" /> },
//     { name: "Search", href: "/search", icon: <Search className="h-6 w-6" /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee className="h-6 w-6" /> },
//   ];

//   return (
//     <aside
//       className={`bg-neutral-800 p-4 flex flex-col ${
//         collapsed ? "w-20" : "w-64"
//       } transition-all duration-200`}
//     >
//       <div className="flex items-center justify-between">
//         {!collapsed && (
//           <div>
//             <h1
//               className="text-2xl font-extrabold bg-clip-text text-transparent"
//               style={{
//                 backgroundImage: "linear-gradient(90deg, #2acfcf, #a855f7)",
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
//           {collapsed ? (
//             <ChevronRight className="h-6 w-6" />
//           ) : (
//             <ChevronLeft className="h-6 w-6" />
//           )}
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


// // components/Sidebar.tsx
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Zap, Bookmark, Search, Coffee, Menu, X } from "lucide-react";

// export function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   const navItems = [
//     { name: "Brainstorm", href: "/", icon: <Zap className="h-6 w-6" /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-6 w-6" /> },
//     { name: "Search", href: "/search", icon: <Search className="h-6 w-6" /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee className="h-6 w-6" /> },
//   ];

//   return (
//     <aside
//       className={`bg-neutral-800 p-4 flex flex-col ${
//         collapsed ? "w-20" : "w-64"
//       } transition-all duration-200`}
//     >
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
