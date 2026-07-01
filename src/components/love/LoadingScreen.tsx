import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center">
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full text-4xl text-white"
          style={{
            background: "linear-gradient(135deg, var(--crimson), var(--rose))",
            boxShadow: "0 0 60px var(--rose)",
          }}
        >
          ❤
        </motion.div>
        <p className="mt-4 font-script text-xl text-[color:var(--crimson)]">preparing something for you…</p>
      </div>
    </div>
  );
}
