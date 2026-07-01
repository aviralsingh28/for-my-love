import { motion } from "framer-motion";

type Props = { onOpen: () => void };

export function WelcomeScreen({ onOpen }: Props) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-script text-2xl text-[color:var(--crimson)]"
        >
          for you, only you
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-3 font-display text-5xl leading-tight sm:text-6xl gradient-text"
        >
          Welcome My Love ❤️
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-4 text-base text-muted-foreground"
        >
          I made this little world only for you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onOpen}
          className="btn-heart mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 font-display text-lg"
        >
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.span>
          Open Our Story
        </motion.button>
      </div>
    </div>
  );
}
