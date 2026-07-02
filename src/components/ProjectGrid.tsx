import React, { useLayoutEffect, useRef, ReactNode } from "react";
import { Project } from "../types";
import { Maximize2, FileText, Compass } from "lucide-react";
import gsap from "gsap";
import { useLanguage } from "../contexts/LanguageContext";

interface ProjectGridProps {
  projects: Project[];
  onOpenGallery: (projectId: string) => void;
  onViewDetails: (projectId: string) => void;
}

const MAX_TILT = 6; // degrees — subtle 3D lean toward the cursor

function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  key?: React.Key;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { transformPerspective: 900 });
    const rotX = gsap.quickTo(el, "rotationX", { duration: 0.45, ease: "power2.out" });
    const rotY = gsap.quickTo(el, "rotationY", { duration: 0.45, ease: "power2.out" });
    const lift = gsap.quickTo(el, "y", { duration: 0.4, ease: "power2.out" });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotY(px * MAX_TILT);
      rotX(-py * MAX_TILT);
      lift(-8);
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
      lift(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

export default function ProjectGrid({ projects, onOpenGallery, onViewDetails }: ProjectGridProps) {
  const { t } = useLanguage();
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-20" id="projects">
      <div className="text-center mb-16">
        <span className="text-white/40 font-bold tracking-[0.3em] text-[10px] uppercase block mb-3">
          {t("grid.label")}
        </span>
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
          {t("grid.title")}
        </h2>
        <div className="w-12 h-[1px] bg-white/20 mx-auto mt-6"></div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-charcoal-850 rounded-none border border-white/5">
          <Compass className="h-10 w-10 text-white/40 mx-auto mb-4" />
          <p className="text-white/60 text-xs tracking-widest uppercase">
            {t("grid.empty")}
          </p>
          <p className="text-white/30 text-[10px] uppercase tracking-wider mt-2">
            {t("grid.empty.sub")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <TiltCard
              key={project.id}
              className="group relative h-[420px] rounded-none overflow-hidden bg-charcoal-950 border border-white/5 shadow-2xl cursor-pointer"
            >
              {/* Lazy loaded image */}
              <img
                src={project.coverImage}
                alt={project.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out brightness-75 group-hover:brightness-50"
              />

              {/* Top Details Action Badge */}
              <div className="absolute top-4 right-4 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(project.id);
                  }}
                  className="bg-charcoal-900 border border-white/10 text-white hover:bg-white hover:text-charcoal-900 p-2.5 rounded-none transition-all duration-300"
                  title="View Design Details"
                >
                  <FileText className="h-4 w-4" />
                </button>
              </div>

              {/* Direct Gallery triggers whole card click */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent"
                onClick={() => onOpenGallery(project.id)}
              >
                {/* Visual Cue for gallery action on hover */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center pointer-events-none">
                  <div className="bg-white text-charcoal-900 p-4 rounded-none shadow-xl">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-white mt-3 bg-charcoal-900/90 px-3 py-1 border border-white/10">
                    {t("grid.launch")}
                  </span>
                </div>

                {/* Overlaid texts matching Artistic Flair */}
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-white/50 text-[9px] font-bold tracking-[0.2em] uppercase mb-1.5">
                    <span>{project.category}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 uppercase hover:-translate-y-1 transition-transform duration-300">
                    {project.name}
                  </h3>
                  <p className="text-white/70 text-xs font-light tracking-wide max-w-md line-clamp-1">
                    {project.subtitle}
                  </p>

                  <div className="mt-4 flex items-center space-x-2 text-white/50 text-[9px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>{t("grid.explore")}</span>
                    <span>•</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(project.id);
                      }}
                      className="hover:underline hover:text-white"
                    >
                      {t("grid.spec")}
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      )}
    </div>
  );
}
