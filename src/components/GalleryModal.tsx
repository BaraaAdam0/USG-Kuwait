import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Project } from "../types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { useLanguage } from "../contexts/LanguageContext";

interface GalleryModalProps {
  project: Project;
  onClose: () => void;
}

// Letter-by-letter 3D reveal for the project title when the gallery opens
function LetterReveal({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = el.querySelectorAll<HTMLSpanElement>("[data-letter]");
    const tween = gsap.fromTo(
      letters,
      { opacity: 0, y: 14, rotateX: -70 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.5, ease: "power3.out", stagger: 0.035 }
    );
    return () => {
      tween.kill();
    };
  }, [text]);

  return (
    <span ref={ref} aria-label={text} role="text" style={{ perspective: "400px" }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          data-letter
          aria-hidden="true"
          className="inline-block will-change-transform"
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export default function GalleryModal({ project, onClose }: GalleryModalProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const images = project.images;
  const currentImage = images[currentIndex];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // min distance in px for swipe

    if (diffX > swipeThreshold) {
      // Swipe Left -> Next Image
      handleNext();
    } else if (diffX < -swipeThreshold) {
      // Swipe Right -> Prev Image
      handlePrev();
    }

    // Reset touch variables
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none transition-all duration-300">
      {/* Top Header Panel (Name & Photo category label) */}
      <div className="absolute top-0 left-0 w-full z-10 px-6 py-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between">
        <div className="text-white">
          <span className="text-white/40 font-bold text-[9px] uppercase tracking-[0.25em] block animate-fade-in-down">
            {t("gallery.label")}
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            <LetterReveal text={project.name} />
          </h3>
        </div>
        
        {/* Progress Tracker */}
        <div className="flex items-center space-x-6">
          <span className="text-[10px] font-mono text-white/50 tracking-widest">
            {currentIndex + 1} {t("gallery.of")} {images.length}
          </span>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-none border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
            aria-label="Close Gallery"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Large Image Container */}
      <div
        className="relative w-full h-full flex items-center justify-center px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Absolute Centered Motion Image Wrapper for seamless cinematic transition */}
        <div className="relative w-full h-[70vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentIndex}
              src={currentImage.url}
              alt={project.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute max-w-full max-h-full object-contain rounded-none shadow-2xl select-none border border-white/5 bg-black/40"
            />
          </AnimatePresence>
        </div>

        {/* Desktop Left navigation button */}
        <button
          onClick={handlePrev}
          className="absolute left-6 hidden md:flex items-center justify-center bg-white/5 hover:bg-white border border-white/10 hover:border-white text-white hover:text-charcoal-900 p-4 rounded-none transition-all duration-300 cursor-pointer z-20"
          aria-label="Previous Image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Desktop Right navigation button */}
        <button
          onClick={handleNext}
          className="absolute right-6 hidden md:flex items-center justify-center bg-white/5 hover:bg-white border border-white/10 hover:border-white text-white hover:text-charcoal-900 p-4 rounded-none transition-all duration-300 cursor-pointer z-20"
          aria-label="Next Image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Bar & Dots */}
      <div className="absolute bottom-6 left-0 w-full z-10 flex flex-col items-center space-y-4">
        {/* Indicators */}
        <div className="flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-none transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/25 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Small thumbnail preview bar for quick jump */}
        <div className="hidden sm:flex space-x-2 px-4 py-2 bg-charcoal-950/80 border border-white/5 rounded-none backdrop-blur-md max-w-lg overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-14 h-10 rounded-none overflow-hidden border transition-all duration-300 shrink-0 ${
                idx === currentIndex ? "border-white scale-105" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
