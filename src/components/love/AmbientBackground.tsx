import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Floating background hearts, sparkles, glowing blobs.
// Keep counts modest — elegance over noise.

const HEARTS = 14;
const SPARKLES = 24;

export function AmbientBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Glowing blobs */}
      <motion.div
        className="absolute -top-20 -left-20 h-80 w-80 rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, var(--rose), transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-24 h-96 w-96 rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 left-1/4 h-80 w-80 rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(circle, var(--crimson), transparent 70%)" }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating hearts rising */}
      {Array.from({ length: HEARTS }).map((_, i) => {
        const left = (i * 97) % 100;
        const delay = (i * 1.7) % 12;
        const dur = 14 + (i % 6);
        const size = 12 + (i % 5) * 4;
        return (
          <span
            key={`h-${i}`}
            className="absolute bottom-[-40px] select-none"
            style={{
              left: `${left}%`,
              fontSize: size,
              color: "var(--crimson)",
              animation: `float-up ${dur}s linear ${delay}s infinite`,
              filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--rose) 60%, transparent))",
            }}
          >
            ❤
          </span>
        );
      })}

      {/* Twinkling sparkles */}
      {Array.from({ length: SPARKLES }).map((_, i) => {
        const top = (i * 53) % 100;
        const left = (i * 37) % 100;
        const delay = (i * 0.3) % 3;
        return (
          <span
            key={`s-${i}`}
            className="absolute animate-twinkle"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: 4,
              height: 4,
              borderRadius: "999px",
              background: i % 3 === 0 ? "var(--gold)" : "white",
              boxShadow: "0 0 8px currentColor",
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
