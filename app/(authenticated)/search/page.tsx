"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Search as SearchIcon } from "lucide-react";

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
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loadingBookmarks, setLoadingBookmarks] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchBookmarks();
    }
  }, [session]);

  async function fetchBookmarks() {
    if (!session?.user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoadingBookmarks(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setSearchLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error("Search error:", error);
      alert("Error performing search. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  }

  async function addBookmark(title: string, url: string) {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .insert({
          title,
          url,
          user_id: session.user.id,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setBookmarks([data, ...bookmarks]);
      alert("Bookmark added successfully!");
    } catch (error) {
      console.error("Error adding bookmark:", error);
      alert("Error adding bookmark. Please try again.");
    }
  }

  // Handle loading state
  if (session === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-xl text-foreground">You must be logged in to view this page.</p>
        <Link href="/login" className="text-primary hover:text-primary/90 underline">
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          <h2 className="text-xl font-bold mb-4 text-white">My Bookmarks</h2>
          {loadingBookmarks && <p className="text-[#8B949E]">Loading bookmarks...</p>}
          {bookmarks.length > 0 ? (
            bookmarks.map((bm) => (
              <div key={bm.id} className="mb-3 border border-[var(--border)] p-4 rounded-lg bg-[var(--card)]">
                <h4 className="font-semibold text-[#58A6FF]">
                  <a href={bm.url} target="_blank" rel="noreferrer" className="hover:text-[#79B8FF]">
                    {bm.title}
                  </a>
                </h4>
                <p className="text-sm text-[#8B949E]">{bm.url}</p>
              </div>
            ))
          ) : (
            <p className="text-[#8B949E]">No bookmarks yet.</p>
          )}

          <h2 className="text-xl font-bold mb-4 text-white">Search the Web</h2>
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-[var(--card)] text-foreground border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search..."
            />
            <button
              type="submit"
              disabled={searchLoading}
              className="px-4 py-2 rounded-lg bg-[var(--accent)] text-foreground hover:bg-[var(--accent)]/80 disabled:opacity-50 flex items-center gap-2"
            >
              <SearchIcon className="w-5 h-5" />
              {searchLoading ? "Searching..." : "Search"}
            </button>
          </form>

          <div className="space-y-4">
            {searchResults.map((item, index) => (
              <div key={index} className="border border-[var(--border)] p-4 rounded-lg bg-[var(--card)]">
                <h3 className="text-lg font-semibold text-[#58A6FF]">
                  <a href={item.link} target="_blank" rel="noreferrer" className="hover:text-[#79B8FF]">
                    {item.title}
                  </a>
                </h3>
                <p className="text-sm text-[#8B949E] mt-2">{item.snippet}</p>
                <button
                  onClick={() => addBookmark(item.title, item.link)}
                  className="mt-3 text-sm px-3 py-1 border border-primary text-primary rounded-md hover:bg-primary hover:text-foreground transition-colors"
                >
                  Add to Bookmarks
                </button>
              </div>
            ))}
          </div>
          {searchLoading && <p className="text-[#8B949E] mt-2">Searching Google...</p>}
        </div>
      </div>
    </div>
  );
}
