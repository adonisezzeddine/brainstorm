"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Bookmark as BookmarkIcon, Trash2 } from "lucide-react";

type Bookmark = {
  id: string;
  user_id: string;
  url: string;
  title: string;
  created_at: string;
};

export default function BookmarksPage() {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

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
      alert("Error loading bookmarks. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteBookmark(id: string) {
    if (!confirm("Are you sure you want to delete this bookmark?")) return;

    try {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setBookmarks(bookmarks.filter(bm => bm.id !== id));
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      alert("Error deleting bookmark. Please try again.");
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8B949E]">Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">My Bookmarks</h1>
          </div>

          {bookmarks.length === 0 ? (
            <p className="text-[#8B949E]">No bookmarks yet. Add some from the search page!</p>
          ) : (
            <div className="grid gap-4">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="border border-[var(--border)] p-4 rounded-lg bg-[var(--card)]"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-[#58A6FF]">
                        <a
                          href={bookmark.url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[#79B8FF]"
                        >
                          {bookmark.title}
                        </a>
                      </h3>
                      <p className="text-sm text-[#8B949E] mt-1">{bookmark.url}</p>
                      <p className="text-xs text-[#8B949E] mt-2">
                        Added {new Date(bookmark.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteBookmark(bookmark.id)}
                      className="p-1.5 text-[#8B949E] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
