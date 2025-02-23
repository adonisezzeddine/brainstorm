// app/api/ai/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, content } = body;

    if (mode !== "summary" || !content) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    // Provide a prompt to summarize
    const prompt = `Summarize this text:\n\n${content}\n\nSummary:`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful note assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 100,
    });

    const summary = response.choices[0].message.content?.trim();
    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}




// // app/api/ai/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { mode, content } = body;

//     if (mode === "summary") {
//       // Basic ChatCompletion example:
//       const prompt = `Summarize this text:\n${content}\nSummary:`;

//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a helpful AI assistant." },
//           { role: "user", content: prompt },
//         ],
//         max_tokens: 100,
//       });

//       const summary = response.choices[0].message.content?.trim();
//       return NextResponse.json({ summary });
//     } else {
//       return NextResponse.json({ message: "Invalid mode" }, { status: 400 });
//     }
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
