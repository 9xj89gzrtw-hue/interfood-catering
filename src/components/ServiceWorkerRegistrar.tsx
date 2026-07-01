"use client";
import { useEffect } from "react";
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).then((reg) => {
        const interval = setInterval(() => { reg.update().catch(() => {}); }, 3600000);
        return () => clearInterval(interval);
      }).catch(() => {});
    }
  }, []);
  return null;
}
