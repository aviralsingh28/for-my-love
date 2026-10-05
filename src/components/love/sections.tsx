import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { CONFIG, REASONS } from "@/lib/love-config";

// -------- shared helpers --------
function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}
function useElapsed(from: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, now.getTime() - from.getTime());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mb-6 text-center"
    >
      {eyebrow && (
        <p className="font-script text-lg text-[color:var(--crimson)]">{eyebrow}</p>
      )}
      <h2 className="mt-1 font-display text-3xl gradient-text sm:text-4xl">{title}</h2>
    </motion.div>
  );
}

// -------- HERO --------
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  return (
    <section ref={ref} className="relative overflow-hidden px-5 pt-10 pb-20">
      <motion.div style={{ y }} className="relative mx-auto max-w-[420px]">
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] glass"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={CONFIG.HERO_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 30%, color-mix(in oklab, var(--crimson) 60%, transparent))",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="font-script text-2xl drop-shadow">for {CONFIG.HER_NAME}</p>
            <h1 className="mt-1 font-display text-3xl leading-tight drop-shadow">
              Every moment with you is my favorite story.
            </h1>
          </div>

          {/* floating hearts */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              style={{ left: `${10 + i * 18}%`, bottom: -10, color: "var(--blush)" }}
              animate={{ y: [-10, -80, -160], opacity: [0, 1, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
            >
              ❤
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mt-8 flex flex-col items-center gap-2 text-sm text-muted-foreground"
      >
        <span>scroll for our story</span>
        <span className="text-lg">↓</span>
      </motion.div>
    </section>
  );
}

// -------- LOVE COUNTER --------
export function LoveCounter() {
  const start = useMemo(() => new Date(CONFIG.RELATIONSHIP_START), []);
  const { days, hours, minutes, seconds } = useElapsed(start);
  const cells = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-[420px]">
        <SectionTitle eyebrow="together" title="We've been creating beautiful memories for…" />
        <div className="grid grid-cols-4 gap-2">
          {cells.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-3 text-center"
            >
              <div className="font-display text-2xl gradient-text tabular-nums">
                {String(c.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                {c.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------- PHOTO MEMORIES --------
export function PhotoGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

  const burst = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.3 },
      colors: ["#FF4D6D", "#FF7AA2", "#FFD6E8", "#FFD166"],
      scalar: 0.9,
    });
  };

  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-[420px]">
        <SectionTitle eyebrow="frozen moments" title="Photo Memories" />
        <div className="grid grid-cols-2 gap-3">
          {CONFIG.PHOTOS.map((p, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -4, rotate: i % 2 ? 1 : -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setOpen(i);
                burst();
              }}
              className="glass overflow-hidden rounded-2xl p-2 text-left"
              style={{ boxShadow: "0 10px 30px -12px color-mix(in oklab, var(--rose) 50%, transparent)" }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[color:var(--blush)]">
                {isVideo(p.src) ? (
                  <video
                    src={p.src}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={p.src}
                    alt={p.caption}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <p className="mt-2 truncate font-script text-sm text-[color:var(--crimson)]">{p.caption}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-6"
            onClick={() => setOpen(null)}
          >
            {isVideo(CONFIG.PHOTOS[open].src) ? (
              <motion.video
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={CONFIG.PHOTOS[open].src}
                aria-label={CONFIG.PHOTOS[open].caption}
                className="max-h-[80vh] max-w-full rounded-2xl shadow-2xl"
                controls
                autoPlay
                playsInline
                onClick={(event) => event.stopPropagation()}
              />
            ) : (
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={CONFIG.PHOTOS[open].src}
                alt={CONFIG.PHOTOS[open].caption}
                className="max-h-[80vh] max-w-full rounded-2xl shadow-2xl"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// -------- TIMELINE --------
export function Timeline() {
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-[420px]">
        <SectionTitle eyebrow="our story" title="A Little Timeline" />
        <div className="relative pl-6">
          <div
            className="absolute left-2 top-0 h-full w-[2px] rounded-full"
            style={{ background: "linear-gradient(var(--crimson), var(--rose), var(--gold))" }}
          />
          {CONFIG.TIMELINE.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative mb-4 last:mb-0"
            >
              <span
                className="absolute -left-[22px] top-4 grid h-5 w-5 place-items-center rounded-full text-[10px]"
                style={{ background: "var(--crimson)", color: "white" }}
              >
                ❤
              </span>
              <div className="glass rounded-2xl p-4">
                <div className="font-display text-lg">
                  <span className="mr-2">{t.icon}</span>
                  {t.title}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------- LOVE NOTES --------
export function LoveNotes() {
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-[420px]">
        <SectionTitle eyebrow="little thoughts" title="Love Notes" />
        <div className="space-y-3">
          {CONFIG.LOVE_NOTES.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              animate={{ y: [0, -4, 0] }}
              {...({} as object)}
              className="glass rounded-2xl px-5 py-4 text-center font-display text-lg"
              style={{ animation: `float-up 0s`, transform: "translateY(0)" }}
            >
              <motion.p
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
              >
                "{n}"
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------- 100 REASONS --------
export function Reasons() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-[420px]">
        <SectionTitle eyebrow="tap to reveal" title="100 Reasons Why I Love You" />
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {REASONS.map((r, i) => {
            const isFlipped = flipped[i];
            return (
              <button
                key={i}
                onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
                className="relative aspect-square [perspective:800px]"
                aria-label={`Reason ${i + 1}`}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.55 }}
                  className="relative h-full w-full [transform-style:preserve-3d]"
                >
                  <div
                    className="absolute inset-0 grid place-items-center rounded-xl font-display text-sm text-white [backface-visibility:hidden]"
                    style={{ background: "linear-gradient(135deg, var(--crimson), var(--rose))" }}
                  >
                    {i + 1}
                  </div>
                  <div
                    className="absolute inset-0 grid place-items-center overflow-hidden rounded-xl p-1 text-center text-[10px] leading-tight [backface-visibility:hidden] [transform:rotateY(180deg)] glass"
                  >
                    <span>{r}</span>
                  </div>
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -------- MUSIC PLAYER --------
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch {
      setAvailable(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
      <div className="glass flex items-center gap-3 rounded-full px-4 py-2">
        <button
          onClick={toggle}
          className="grid h-10 w-10 place-items-center rounded-full text-white"
          style={{ background: "linear-gradient(135deg, var(--crimson), var(--rose))" }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "⏸" : "▶"}
        </button>
        <div className="min-w-0">
          <div className="truncate font-display text-sm">{CONFIG.MUSIC_TITLE}</div>
          <div className="flex items-end gap-0.5 h-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full"
                style={{ background: "var(--crimson)" }}
                animate={playing ? { height: ["30%", "100%", "40%", "80%", "30%"] } : { height: "20%" }}
                transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
        <audio
          ref={audioRef}
          src={CONFIG.MUSIC_SRC}
          loop
          onError={() => setAvailable(false)}
          onEnded={() => setPlaying(false)}
        />
      </div>
      {!available && (
        <div className="mt-1 text-center text-[10px] text-muted-foreground">
          add /public{CONFIG.MUSIC_SRC}
        </div>
      )}
    </div>
  );
}

// -------- LETTER (typing) --------
export function Letter() {
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);
  const full = CONFIG.LETTER;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.35 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const step = () => {
      i += 2;
      setText(full.slice(0, i));
      if (i < full.length) setTimeout(step, 18);
    };
    step();
  }, [started, full]);

  return (
    <section ref={ref} className="px-5 py-14">
      <div className="mx-auto max-w-[420px]">
        <SectionTitle eyebrow="from me, forever" title="A Letter To My Love" />
        <motion.div
          initial={{ opacity: 0, rotate: -1 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          className="paper p-6"
        >
          <p className="font-script text-2xl text-[color:var(--crimson)]">To My Love,</p>
          <pre className="mt-3 whitespace-pre-wrap font-display text-[15px] leading-[32px] text-[oklch(0.3_0.07_10)]">
            {text}
            {started && text.length < full.length && <span className="opacity-60">▍</span>}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}

// -------- 20 OCTOBER SPECIAL --------
function nextBirthday() {
  const now = new Date();
  const y = now.getFullYear();
  let d = new Date(y, CONFIG.BIRTHDAY_MONTH - 1, CONFIG.BIRTHDAY_DAY, 0, 0, 0);
  if (d.getTime() < now.getTime() - 86400000) d = new Date(y + 1, CONFIG.BIRTHDAY_MONTH - 1, CONFIG.BIRTHDAY_DAY);
  return d;
}
function isBirthdayToday() {
  const n = new Date();
  return n.getMonth() + 1 === CONFIG.BIRTHDAY_MONTH && n.getDate() === CONFIG.BIRTHDAY_DAY;
}

export function BirthdaySection() {
  const target = useMemo(() => nextBirthday(), []);
  const { days, hours, minutes, seconds } = useCountdown(target);
  const today = isBirthdayToday();

  useEffect(() => {
    if (!today) return;
    const fire = () => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.3 },
        colors: ["#FF4D6D", "#FF7AA2", "#FFD6E8", "#FFD166"],
      });
    };
    fire();
    const t = setInterval(fire, 2500);
    return () => clearInterval(t);
  }, [today]);

  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-[420px]">
        <SectionTitle eyebrow="the best day" title="20 October ❤️" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 text-center"
        >
          <p className="text-sm text-muted-foreground">The day the world became more beautiful.</p>

          {/* balloons */}
          <div className="relative mx-auto mt-4 h-40 w-full">
            {["🎈", "🎈", "🎈", "🎂", "🎈"].map((e, i) => (
              <motion.span
                key={i}
                className="absolute text-4xl"
                style={{ left: `${10 + i * 18}%`, bottom: 0 }}
                animate={{ y: [-4, -14, -4] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              >
                {e}
              </motion.span>
            ))}
          </div>

          {today ? (
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="mt-4 font-display text-2xl gradient-text"
            >
              Happy Birthday My Love ❤️
            </motion.p>
          ) : (
            <>
              <p className="mt-3 text-sm text-muted-foreground">Counting down…</p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[
                  { l: "D", v: days },
                  { l: "H", v: hours },
                  { l: "M", v: minutes },
                  { l: "S", v: seconds },
                ].map((c) => (
                  <div key={c.l} className="rounded-xl bg-white/40 p-2 dark:bg-white/10">
                    <div className="font-display text-xl gradient-text tabular-nums">
                      {String(c.v).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{c.l}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// -------- DREAMS --------
export function Dreams() {
  const [checked, setChecked] = useState<boolean[]>(() => CONFIG.DREAMS.map(() => false));
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-[420px]">
        <SectionTitle eyebrow="one day, together" title="Our Little Dreams" />
        <div className="glass space-y-2 rounded-3xl p-4">
          {CONFIG.DREAMS.map((d, i) => (
            <button
              key={i}
              onClick={() =>
                setChecked((c) => {
                  const n = [...c];
                  n[i] = !n[i];
                  return n;
                })
              }
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-white/40"
            >
              <motion.span
                className="grid h-6 w-6 place-items-center rounded-md border text-white"
                style={{
                  borderColor: "var(--rose)",
                  background: checked[i] ? "linear-gradient(135deg, var(--crimson), var(--rose))" : "transparent",
                }}
                animate={{ scale: checked[i] ? [1, 1.3, 1] : 1 }}
              >
                {checked[i] && "✓"}
              </motion.span>
              <span className={checked[i] ? "line-through opacity-60" : ""}>{d}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------- PROMISES --------
export function Promises() {
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-[420px]">
        <SectionTitle eyebrow="my word" title="Promises" />
        <div className="grid gap-3">
          {CONFIG.PROMISES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-4 font-display text-lg"
            >
              <span className="mr-2 text-[color:var(--crimson)]">✦</span>
              {p}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------- OUR FUTURE --------
export function OurFuture() {
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-[420px]">
        <SectionTitle eyebrow="ahead of us" title="Our Forever" />
        <div className="relative h-64 overflow-hidden rounded-3xl glass">
          {/* Moon */}
          <div
            className="absolute right-6 top-6 h-16 w-16 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, #fff8e7, #ffd166 80%)",
              boxShadow: "0 0 40px #ffd16688",
            }}
          />
          {/* stars */}
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-[3px] w-[3px] rounded-full bg-white animate-twinkle"
              style={{
                top: `${(i * 13) % 70}%`,
                left: `${(i * 27) % 100}%`,
                animationDelay: `${(i * 0.2) % 3}s`,
              }}
            />
          ))}
          {/* clouds */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute h-10 w-32 rounded-full blur-xl opacity-70"
              style={{
                background: "white",
                top: `${20 + i * 20}%`,
                left: `-30%`,
              }}
              animate={{ x: ["0%", "230%"] }}
              transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "linear", delay: i * 3 }}
            />
          ))}
          {/* lanterns */}
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              style={{ left: `${15 + i * 20}%`, bottom: 0 }}
              animate={{ y: [0, -260], opacity: [0, 1, 0] }}
              transition={{ duration: 10 + i, repeat: Infinity, delay: i * 2.2, ease: "easeOut" }}
            >
              🏮
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------- SURPRISE BUTTON --------
export function SurpriseButton() {
  const [msg, setMsg] = useState<string | null>(null);
  const pop = () => {
    const m = CONFIG.SURPRISES[Math.floor(Math.random() * CONFIG.SURPRISES.length)];
    setMsg(m);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x: 0.9, y: 0.9 },
      colors: ["#FF4D6D", "#FF7AA2", "#FFD6E8", "#FFD166"],
      scalar: 0.9,
    });
    setTimeout(() => setMsg(null), 3200);
  };

  return (
    <>
      <motion.button
        onClick={pop}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
        className="btn-heart fixed bottom-24 right-5 z-40 rounded-full px-4 py-3 font-display text-sm shadow-lg"
      >
        Tap Me ❤️
      </motion.button>
      <AnimatePresence>
        {msg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-40 right-5 z-40 max-w-[260px] rounded-2xl glass px-4 py-3 text-sm shadow-lg"
          >
            {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// -------- ENDING + FOOTER --------
export function Ending() {
  return (
    <section className="px-5 pt-14 pb-6">
      <div className="mx-auto max-w-[420px] text-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto grid h-24 w-24 place-items-center rounded-full text-5xl"
          style={{
            background: "radial-gradient(circle at 30% 30%, #fff, var(--crimson))",
            boxShadow: "0 0 60px var(--crimson)",
          }}
        >
          ❤
        </motion.div>
        <h2 className="mt-6 font-display text-3xl leading-tight gradient-text">
          I Loved You Yesterday.<br />I Love You Today.<br />I'll Love You Forever.
        </h2>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-5 pb-28 pt-6 text-center text-xs text-muted-foreground">
      Made with <span className="text-[color:var(--crimson)]">❤</span> only for you.
    </footer>
  );
}
