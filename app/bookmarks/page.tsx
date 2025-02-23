"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
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
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Bookmarks</h1>
      {loading && <p className="text-gray-500">Loading...</p>}
      {bookmarks.map((bm) => (
        <div key={bm.id} className="mb-4 border p-3 rounded">
          <h3 className="font-semibold text-brainstorm-primary">
            <a href={bm.url} target="_blank" rel="noreferrer">
              {bm.title || bm.url}
            </a>
          </h3>
          <p className="text-sm text-gray-600">{bm.url}</p>
        </div>
      ))}
      {!loading && bookmarks.length === 0 && (
        <p className="text-gray-500">No bookmarks yet.</p>
      )}
    </div>
  );
}
