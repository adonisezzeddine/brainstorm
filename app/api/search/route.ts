// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1) Read body, expecting { query: "some user input" }
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ message: "No query provided" }, { status: 400 });
    }

    // 2) Load from environment variables
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const cx = process.env.GOOGLE_SEARCH_CX;
    if (!apiKey || !cx) {
      return NextResponse.json(
        { message: "Google Search credentials not set" },
        { status: 500 }
      );
    }

    // 3) Construct the Google CSE endpoint
    const url =
      "https://www.googleapis.com/customsearch/v1" +
      `?q=${encodeURIComponent(query)}` +
      `&key=${apiKey}` +
      `&cx=${cx}`;

    // 4) Call Google
    const googleRes = await fetch(url);
    if (!googleRes.ok) {
      return NextResponse.json({ message: "Search API error" }, { status: 500 });
    }

    // 5) Parse JSON from Google
    const data = await googleRes.json();

    // data.items typically holds the search results
    return NextResponse.json({ results: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
