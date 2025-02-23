"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) alert(error.message);
    else {
      alert("Logged in!");
      router.push("/notes");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Log In</h1>
      <p className="text-gray-500 mb-6">Access your AI-enhanced notes.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
      </div>

      <button
        disabled={loading}
        onClick={handleLogin}
        className="w-full bg-brainstorm-primary text-white py-2 rounded hover:bg-indigo-600 transition disabled:opacity-50 mb-3"
      >
        {loading ? "Logging In..." : "Log In"}
      </button>

      <p className="text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <a href="/register" className="text-brainstorm-primary font-semibold">
          Sign Up
        </a>
      </p>
    </div>
  );
}


// "use client";
// import React, { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleLogin() {
//     setLoading(true);
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     setLoading(false);

//     if (error) {
//       alert(error.message);
//     } else {
//       alert("Logged in successfully!");
//       router.push("/notes");
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white rounded shadow p-6">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Log In</h1>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Email</label>
//         <input
//           type="email"
//           className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
//           placeholder="you@example.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-600">Password</label>
//         <input
//           type="password"
//           className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
//           placeholder="********"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={handleLogin}
//         disabled={loading}
//         className="w-full px-4 py-2 bg-brainstorm-primary text-white rounded hover:bg-indigo-600 transition disabled:opacity-50"
//       >
//         {loading ? "Logging in..." : "Log In"}
//       </button>
//     </div>
//   );
// }



// // app/login/page.tsx

// "use client"; // Required if you use React hooks in this page

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient"; // or your client import path

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   async function handleLogin() {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) {
//       alert(error.message);
//     } else {
//       // On success, perhaps redirect to a notes page
//       router.push("/notes");
//     }
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Log In</button>
//     </div>
//   );
// }
