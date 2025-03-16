// components/Sidebar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Zap,
  Bookmark,
  Search,
  Coffee,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Navigation items
  const navItems = [
    { name: "Brainstorm", href: "/", icon: <Zap className="h-4 w-4" /> },
    { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-4 w-4" /> },
    { name: "Search", href: "/search", icon: <Search className="h-4 w-4" /> },
    { name: "Brewing", href: "/brewing", icon: <Coffee className="h-4 w-4" /> },
  ];

  return (
    <aside
      className={`bg-neutral-800 flex flex-col ${
        collapsed ? "w-16" : "w-48"
      } transition-all duration-200`}
    >
      {/* Header with Logo and Title */}
      <div className="p-2 flex items-center justify-between border-b border-neutral-700">
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <Image
            src="/brain-ai-storm-logo-round-cropped-black.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          {/* Title (only if not collapsed) */}
          {!collapsed && (
            <div>
              <h1 className="text-lg font-extrabold text-brainstorm-primary">
                BrainAIStorm
              </h1>
              <p className="text-xs text-gray-300">Search in folders</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-1 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center rounded px-2 py-1 text-sm hover:bg-neutral-700 transition-colors ${
              pathname === item.href ? "bg-neutral-700" : ""
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* User & Settings Section */}
      <div className="mt-auto border-t border-neutral-700 p-2">
        <div className="flex items-center justify-between">
          {/* User Info */}
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-brainstorm-primary" />
            {!collapsed && <span className="text-sm">ado65462</span>}
          </div>
          {/* Settings Icon */}
          <button className="p-1 hover:bg-neutral-700 rounded focus:outline-none flex items-center space-x-1">
            <Settings className="h-5 w-5 text-brainstorm-primary" />
            {!collapsed && <span className="text-xs">Settings</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}


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
//   User,
//   Settings,
//   ChevronRight as ArrowRight,
//   ChevronLeft as ArrowLeft,
// } from "lucide-react";

// export function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   const navItems = [
//     { name: "Brainstorm", href: "/", icon: <Zap className="h-4 w-4" /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-4 w-4" /> },
//     { name: "Search", href: "/search", icon: <Search className="h-4 w-4" /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee className="h-4 w-4" /> },
//   ];

//   return (
//     <aside
//       className={`bg-neutral-800 flex flex-col ${
//         collapsed ? "w-16" : "w-48"
//       } transition-all duration-200`}
//     >
//       {/* Header with Logo and Branding */}
//       <div className="p-2 flex items-center justify-between border-b border-neutral-700">
//         <div className="flex items-center space-x-2">
//           <Image
//             src="/brain-ai-storm-high-resolution-logo-brain.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="rounded"
//           />
//           {!collapsed && (
//             <div>
//               <h1
//                 className="text-lg font-extrabold bg-clip-text text-transparent"
//                 style={{
//                   backgroundImage:
//                     "linear-gradient(90deg, #2acfcf, #a855f7)",
//                 }}
//               >
//                 Brain AI Storm
//               </h1>
//               <p className="text-xs text-gray-300">Search in folders</p>
//             </div>
//           )}
//         </div>
//         <button
//           onClick={() => setCollapsed((prev) => !prev)}
//           className="p-1 focus:outline-none"
//           aria-label="Toggle sidebar"
//         >
//           {collapsed ? (
//             <ArrowRight className="h-5 w-5" />
//           ) : (
//             <ArrowLeft className="h-5 w-5" />
//           )}
//         </button>
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
//             {!collapsed && <span>{item.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* User & Settings Section */}
//       <div className="mt-auto border-t border-neutral-700 p-2">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <User className="h-5 w-5" />
//             {!collapsed && <span className="text-sm">ado65462</span>}
//           </div>
//           <button className="p-1 hover:bg-neutral-700 rounded focus:outline-none flex items-center space-x-1">
//             <Settings className="h-5 w-5" />
//             {!collapsed && <span className="text-xs">Settings</span>}
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }


// // components/Sidebar.tsx
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
//   User,
//   Settings,
// } from "lucide-react";

// export function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   // Navigation items
//   const navItems = [
//     { name: "Brainstorm", href: "/", icon: <Zap className="h-4 w-4" /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-4 w-4" /> },
//     { name: "Search", href: "/search", icon: <Search className="h-4 w-4" /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee className="h-4 w-4" /> },
//   ];

//   return (
//     <aside
//       className={`bg-neutral-800 flex flex-col ${
//         collapsed ? "w-16" : "w-48"
//       } transition-all duration-200`}
//     >
//       {/* Header with Logo and Title */}
//       <div className="p-2 flex items-center justify-between border-b border-neutral-700">
//         <div className="flex items-center space-x-2">
//           <Image
//             src="/brain-ai-storm-high-resolution-logo-brain.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="rounded"
//           />
//           {!collapsed && (
//             <div>
//               <h1
//                 className="text-lg font-extrabold bg-clip-text text-transparent"
//                 style={{
//                   backgroundImage:
//                     "linear-gradient(90deg, #2acfcf, #a855f7)",
//                 }}
//               >
//                 BrainAIStorm
//               </h1>
//               <p className="text-xs text-gray-300">Search in folders</p>
//             </div>
//           )}
//         </div>
//         <button
//           onClick={() => setCollapsed((prev) => !prev)}
//           className="p-1 focus:outline-none"
//           aria-label="Toggle sidebar"
//         >
//           {collapsed ? (
//             <ChevronRight className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </button>
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
//             {!collapsed && <span>{item.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* User & Settings Section */}
//       <div className="mt-auto border-t border-neutral-700 p-2">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <User className="h-5 w-5" />
//             {!collapsed && <span className="text-sm">ado65462</span>}
//           </div>
//           <button className="p-1 hover:bg-neutral-700 rounded focus:outline-none flex items-center space-x-1">
//             <Settings className="h-5 w-5" />
//             {!collapsed && <span className="text-xs">Settings</span>}
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }



// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Zap,
//   Bookmark,
//   Search,
//   Coffee,
//   ChevronLeft,
//   ChevronRight,
//   User,
//   Settings,
// } from "lucide-react";

// export function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   // Navigation items
//   const navItems = [
//     { name: "Brainstorm", href: "/", icon: <Zap className="h-4 w-4" /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-4 w-4" /> },
//     { name: "Search", href: "/search", icon: <Search className="h-4 w-4" /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee className="h-4 w-4" /> },
//   ];

//   return (
//     <aside
//       className={`bg-neutral-800 flex flex-col ${
//         collapsed ? "w-16" : "w-48"
//       } transition-all duration-200`}
//     >
//       {/* Header */}
//       <div className="p-2 flex items-center justify-between border-b border-neutral-700">
//         {/* App name + subtitle (only visible if not collapsed) */}
//         {!collapsed && (
//           <div>
//             <h1
//               className="text-lg font-extrabold leading-none bg-clip-text text-transparent"
//               style={{
//                 backgroundImage: "linear-gradient(90deg, #2acfcf, #a855f7)",
//               }}
//             >
//               Brain AI Storm
//             </h1>
//             <p className="text-xs text-gray-300">Search in folders</p>
//           </div>
//         )}
//         {/* Toggle Button */}
//         <button
//           onClick={() => setCollapsed((prev) => !prev)}
//           className="p-1 focus:outline-none"
//           aria-label="Toggle sidebar"
//         >
//           {collapsed ? (
//             <ChevronRight className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </button>
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
//             {!collapsed && <span>{item.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* User + Settings Section */}
//       <div className="mt-auto border-t border-neutral-700 p-2">
//         <div className="flex items-center justify-between">
//           {/* Left side: user icon + username */}
//           <div className="flex items-center space-x-2">
//             <User className="h-5 w-5" />
//             {!collapsed && <span className="text-sm">ado65462</span>}
//           </div>
//           {/* Right side: settings icon */}
//           <button className="p-1 hover:bg-neutral-700 rounded focus:outline-none flex items-center space-x-1">
//             <Settings className="h-5 w-5" />
//             {!collapsed && <span className="text-xs">Settings</span>}
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }



// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Zap,
//   Bookmark,
//   Search,
//   Coffee,
//   ChevronLeft,
//   ChevronRight,
//   User,
//   Settings,
// } from "lucide-react";

// export function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   // Navigation items (smaller icons + narrower spacing)
//   const navItems = [
//     { name: "Brainstorm", href: "/", icon: <Zap className="h-4 w-4" /> },
//     { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark className="h-4 w-4" /> },
//     { name: "Search", href: "/search", icon: <Search className="h-4 w-4" /> },
//     { name: "Brewing", href: "/brewing", icon: <Coffee className="h-4 w-4" /> },
//   ];

//   return (
//     <aside
//       className={`bg-neutral-800 flex flex-col ${
//         collapsed ? "w-16" : "w-48"
//       } transition-all duration-200`}
//     >
//       {/* Header */}
//       <div className="p-2 flex items-center justify-between border-b border-neutral-700">
//         {!collapsed && (
//           <div>
//             <h1
//               className="text-lg font-extrabold leading-none bg-clip-text text-transparent"
//               style={{
//                 backgroundImage: "linear-gradient(90deg, #2acfcf, #a855f7)",
//               }}
//             >
//               Brain AI Storm
//             </h1>
//             <p className="text-xs text-gray-300">Search in folders</p>
//           </div>
//         )}
//         <button
//           onClick={() => setCollapsed((prev) => !prev)}
//           className="p-1 focus:outline-none"
//           aria-label="Toggle sidebar"
//         >
//           {collapsed ? (
//             <ChevronRight className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </button>
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
//             {!collapsed && <span>{item.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* User Section */}
//       <div className="mt-auto border-t border-neutral-700 p-2 flex items-center justify-between">
//         {/* Left side: user icon + username */}
//         <div className="flex items-center space-x-2">
//           <User className="h-5 w-5" />
//           {!collapsed && <span className="text-sm">ado65462</span>}
//         </div>
//         {/* Right side: settings icon */}
//         <button className="p-1 hover:bg-neutral-700 rounded focus:outline-none">
//           <Settings className="h-5 w-5" />
//         </button>
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
