"use client";
import { useEffect, useRef } from "react";
export default function ServiceWorkerRegistrar() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).then((reg) => {
        intervalRef.current = setInterval(() => { reg.update().catch(() => {}); }, 3600000);
      }).catch(() => {});
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);
  return null;
}
