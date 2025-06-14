"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

interface UserMenuProps {
  collapsed?: boolean;
}

export default function UserMenu({ collapsed }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  async function handleSignOut() {
    await signOut({ redirect: true, callbackUrl: "/login" });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-full hover:bg-[var(--accent)] focus:outline-none transition-colors"
      >
        <User className="h-6 w-6 text-[#8B949E]" />
      </button>

      {open && (
        <div className="absolute bottom-10 left-0 mt-2 w-48 bg-[var(--card)] text-foreground rounded-lg shadow-lg border border-[var(--border)] z-50">
          <ul className="py-1 text-sm">
            <li className="px-3 py-2 cursor-default flex items-center text-[#8B949E]">
              <User className="h-4 w-4 mr-2" />
              <span className="font-medium">
                {session?.user?.name || session?.user?.email || "User"}
              </span>
            </li>
            <li
              onClick={() => {
                setOpen(false);
                router.push("/settings");
              }}
              className="px-3 py-2 hover:bg-primary/20 cursor-pointer flex items-center transition-colors"
            >
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </li>
            <li
              onClick={() => {
                setOpen(false);
                handleSignOut();
              }}
              className="px-3 py-2 hover:bg-destructive/20 cursor-pointer flex items-center transition-colors text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Sign Out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}


// "use client";
// import React, { useState } from "react";
// import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { User, Settings, LogOut } from "lucide-react";

// export default function UserMenu() {
//   const [open, setOpen] = useState(false);
//   const router = useRouter();

//   async function handleSignOut() {
//     // Sign out with NextAuth
//     await signOut({ redirect: true, callbackUrl: "/login" });
//   }

//   return (
//     <div className="relative inline-block">
//       {/* User icon button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="p-1 hover:bg-neutral-700 rounded focus:outline-none"
//         aria-label="User menu"
//       >
//         <User className="h-5 w-5 text-brainstorm-primary" />
//       </button>

//       {/* Dropdown menu */}
//       {open && (
//         <div className="absolute bottom-10 left-0 mb-2 w-32 bg-white text-gray-900
//                         rounded shadow border border-gray-200 z-50">
//           <ul className="py-1 text-sm">
//             <li
//               onClick={() => {
//                 setOpen(false);
//                 router.push("/account"); // or any other page if you have "Manage Account" route
//               }}
//               className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
//             >
//               <Settings className="h-4 w-4 mr-2" />
//               <span>Settings</span>
//             </li>
//             <li
//               onClick={() => {
//                 setOpen(false);
//                 handleSignOut();
//               }}
//               className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
//             >
//               <LogOut className="h-4 w-4 mr-2" />
//               <span>Sign Out</span>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
