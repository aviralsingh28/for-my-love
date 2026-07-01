import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CONFIG } from "@/lib/love-config";

const STORAGE_KEY = "our-secret-unlocked-v1";

type Props = { onUnlock: () => void };

export function PasscodeLock({ onUnlock }: Props) {
  const [code, setCode] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) === "true") onUnlock();
  }, [onUnlock]);

  useEffect(() => {
    if (code.length !== 4) return;
    if (code === CONFIG.PASSCODE) {
      localStorage.setItem(STORAGE_KEY, "true");
      // heart explosion
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        shapes: ["circle"],
        colors: ["#FF4D6D", "#FF7AA2", "#FFD6E8", "#FFD166"],
        scalar: 1.1,
      });
      setTimeout(() => onUnlock(), 650);
    } else {
      setError("Oops... That's not our secret ❤️");
      setShake(true);
      setTimeout(() => {
        setCode("");
        setShake(false);
      }, 700);
      setTimeout(() => setError(null), 2000);
    }
  }, [code, onUnlock]);

  const press = (n: string) => {
    if (code.length >= 4) return;
    setCode((c) => c + n);
  };
  const del = () => setCode((c) => c.slice(0, -1));

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-sm rounded-3xl p-8 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full"
          style={{ background: "linear-gradient(135deg, var(--crimson), var(--rose))" }}
        >
          <span className="text-4xl">🔒</span>
        </motion.div>
        <h1 className="font-display text-2xl gradient-text">
          This little world belongs only to us
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter our secret to continue</p>

        <motion.div
          animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex justify-center gap-3"
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="grid h-12 w-12 place-items-center rounded-2xl border text-lg font-semibold"
              style={{
                borderColor: "color-mix(in oklab, var(--rose) 40%, transparent)",
                background: "color-mix(in oklab, white 40%, transparent)",
              }}
            >
              {code[i] ? "❤" : ""}
            </div>
          ))}
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-[color:var(--crimson)]"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {keys.map((k, i) =>
            k === "" ? (
              <div key={i} />
            ) : (
              <button
                key={i}
                onClick={() => (k === "⌫" ? del() : press(k))}
                className="h-14 rounded-2xl font-display text-xl transition active:scale-95"
                style={{
                  background:
                    k === "⌫"
                      ? "transparent"
                      : "linear-gradient(180deg, white, color-mix(in oklab, var(--blush) 60%, white))",
                  border: "1px solid color-mix(in oklab, var(--rose) 30%, transparent)",
                  color: "var(--foreground)",
                  boxShadow: "0 6px 20px -8px color-mix(in oklab, var(--rose) 60%, transparent)",
                }}
              >
                {k}
              </button>
            )
          )}
        </div>

        <p className="mt-6 font-script text-sm text-muted-foreground">
          Hint: a very important date 🎂
        </p>
      </motion.div>
    </div>
  );
}
