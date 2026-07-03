// Watchdog Mini-service: Monitors Next.js dev server and restarts if needed
// Uses the system's init-fullstack.sh for reliable process management

import { execSync } from "child_process";

const PORT = 3000;
const CHECK_INTERVAL = 30_000; // Check every 30 seconds
const RESTART_COOLDOWN = 60_000; // Wait 60s between restarts

let lastRestart = 0;

async function isServerAlive(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`http://localhost:${PORT}/`, { signal: controller.signal });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
}

async function restartServer(): Promise<void> {
  const now = Date.now();
  if (now - lastRestart < RESTART_COOLDOWN) {
    console.log(`[watchdog] Cooldown active, skipping restart`);
    return;
  }
  lastRestart = now;

  console.log(`[watchdog] 🔴 Server is down! Restarting via init-fullstack.sh...`);

  try {
    execSync("curl -s https://z-cdn.chatglm.cn/fullstack/init-fullstack.sh | bash", {
      cwd: "/home/z/my-project",
      timeout: 120000,
      stdio: "pipe",
    });
    console.log(`[watchdog] ✅ Init script executed`);

    // Wait for server to be ready
    for (let i = 0; i < 30; i++) {
      if (await isServerAlive()) {
        console.log(`[watchdog] ✅ Server is back online!`);
        return;
      }
      await new Promise((r) => setTimeout(r, 2000));
    }
    console.error(`[watchdog] ❌ Server still not responding after restart`);
  } catch (err) {
    console.error(`[watchdog] ❌ Restart failed:`, err);
  }
}

async function watchdog() {
  console.log(`[watchdog] Starting — checking every ${CHECK_INTERVAL / 1000}s...`);

  while (true) {
    const alive = await isServerAlive();
    const ts = new Date().toISOString().slice(11, 19);
    if (alive) {
      console.log(`[watchdog] ${ts} ✓ OK`);
    } else {
      console.log(`[watchdog] ${ts} ✗ DOWN`);
      await restartServer();
    }
    await new Promise((r) => setTimeout(r, CHECK_INTERVAL));
  }
}

watchdog().catch(console.error);
