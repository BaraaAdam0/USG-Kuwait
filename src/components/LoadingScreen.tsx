import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const holdMs = reducedMotion ? 400 : 1000;
    const fadeMs = reducedMotion ? 0 : 400;

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, fadeMs);
    }, holdMs);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-black tracking-tighter text-white"
              animate={{ opacity: [0.3, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: 0 }}
            >
              USG
            </motion.h1>
            <motion.p
              className="text-sm md:text-base font-bold tracking-[0.3em] text-white/60 uppercase mt-4 flex items-center justify-center gap-2"
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Kuwait
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_10px_2px_rgba(232,93,38,0.7)]" aria-hidden="true"></span>
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
