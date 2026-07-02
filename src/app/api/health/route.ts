import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Health-check endpoint for watchdog & Caddy monitoring.
 * Returns 200 + JSON if the app is alive and can serve requests.
 */
export async function GET() {
  const started = globalThis.__NEXT_STARTED_AT__ ?? Date.now();
  const uptime = Math.floor((Date.now() - started) / 1000);

  return NextResponse.json(
    {
      status: "ok",
      service: "interfood-catering",
      version: "3.0.0",
      uptime_seconds: uptime,
      timestamp: new Date().toISOString(),
      routes: [
        "/",
        "/services",
        "/menu",
        "/contacts",
        "/about",
        "/wedding",
        "/corporate",
        "/faq",
        "/reviews",
        "/gallery",
        "/calculator",
        "/blog",
        "/team",
        "/venues",
        "/privacy",
        "/terms",
        "/quiz",
      ],
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Health-Check": "pass",
      },
    }
  );
}

// Mark app start time
if (!globalThis.__NEXT_STARTED_AT__) {
  globalThis.__NEXT_STARTED_AT__ = Date.now();
}
