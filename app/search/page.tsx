"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Bookmark = {
  id: number;
  title: string;
  url: string;
  created_at: string;
};

type SearchResult = {
  title: string;
  link: string;
  snippet: string;
};

export default function SearchPage() {
  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loadingBookmarks, setLoadingBookmarks] = useState(false);

  // Search state
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // 1) Fetch bookmarks on mount
  useEffect(() => {
    fetchBookmarks();
  }, []);

  async function fetchBookmarks() {
    setLoadingBookmarks(true);
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });
    setLoadingBookmarks(false);

    if (error) {
      alert(error.message);
    } else {
      setBookmarks((data as Bookmark[]) || []);
    }
  }

  // 2) Perform a web search via our /api/search route
  async function handleSearch() {
    if (!query.trim()) return;
    setSearchLoading(true);
    setSearchResults([]);

    // Call our custom route
    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setSearchLoading(false);

    if (res.ok) {
      // data.results.items => from Google Custom Search
      const items = (data.results.items || []) as SearchResult[];
      setSearchResults(items);
    } else {
      alert(data.message || "Error searching");
    }
  }

  // 3) Bookmark a result
  async function bookmarkLink(title: string, url: string) {
    const { error } = await supabase.from("bookmarks").insert([{ title, url }]);
    if (error) alert(error.message);
    else {
      alert("Bookmarked!");
      fetchBookmarks();
    }
  }

  return (
    <div className="space-y-8">
      {/* A. Section: Bookmarks */}
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800">My Bookmarks</h2>
        {loadingBookmarks && <p className="text-gray-500">Loading bookmarks...</p>}
        {bookmarks.map((bm) => (
          <div key={bm.id} className="mb-3 border p-2 rounded">
            <h4 className="font-semibold text-brainstorm-primary">
              <a href={bm.url} target="_blank" rel="noreferrer">
                {bm.title || bm.url}
              </a>
            </h4>
            <p className="text-sm text-gray-500">{bm.url}</p>
          </div>
        ))}
        {!loadingBookmarks && bookmarks.length === 0 && (
          <p className="text-gray-500">No bookmarks yet.</p>
        )}
      </section>

      {/* B. Section: Web Search */}
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Search the Web</h2>
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            className="px-4 py-2 bg-brainstorm-primary text-white rounded 
                       hover:bg-indigo-600 transition disabled:opacity-50"
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Show results */}
        <div className="space-y-4">
          {searchResults.map((item, index) => (
            <div key={index} className="p-3 border rounded">
              <h3 className="text-lg font-semibold text-brainstorm-primary">
                <a href={item.link} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </h3>
              <p className="text-sm text-gray-700">{item.snippet}</p>
              <button
                onClick={() => bookmarkLink(item.title, item.link)}
                className="mt-2 text-sm px-3 py-1 border border-brainstorm-primary 
                           text-brainstorm-primary rounded hover:bg-brainstorm-primary
                           hover:text-white transition"
              >
                Bookmark
              </button>
            </div>
          ))}
        </div>
        {searchLoading && <p className="text-gray-500 mt-2">Searching Google...</p>}
      </section>
    </div>
  );
}



// "use client";
// import React, { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export default function SearchPage() {
//   // Bookmarks state
//   const [bookmarks, setBookmarks] = useState<any[]>([]);
//   const [loadingBookmarks, setLoadingBookmarks] = useState(false);

//   // Search state
//   const [query, setQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const [searchLoading, setSearchLoading] = useState(false);

//   // 1) Fetch bookmarks on mount
//   useEffect(() => {
//     fetchBookmarks();
//   }, []);

//   async function fetchBookmarks() {
//     setLoadingBookmarks(true);
//     const { data, error } = await supabase
//       .from("bookmarks")
//       .select("*")
//       .order("created_at", { ascending: false });
//     setLoadingBookmarks(false);

//     if (error) {
//       alert(error.message);
//     } else {
//       setBookmarks(data || []);
//     }
//   }

//   // 2) Perform a web search via our /api/search route
//   async function handleSearch() {
//     if (!query.trim()) return;
//     setSearchLoading(true);
//     setSearchResults([]);

//     // Call our custom route
//     const res = await fetch("/api/search", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query }),
//     });
//     const data = await res.json();
//     setSearchLoading(false);

//     if (res.ok) {
//       // data.results.items => from Google Custom Search
//       const items = data.results.items || [];
//       setSearchResults(items);
//     } else {
//       alert(data.message || "Error searching");
//     }
//   }

//   // 3) Bookmark a result
//   async function bookmarkLink(title: string, url: string) {
//     const { error } = await supabase
//       .from("bookmarks")
//       .insert([{ title, url }]);
//     if (error) alert(error.message);
//     else {
//       alert("Bookmarked!");
//       // Optionally refetch bookmarks to show the new item
//       fetchBookmarks();
//     }
//   }

//   return (
//     <div className="space-y-8">
//       {/* A. Section: Bookmarks */}
//       <section className="bg-white p-4 rounded shadow">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">
//           My Bookmarks
//         </h2>
//         {loadingBookmarks && <p className="text-gray-500">Loading bookmarks...</p>}
//         {bookmarks.map((bm) => (
//           <div key={bm.id} className="mb-3 border p-2 rounded">
//             <h4 className="font-semibold text-brainstorm-primary">
//               <a href={bm.url} target="_blank" rel="noreferrer">{bm.title || bm.url}</a>
//             </h4>
//             <p className="text-sm text-gray-500">{bm.url}</p>
//           </div>
//         ))}
//         {!loadingBookmarks && bookmarks.length === 0 && (
//           <p className="text-gray-500">No bookmarks yet.</p>
//         )}
//       </section>

//       {/* B. Section: Web Search */}
//       <section className="bg-white p-4 rounded shadow">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">Search the Web</h2>
//         <div className="flex gap-2 mb-4">
//           <input
//             className="flex-1 border rounded px-3 py-2 focus:outline-none focus:border-brainstorm-primary"
//             placeholder="Search..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button
//             onClick={handleSearch}
//             disabled={searchLoading}
//             className="px-4 py-2 bg-brainstorm-primary text-white rounded 
//                        hover:bg-indigo-600 transition disabled:opacity-50"
//           >
//             {searchLoading ? "Searching..." : "Search"}
//           </button>
//         </div>

//         {/* Show results */}
//         <div className="space-y-4">
//           {searchResults.map((item, index) => (
//             <div key={index} className="p-3 border rounded">
//               <h3 className="text-lg font-semibold text-brainstorm-primary">
//                 <a href={item.link} target="_blank" rel="noreferrer">
//                   {item.title}
//                 </a>
//               </h3>
//               <p className="text-sm text-gray-700">{item.snippet}</p>
//               <button
//                 onClick={() => bookmarkLink(item.title, item.link)}
//                 className="mt-2 text-sm px-3 py-1 border border-brainstorm-primary 
//                            text-brainstorm-primary rounded hover:bg-brainstorm-primary
//                            hover:text-white transition"
//               >
//                 Bookmark
//               </button>
//             </div>
//           ))}
//         </div>
//         {searchLoading && <p className="text-gray-500 mt-2">Searching Google...</p>}
//       </section>
//     </div>
//   );
// }

// // app/search/page.tsx
// "use client";

// import React, { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// /**
//  * A page that calls /api/search (Google Custom Search),
//  * displays results, and allows bookmarking them.
//  */
// export default function GoogleSearchPage() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   // 1) Handle search by calling our serverless route
//   async function handleSearch() {
//     if (!query.trim()) return;
//     setLoading(true);
//     setResults([]);

//     const res = await fetch("/api/search", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query }),
//     });
//     const data = await res.json();

//     setLoading(false);

//     if (res.ok) {
//       // data.results.items typically has the actual results
//       // https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list
//       const items = data.results.items || [];
//       setResults(items);
//     } else {
//       alert(data.message || "Error performing Google Search");
//     }
//   }

//   // 2) Bookmark a search result: store in Supabase's "bookmarks" table
//   async function bookmark(title: string, link: string) {
//     const { error } = await supabase
//       .from("bookmarks")
//       .insert([{ title, url: link }]);

//     if (error) {
//       alert(error.message);
//     } else {
//       alert("Bookmarked!");
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Google Search</h1>
//       <div className="flex gap-2 mb-6">
//         <input
//           className="flex-1 border rounded px-3 py-2 focus:outline-none
//                      focus:border-brainstorm-primary"
//           placeholder="Search the web..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button
//           onClick={handleSearch}
//           disabled={loading}
//           className="px-4 py-2 bg-brainstorm-primary text-white rounded 
//                      hover:bg-indigo-600 transition disabled:opacity-50"
//         >
//           {loading ? "Searching..." : "Search"}
//         </button>
//       </div>

//       <div className="space-y-4">
//         {results.map((item, index) => (
//           <div key={index} className="p-3 border rounded">
//             <h3 className="text-lg font-semibold text-brainstorm-primary">
//               <a href={item.link} target="_blank" rel="noreferrer">
//                 {item.title}
//               </a>
//             </h3>
//             {/* snippet or snippet highlight */}
//             <p className="text-sm text-gray-700">{item.snippet}</p>
//             <button
//               onClick={() => bookmark(item.title, item.link)}
//               className="mt-2 text-sm px-3 py-1 border border-brainstorm-primary 
//                          text-brainstorm-primary rounded hover:bg-brainstorm-primary 
//                          hover:text-white transition"
//             >
//               Bookmark
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
