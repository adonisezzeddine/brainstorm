
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative h-screen w-full">
      {/* Background Video */}
      <video
        src="/20250302_2120_Futuristic Brain Interface_remix_01jnc88hjpe62t9t9pmrc8wwfm.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover w-full h-full"
      />
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6 px-4">
        <h1 className="text-5xl font-extrabold text-white">
          Welcome to <span className="text-brainstorm-primary">Brainstorm</span>
        </h1>
        <p className="max-w-2xl mx-auto text-white text-lg">
          Create and manage notes with AI-powered insights, all in one place.
        </p>
        <Link
          href="/register"
          className="px-6 py-3 bg-brainstorm-primary text-white rounded hover:bg-indigo-600 transition"
        >
          Get Started
        </Link>
      </div>
      {/* Optional: Overlay for dimming effect */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
    </div>
  );
}


// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="text-center space-y-6 pt-16">
//       <h1 className="text-5xl font-extrabold text-gray-800">
//         Welcome to <span className="text-brainstorm-primary">Brainstorm</span>
//       </h1>
//       <p className="max-w-2xl mx-auto text-gray-600 text-lg">
//         Create and manage notes with AI-powered insights, all in one place.
//       </p>
//       <div>
//         <Link
//           href="/register"
//           className="px-6 py-3 bg-brainstorm-primary text-white rounded hover:bg-indigo-600 transition"
//         >
//           Get Started
//         </Link>
//       </div>

//       <div className="flex justify-center mt-12">
//         <video
//           src="/20250302_2120_Futuristic Brain Interface_remix_01jnc88hjpe62t9t9pmrc8wwfm.mp4"
//           width={600}
//           height={400}
//           className="w-1/2 object-cover rounded shadow"
//           controls
//           autoPlay
//           loop
//           muted
//         >
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     </div>
//   );
// }



// import Image from "next/image";
// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="text-center space-y-6 pt-16">
//       <h1 className="text-5xl font-extrabold text-gray-800">
//         Welcome to <span className="text-brainstorm-primary">Brainstorm</span>
//       </h1>
//       <p className="max-w-2xl mx-auto text-gray-600 text-lg">
//         Create and manage notes with AI-powered insights, all in one place.
//       </p>
//       <div>
//         <Link
//           href="/register"
//           className="px-6 py-3 bg-brainstorm-primary text-white rounded hover:bg-indigo-600 transition"
//         >
//           Get Started
//         </Link>
//       </div>

//       <div className="flex justify-center mt-12">
//         <Image
//           src="/20250302_2120_Futuristic Brain Interface_remix_01jnc88hjpe62t9t9pmrc8wwfm.mp4"
//           alt="Brainstorm Hero"
//           width={600} // Set appropriate width
//           height={400} // Set appropriate height
//           className="w-1/2 object-cover rounded shadow"
//           priority // Ensures it loads faster
//         />
//       </div>
//     </div>
//   );
// }


// export default function HomePage() {
//   return (
//     <div className="text-center space-y-6 pt-16">
//       <h1 className="text-5xl font-extrabold text-gray-800">
//         Welcome to <span className="text-brainstorm-primary">Brainstorm</span>
//       </h1>
//       <p className="max-w-2xl mx-auto text-gray-600 text-lg">
//         Create and manage notes with AI-powered insights, all in one place.
//       </p>
//       <div>
//         <a
//           href="/register"
//           className="px-6 py-3 bg-brainstorm-primary text-white rounded hover:bg-indigo-600 transition"
//         >
//           Get Started
//         </a>
//       </div>

//       <div className="flex justify-center mt-12">
//         <img
//           src="/hero-illustration.png"
//           alt="Brainstorm Hero"
//           className="w-1/2 object-cover rounded shadow"
//         />
//       </div>
//     </div>
//   );
// }




// // app/page.tsx
// export default function HomePage() {
//   return (
//     <div className="text-center space-y-6">
//       <h1 className="text-3xl font-extrabold mt-8 text-gray-800">
//         Welcome to <span className="text-brainstorm-primary">Brainstorm</span>
//       </h1>
//       <p className="max-w-xl mx-auto text-gray-600">
//         AI-powered note-taking, inspired by NotebookLM, Notion, and Perplexity.
//       </p>
//       <div>
//         <a
//           href="/register"
//           className="px-4 py-2 bg-brainstorm-primary text-white rounded hover:bg-indigo-600 transition"
//         >
//           Get Started
//         </a>
//       </div>
//       <img
//         src="https://via.placeholder.com/800x400"
//         alt="Illustration"
//         className="mx-auto mt-8 rounded shadow-lg"
//       />
//     </div>
//   );
// }



// // app/page.tsx
// export default function HomePage() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Welcome to Brainstorm</h1>
//       <p>An AI-powered note-taking application.</p>
//       <p>
//         <a href="/register">Register</a> or <a href="/login">Log In</a> to get started.
//       </p>
//     </div>
//   );
// }



// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
