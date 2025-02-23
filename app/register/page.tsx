"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) alert(error.message);
    else {
      alert("Registration successful!");
      router.push("/login");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Create Account</h1>
      <p className="text-gray-500 mb-6">Unlock AI-powered note-taking now.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        disabled={loading}
        onClick={handleRegister}
        className="w-full bg-brainstorm-primary text-white py-2 rounded hover:bg-indigo-600 transition disabled:opacity-50 mb-3"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-brainstorm-primary font-semibold">
          Log in
        </a>
      </p>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";

// export default function RegisterPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleRegister() {
//     setLoading(true);
//     const { data, error } = await supabase.auth.signUp({ email, password });
//     setLoading(false);

//     if (error) {
//       alert(error.message);
//     } else {
//       alert("Registration successful! Please log in.");
//       router.push("/login");
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white rounded shadow p-6">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Account</h1>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Email</label>
//         <input
//           type="email"
//           className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="you@example.com"
//         />
//       </div>

//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-600">Password</label>
//         <input
//           type="password"
//           className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="********"
//         />
//       </div>

//       <button
//         onClick={handleRegister}
//         disabled={loading}
//         className="w-full px-4 py-2 bg-brainstorm-primary text-white rounded hover:bg-indigo-600 transition disabled:opacity-50"
//       >
//         {loading ? "Signing Up..." : "Sign Up"}
//       </button>
//     </div>
//   );
// }



// "use client"; 
// // 1) This is important. Tells Next.js this file runs in the browser, so we can use React hooks, etc.

// import { useState } from "react";
// import { useRouter } from "next/navigation"; 
// // We'll use this to redirect users after they register.
// import { supabase } from "@/lib/supabaseClient"; 
// // Import the client we created in lib/supabaseClient.ts

// export default function RegisterPage() {
//   // 2) React state to store the user's input
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();

//   // 3) The function that runs when the user clicks "Sign Up"
//   async function handleRegister() {
//     // Attempt to create a new user in Supabase using the given email/password
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     // If something went wrong, show an alert with the error
//     if (error) {
//       alert(error.message);
//     } else {
//       // If successful, notify the user
//       alert("Registration successful!");

//       // Optionally, redirect them to a login page (which we'll create separately)
//       router.push("/login");
//     }
//   }

//   // 4) Render the form
//   return (
//     <div style={{ maxWidth: "400px", margin: "0 auto" }}>
//       <h1>Register for Brainstorm</h1>

//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={{ display: "block", marginBottom: "10px", width: "100%" }}
//       />

//       <input
//         type="password"
//         placeholder="Choose a password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ display: "block", marginBottom: "10px", width: "100%" }}
//       />

//       <button
//         onClick={handleRegister}
//         style={{ padding: "8px 16px", cursor: "pointer" }}
//       >
//         Sign Up
//       </button>
//     </div>
//   );
// }
