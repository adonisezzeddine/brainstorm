// app/api/ai/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

/**
 * Configure OpenAI with your key.
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/**
 * Shape of each chat message sent to the OpenAI API.
 */
type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

/**
 * Minimal type describing the shape of the response
 * from openai.chat.completions.create()
 *   - We only define what we actually use here (choices -> message -> content).
 */
type ChatChoice = {
  message: {
    content?: string | null;
  };
};

type ChatCompletionsResponse = {
  choices: ChatChoice[];
};

/**
 * Final AI Response shape you return to the client.
 */
type AIResponse = {
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    // 1) Read the JSON body. We'll cast it to ChatMessage[].
    const body = await request.json();
    const messages = body as ChatMessage[];

    // 2) Call OpenAI with strongly typed messages.
    //    We'll also cast the response to a known shape.
    const completion = (await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    })) as ChatCompletionsResponse;

    // 3) Extract the text from completion.choices
    const content = completion.choices[0]?.message.content ?? "";

    // 4) Build typed response
    const response: AIResponse = {
      message: content,
    };

    // 5) Return JSON using NextResponse
    return NextResponse.json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
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

//     if (mode !== "summary" || !content) {
//       return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
//     }

//     // Provide a prompt to summarize
//     const prompt = `Summarize this text:\n\n${content}\n\nSummary:`;

//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful note assistant." },
//         { role: "user", content: prompt },
//       ],
//       max_tokens: 100,
//     });

//     const summary = response.choices[0].message.content?.trim();
//     return NextResponse.json({ summary });
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }




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
