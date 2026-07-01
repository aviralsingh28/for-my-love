import { useEffect, useState } from "react";

// Cursor heart trail (desktop only). Coarse pointers -> no-op.
export function CursorHeartTrail() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let id = 0;
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 60) return;
      last = now;
      const nid = id++;
      setHearts((h) => [...h.slice(-14), { id: nid, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setHearts((h) => h.filter((p) => p.id !== nid)), 900);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-sm"
          style={{
            left: h.x,
            top: h.y,
            color: "var(--crimson)",
            animation: "float-up 0.9s ease-out forwards",
            filter: "drop-shadow(0 0 4px var(--rose))",
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
