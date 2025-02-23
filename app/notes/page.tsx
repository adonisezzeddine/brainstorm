"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

/**
 * This page has:
 * 1. A top nav bar (like NotebookLM) with the brand + sign out button.
 * 2. A left sidebar to list existing notes.
 * 3. The main content area to view/edit notes and run AI summaries.
 */

export default function NotesPage() {
  const router = useRouter();

  // Our note data / local states
  const [notes, setNotes] = useState<any[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // For AI summary
  const [summary, setSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // On mount, check if we have a session & fetch notes
  useEffect(() => {
    checkSessionAndFetch();
  }, []);

  async function checkSessionAndFetch() {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      // Not logged in, redirect to login
      router.push("/login");
      return;
    }
    fetchNotes();
  }

  // Fetch notes from supabase
  async function fetchNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      return;
    }
    setNotes(data || []);
  }

  // Create a new note or update existing note
  async function saveNote() {
    if (!title.trim()) return; // skip if empty

    if (selectedNoteId) {
      // Update
      const { data, error } = await supabase
        .from("notes")
        .update({ title, content })
        .eq("id", selectedNoteId);
      if (!error) {
        fetchNotes();
      } else {
        console.error(error);
      }
    } else {
      // Insert
      const { data, error } = await supabase
        .from("notes")
        .insert([{ title, content }]);
      if (!error) {
        fetchNotes();
      } else {
        console.error(error);
      }
    }
    // After save, keep the same note selected or if new, we'll handle
  }

  // Handle selecting a note from the sidebar
  function selectNote(noteId: number) {
    setSelectedNoteId(noteId);
    setSummary("");
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }

  // Start a new note
  function newNote() {
    setSelectedNoteId(null);
    setTitle("");
    setContent("");
    setSummary("");
  }

  // Summarize with AI
  async function summarizeNote() {
    if (!content.trim()) return;
    try {
      setAiLoading(true);
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "summary", content }),
      });
      const data = await res.json();
      setAiLoading(false);
      if (res.ok) {
        setSummary(data.summary);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      setAiLoading(false);
    }
  }

  // Sign out
  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top Nav (NotebookLM-inspired) */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-xl font-bold text-brainstorm-primary">
              Brainstorm
            </a>
            <span className="text-gray-500 hidden md:inline-block">
              AI-Enhanced Notes
            </span>
          </div>
          <button
            onClick={signOut}
            className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main content area: sidebar + note editor */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar / Notes List */}
        <aside className="w-64 bg-white border-r hidden md:flex flex-col">
          <div className="border-b p-4">
            <button
              onClick={newNote}
              className="w-full bg-brainstorm-primary text-white py-2 rounded hover:bg-indigo-600 transition"
            >
              + New Note
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => selectNote(note.id)}
                className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
                  selectedNoteId === note.id ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {note.title || "Untitled"}
              </div>
            ))}
          </div>
        </aside>

        {/* Note Editor Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto bg-white rounded shadow p-4 md:p-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Title
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Content
              </label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
                rows={8}
                placeholder="Write your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={saveNote}
                className="px-4 py-2 bg-brainstorm-primary text-white rounded hover:bg-indigo-600 transition"
              >
                {selectedNoteId ? "Update Note" : "Create Note"}
              </button>
              <button
                onClick={summarizeNote}
                disabled={aiLoading || !content.trim()}
                className="px-4 py-2 border border-brainstorm-primary text-brainstorm-primary rounded
                           hover:bg-brainstorm-primary hover:text-white transition disabled:opacity-50"
              >
                {aiLoading ? "Summarizing..." : "Summarize with AI"}
              </button>
            </div>

            {/* AI Summary Panel */}
            {summary && (
              <div className="mt-6 p-4 border border-dashed border-brainstorm-primary rounded bg-gray-50">
                <h3 className="font-semibold text-gray-700 mb-2">AI Summary</h3>
                <p className="whitespace-pre-wrap text-gray-800">{summary}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// "use client";
// import React, { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function NotesPage() {
//   const [notes, setNotes] = useState<any[]>([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [summary, setSummary] = useState("");
//   const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     checkSessionAndFetch();
//   }, []);

//   async function checkSessionAndFetch() {
//     const { data: sessionData } = await supabase.auth.getSession();
//     if (!sessionData?.session) {
//       router.push("/login");
//       return;
//     }
//     fetchNotes();
//   }

//   async function fetchNotes() {
//     const { data, error } = await supabase
//       .from("notes")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (!error && data) {
//       setNotes(data);
//     }
//   }

//   async function createNote() {
//     if (!title.trim()) return;
//     const { data, error } = await supabase
//       .from("notes")
//       .insert([{ title, content }]);
//     if (!error) {
//       setTitle("");
//       setContent("");
//       fetchNotes();
//     }
//   }

//   async function summarizeNote(noteContent: string) {
//     setSummary("");
//     const res = await fetch("/api/ai", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ mode: "summary", content: noteContent }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       setSummary(data.summary);
//     } else {
//       alert(data.message);
//     }
//   }

//   function selectNote(noteId: number) {
//     setSelectedNoteId(noteId);
//     const note = notes.find((n) => n.id === noteId);
//     if (note) {
//       setTitle(note.title);
//       setContent(note.content);
//     }
//   }

//   return (
//     <div className="flex gap-4">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r h-full shadow-sm hidden md:block">
//         <div className="p-4 border-b">
//           <button
//             onClick={() => {
//               setSelectedNoteId(null);
//               setTitle("");
//               setContent("");
//             }}
//             className="w-full text-left text-brainstorm-primary font-semibold"
//           >
//             + New Note
//           </button>
//         </div>
//         <div className="p-4 space-y-2">
//           {notes.map((note) => (
//             <div
//               key={note.id}
//               onClick={() => selectNote(note.id)}
//               className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
//                 selectedNoteId === note.id ? "bg-gray-100 font-medium" : ""
//               }`}
//             >
//               {note.title || "Untitled"}
//             </div>
//           ))}
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="flex-1 bg-white rounded shadow-sm p-6">
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600">
//             Title
//           </label>
//           <input
//             className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none 
//                        focus:border-brainstorm-primary"
//             placeholder="Note Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600">
//             Content
//           </label>
//           <textarea
//             className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
//                        focus:outline-none focus:border-brainstorm-primary"
//             rows={8}
//             placeholder="Write your thoughts here..."
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//         </div>

//         <div className="flex items-center space-x-4">
//           <button
//             onClick={createNote}
//             className="px-4 py-2 bg-brainstorm-primary text-white rounded 
//                        hover:bg-indigo-600 transition"
//           >
//             {selectedNoteId ? "Update Note" : "Create Note"}
//           </button>
//           <button
//             onClick={() => summarizeNote(content)}
//             className="px-4 py-2 border border-brainstorm-primary text-brainstorm-primary 
//                        rounded hover:bg-brainstorm-primary hover:text-white transition"
//           >
//             Summarize with AI
//           </button>
//         </div>

//         {summary && (
//           <div className="mt-6 p-4 border border-dashed border-brainstorm-primary rounded">
//             <h3 className="font-semibold text-gray-700 mb-2">AI Summary</h3>
//             <p className="text-gray-800 whitespace-pre-wrap">{summary}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// "use client";
// // app/notes/page.tsx

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";

// export default function NotesPage() {
//   const router = useRouter();
//   const [notes, setNotes] = useState<any[]>([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [summary, setSummary] = useState("");

//   // Fetch notes on load
//   useEffect(() => {
//     checkAuthAndFetchNotes();
//   }, []);

//   async function checkAuthAndFetchNotes() {
//     // If there's no session, redirect to /login
//     const { data } = await supabase.auth.getSession();
//     if (!data.session) {
//       router.push("/login");
//       return;
//     }
//     await fetchNotes();
//   }

//   async function fetchNotes() {
//     const { data, error } = await supabase
//       .from("notes")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (error) {
//       console.error(error);
//     } else {
//       setNotes(data || []);
//     }
//   }

//   async function createNote() {
//     const { data, error } = await supabase
//       .from("notes")
//       .insert([{ title, content }]);
//     if (error) {
//       console.error(error);
//     } else {
//       // Refresh notes
//       fetchNotes();
//       setTitle("");
//       setContent("");
//     }
//   }

//   // Basic AI Summarization
//   async function summarizeNote(noteContent: string) {
//     setSummary("");
//     // Call our /api/ai route with mode=summary
//     const res = await fetch("/api/ai", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ mode: "summary", content: noteContent }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       setSummary(data.summary);
//     } else {
//       alert(data.message);
//     }
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Your Notes</h1>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           placeholder="Note Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={{ display: "block", marginBottom: "8px" }}
//         />
//         <textarea
//           placeholder="Note Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           style={{ display: "block", marginBottom: "8px" }}
//         />
//         <button onClick={createNote}>Create Note</button>
//       </div>

//       <ul>
//         {notes.map((note) => (
//           <li key={note.id} style={{ marginBottom: "10px" }}>
//             <h3>{note.title}</h3>
//             <p>{note.content}</p>
//             <button onClick={() => summarizeNote(note.content)}>
//               Summarize
//             </button>
//           </li>
//         ))}
//       </ul>

//       {summary && (
//         <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
//           <h2>AI Summary</h2>
//           <p>{summary}</p>
//         </div>
//       )}
//     </div>
//   );
// }
