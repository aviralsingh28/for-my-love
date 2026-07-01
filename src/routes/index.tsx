import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { AmbientBackground } from "@/components/love/AmbientBackground";
import { CursorHeartTrail } from "@/components/love/CursorHeartTrail";
import { LoadingScreen } from "@/components/love/LoadingScreen";
import { WelcomeScreen } from "@/components/love/WelcomeScreen";
import { PasscodeLock } from "@/components/love/PasscodeLock";
import {
  Hero,
  LoveCounter,
  PhotoGallery,
  Timeline,
  LoveNotes,
  Reasons,
  MusicPlayer,
  Letter,
  BirthdaySection,
  Dreams,
  Promises,
  OurFuture,
  SurpriseButton,
  Ending,
  Footer,
} from "@/components/love/sections";

export const Route = createFileRoute("/")({
  component: Index,
});

type Stage = "loading" | "welcome" | "lock" | "app";

function Index() {
  const [stage, setStage] = useState<Stage>("loading");

  // brief loading, then decide starting stage
  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window !== "undefined" && localStorage.getItem("our-secret-unlocked-v1") === "true") {
        setStage("app");
      } else {
        setStage("welcome");
      }
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <CursorHeartTrail />

      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <LoadingScreen />
          </motion.div>
        )}
        {stage === "welcome" && (
          <motion.div key="welcome" exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.6 }}>
            <WelcomeScreen onOpen={() => setStage("lock")} />
          </motion.div>
        )}
        {stage === "lock" && (
          <motion.div key="lock" exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.5 }}>
            <PasscodeLock onUnlock={() => setStage("app")} />
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "app" && (
        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Hero />
          <LoveCounter />
          <PhotoGallery />
          <Timeline />
          <LoveNotes />
          <Reasons />
          <Letter />
          <BirthdaySection />
          <Dreams />
          <Promises />
          <OurFuture />
          <Ending />
          <Footer />

          <MusicPlayer />
          <SurpriseButton />
        </motion.main>
      )}
    </div>
  );
}
