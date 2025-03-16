"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type Bookmark = {
  id: number;
  title: string;
  url: string;
  created_at: string;
};

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  async function fetchBookmarks() {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setBookmarks(data || []);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Bookmarks</h2>
      {loading && <p className="text-gray-500">Loading bookmarks...</p>}
      {bookmarks.length > 0 ? (
        bookmarks.map((bm) => (
          <div key={bm.id} className="mb-3 border p-3 rounded shadow-sm">
            <h4 className="font-semibold text-brainstorm-primary">
              <Link href={bm.url} target="_blank" rel="noreferrer">
                {bm.title || bm.url}
              </Link>
            </h4>
            <p className="text-sm text-gray-500">{bm.url}</p>
          </div>
        ))
      ) : (
        !loading && <p className="text-gray-500">No bookmarks yet.</p>
      )}
    </div>
  );
}
