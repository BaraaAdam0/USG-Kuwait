import React from "react";
import { Project } from "../types";
import { Phone, MessageCircle, ArrowLeft, Maximize2, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface ProjectDetailProps {
  project: Project;
  allProjects: Project[];
  onBack: () => void;
  onNavigateToProject: (projectId: string) => void;
  onOpenGallery: (projectId: string) => void;
}

export default function ProjectDetail({
  project,
  allProjects,
  onBack,
  onNavigateToProject,
  onOpenGallery,
}: ProjectDetailProps) {
  const { t } = useLanguage();
  // Get 3 related projects (excluding the current one)
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-charcoal-800 text-white pt-24 pb-12 flex flex-col">
      {/* Back button header */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-[10px] uppercase font-bold tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t("detail.back")}</span>
        </button>
      </div>

      {/* Main Split Layout: 75% Left, 25% Right */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel: Large Photo (approx 75% width, so cols-1 to lg:col-span-3) */}
        <div className="lg:col-span-3 relative rounded-none overflow-hidden group shadow-2xl h-[550px] lg:h-[650px] bg-charcoal-950 border border-white/5">
          <img
            src={project.coverImage}
            alt={project.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.5] group-hover:brightness-[0.4] group-hover:scale-[1.01] transition-all duration-700 ease-out"
          />

          {/* Interactive Cue: Hovering anywhere on the main photo displays gallery trigger */}
          <div
            onClick={() => onOpenGallery(project.id)}
            className="absolute inset-0 cursor-zoom-in flex flex-col justify-between p-8 sm:p-12"
          >
            {/* Top Info Tag */}
            <div className="flex items-center justify-between">
              <span className="bg-charcoal-900 border border-white/10 px-4 py-1.5 rounded-none text-[9px] font-bold tracking-[0.2em] uppercase text-white/90">
                {project.category}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGallery(project.id);
                }}
                className="bg-white text-charcoal-900 hover:bg-white/90 p-3 rounded-none flex items-center justify-center shadow-lg transition-all duration-300 pointer-events-auto cursor-pointer"
                title="Open Gallery"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>

            {/* Middle project info */}
            <div className="max-w-2xl relative z-10">
              <p className="text-white font-bold text-[10px] tracking-[0.3em] uppercase mb-1.5">
                {project.name} · {project.location}
              </p>
              <p className="text-white/75 text-xs sm:text-sm font-light max-w-lg tracking-wide leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            {/* Bottom Section - Phone bottom-left, WhatsApp + Instagram bottom-right */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/5 pt-6">
              {/* Phone bottom-left */}
              <div className="flex items-center space-x-3 text-white">
                <div className="bg-white/5 p-2.5 rounded-none border border-white/10">
                  <Phone className="h-4 w-4 text-brand-orange" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.25em] text-brand-orange font-bold">{t("detail.contact")}</p>
                  <a href="tel:+96599893948" className="text-xs font-bold tracking-widest text-white hover:underline transition-colors block mt-0.5">
                    +965 99893948
                  </a>
                </div>
              </div>

              {/* WhatsApp icon bottom-right */}
              <div className="flex items-center space-x-3">
                <span className="text-[8px] uppercase tracking-[0.25em] text-brand-orange hidden sm:inline mr-1 font-bold">
                  {t("detail.connect")}
                </span>

                {/* WhatsApp button */}
                <a
                  href={`https://wa.me/96599893948?text=${encodeURIComponent(`Hello USG Kuwait, I am interested in the ${project.name} project.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 text-white hover:bg-brand-orange hover:text-white p-2.5 rounded-none border border-white/10 hover:border-brand-orange transition-all duration-300 shadow-xl"
                  title="Chat on WhatsApp"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Related Projects Sidebar (approx 25% width, so lg:col-span-1) */}
        {/* Artistic Flair dark architectural sidebar */}
        <div className="lg:col-span-1 bg-charcoal-850 text-white rounded-none p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <span className="text-white/55 font-bold tracking-[0.3em] text-[10px] uppercase block mb-1">
              {t("detail.exclusive")}
            </span>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/90 pb-3 border-b-2 border-brand-orange/60 mb-4">
              {t("detail.related")}
            </h3>

            {/* 3 Related Project Thumbnails with titles and View More links */}
            <div className="space-y-6">
              {relatedProjects.map((relProj) => (
                <div
                  key={relProj.id}
                  className="group/item cursor-pointer"
                  onClick={() => onNavigateToProject(relProj.id)}
                >
                  <div className="relative h-28 rounded-none overflow-hidden mb-2 bg-charcoal-950 border border-white/5">
                    <img
                      src={relProj.coverImage}
                      alt={relProj.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500 ease-out brightness-75"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover/item:bg-black/40 transition-colors duration-300"></div>
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/90 group-hover/item:text-white transition-colors">
                    {relProj.name}
                  </h4>
                  <button className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 group-hover/item:text-brand-orange inline-flex items-center mt-1 transition-colors">
                    <span>{t("detail.viewmore")}</span>
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Specifications Sheet on the dark panel */}
          <div className="mt-8 pt-4 border-t border-white/5 text-white/60">
            <h4 className="text-[9px] font-bold text-white/55 tracking-[0.2em] uppercase mb-3">
              {t("detail.specs")}
            </h4>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 font-mono text-[9px] mb-4">
              <span>{t("detail.category")}</span>
              <span className="font-sans font-bold text-white text-right">{project.category}</span>

              <span>{t("detail.location")}</span>
              <span className="font-sans font-bold text-white text-right">{project.location}</span>

              <span>{t("detail.year")}</span>
              <span className="font-sans font-bold text-white text-right">{project.year}</span>

              {project.area && (<>
                <span>{t("detail.area")}</span>
                <span className="font-sans font-bold text-white text-right">{project.area}</span>
              </>)}

              {project.owner && (<>
                <span>{t("detail.owner")}</span>
                <span className="font-sans font-bold text-white text-right">{project.owner}</span>
              </>)}

              {project.scope && (<>
                <span>{t("detail.scope")}</span>
                <span className="font-sans font-bold text-white text-right">{project.scope}</span>
              </>)}
            </div>

            <button
              onClick={() => onOpenGallery(project.id)}
              className="w-full mt-6 py-3 border border-white/15 hover:border-brand-orange text-white hover:bg-brand-orange hover:text-white text-center text-[10px] font-bold uppercase tracking-[0.2em] rounded-none transition-all duration-300 cursor-pointer"
            >
              {t("detail.gallery")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
