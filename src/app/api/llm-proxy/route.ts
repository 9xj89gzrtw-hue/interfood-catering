import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Multi-LLM proxy API route.
 * Runs on Vercel from Washington DC (iad1) — bypasses sandbox geo-blocks.
 * Calls multiple LLMs in parallel and returns aggregated responses.
 *
 * POST /api/llm-proxy
 * Body: { prompt: string, models?: string[], imageBase64?: string }
 * Returns: { results: { model: string, content: string, ok: boolean }[] }
 */

type ModelResult = { model: string; content: string; ok: boolean; error?: string };

async function callOpenAI(prompt: string, imageBase64?: string): Promise<string> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not set");
  const content = imageBase64
    ? [
        { type: "text", text: prompt },
        { type: "image_url", image_url: { url: `data:image/png;base64,${imageBase64}` } },
      ]
    : prompt;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content }],
      max_tokens: 800,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const d = await res.json();
  return d.choices[0].message.content;
}

async function callGroq(prompt: string): Promise<string> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY not set");
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
    }),
  });
  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
  const d = await res.json();
  return d.choices[0].message.content;
}

async function callDeepSeek(prompt: string): Promise<string> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new Error("DEEPSEEK_API_KEY not set");
  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek ${res.status}: ${await res.text()}`);
  const d = await res.json();
  return d.choices[0].message.content;
}

async function callOpenRouter(prompt: string): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY not set");
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "meta-llama/llama-3.3-70b-instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
    }),
  });
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);
  const d = await res.json();
  return d.choices[0].message.content;
}

async function callGoogle(prompt: string, imageBase64?: string): Promise<string> {
  const key = process.env.GOOGLE_AI_KEY;
  if (!key) throw new Error("GOOGLE_AI_KEY not set");
  const parts: any[] = [{ text: prompt }];
  if (imageBase64) {
    parts.push({ inline_data: { mime_type: "image/png", data: imageBase64 } });
  }
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts }] }),
    }
  );
  if (!res.ok) throw new Error(`Google ${res.status}: ${await res.text()}`);
  const d = await res.json();
  return d.candidates[0].content.parts[0].text;
}

const MODELS: Record<string, (p: string, img?: string) => Promise<string>> = {
  openai: callOpenAI,
  groq: callGroq,
  deepseek: callDeepSeek,
  openrouter: callOpenRouter,
  google: callGoogle,
};

export async function POST(req: NextRequest) {
  try {
    const { prompt, models, imageBase64 } = await req.json();
    if (!prompt) return NextResponse.json({ error: "prompt required" }, { status: 400 });

    const targetModels = models && models.length > 0 ? models : Object.keys(MODELS);
    const results: ModelResult[] = await Promise.all(
      targetModels.map(async (m: string) => {
        try {
          const fn = MODELS[m];
          if (!fn) return { model: m, content: "", ok: false, error: "unknown model" };
          const content = await fn(prompt, imageBase64);
          return { model: m, content, ok: true };
        } catch (e: any) {
          return { model: m, content: "", ok: false, error: e.message };
        }
      })
    );

    return NextResponse.json({ results, ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, ok: false }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    models: Object.keys(MODELS),
    region: "Vercel serverless (iad1 = Washington DC, USA)",
    note: "This proxy runs from US region to bypass geo-blocks on AI APIs",
  });
}
