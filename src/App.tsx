import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "./data/projects.json";
import { Project } from "./types";

gsap.registerPlugin(ScrollTrigger);

// Import Components
import Navbar from "./components/Navbar";
import ProjectGrid from "./components/ProjectGrid";
import FilterBar from "./components/FilterBar";
import ProjectDetail from "./components/ProjectDetail";
import GalleryModal from "./components/GalleryModal";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import LoadingScreen from "./components/LoadingScreen";
import ScrollAnimationWrapper from "./components/ScrollAnimationWrapper";

import { ArrowDown, MessageCircle, ArrowUpRight } from "lucide-react";

const projects: Project[] = projectsData as Project[];

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "detail">("home");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("al-sedeeq-villa");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryProjectId, setGalleryProjectId] = useState<string>("al-sedeeq-villa");
  const [isLoading, setIsLoading] = useState(true);

  // Filtering States for Glass Panel
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const heroRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLImageElement>(null);

  // Subtle parallax depth on the hero logo, scrubbed to scroll position
  useLayoutEffect(() => {
    if (currentView !== "home") return;
    const hero = heroRef.current;
    const logo = heroLogoRef.current;
    if (!hero || !logo) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(logo, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, [currentView]);

  // Scroll to top of page on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView, selectedProjectId]);

  // Filtering Logic
  const filteredProjects = projects.filter((project) => {
    if (selectedCategory !== "All" && project.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleOpenGallery = (projectId: string) => {
    setGalleryProjectId(projectId);
    setIsGalleryOpen(true);
  };

  const handleViewDetails = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView("detail");
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    handleScrollToSection("projects");
  };

  const handleScrollToSection = (sectionId: string) => {
    if (currentView !== "home") {
      setCurrentView("home");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const galleryProject = projects.find((p) => p.id === galleryProjectId) || projects[0];

  return (
    <div className="bg-charcoal-800 text-white min-h-screen selection:bg-white selection:text-charcoal-900 transition-colors duration-300">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Header & Sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view, pId) => {
          setCurrentView(view);
          if (pId) setSelectedProjectId(pId);
        }}
        onScrollToSection={handleScrollToSection}
      />

      {currentView === "home" ? (
        <div className="animate-fade-in duration-500">
          {/* Hero Section — dark minimal luxury opener with centered brand mark */}
          <div
            ref={heroRef}
            className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            {/* Subtle ambient glow behind the logo for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full filter blur-[140px] pointer-events-none"></div>

            {/* Centered USG Logo Mark */}
            <img
              ref={heroLogoRef}
              src="/images/usg-logo.png"
              alt="USG Kuwait — United Solutions Group"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="relative z-10 w-40 sm:w-56 md:w-64 h-auto opacity-95 will-change-transform"
            />

            {/* Hero Overlaid Headline Statement */}
            <div
              className="relative z-20 max-w-4xl px-6 sm:px-12 space-y-6 mt-10"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
            >
              <span className="text-white/90 text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase block mb-2 sm:mb-4 animate-fade-in-down">
                ARCHITECTURAL EXCELLENCE IN KUWAIT
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[1.1] tracking-tight uppercase">
                We Don't Just Build Structures, <br />
                <span className="font-bold text-white">We Build Better Lives</span>
              </h1>
            </div>

            {/* Scroll prompt — pinned to bottom of hero */}
            <button
              onClick={() => handleScrollToSection("projects")}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 inline-flex flex-col items-center justify-center text-[9px] text-white tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
            >
              <span>Scroll down to explore</span>
              <ArrowDown className="h-4 w-4 mt-2 animate-bounce" />
            </button>
          </div>

          {/* About Section */}
          <ScrollAnimationWrapper>
            <AboutSection />
          </ScrollAnimationWrapper>

          {/* Services Section */}
          <ScrollAnimationWrapper>
            <ServicesSection
              projects={projects}
              onSelectCategory={handleSelectCategory}
            />
          </ScrollAnimationWrapper>

          {/* Filter Bar + 2-Column Projects Portfolio Grid */}
          <ScrollAnimationWrapper>
            <div>
              <div className="bg-charcoal-800 pt-16">
                <FilterBar
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
              <ProjectGrid
                projects={filteredProjects}
                onOpenGallery={handleOpenGallery}
                onViewDetails={handleViewDetails}
              />
            </div>
          </ScrollAnimationWrapper>

          {/* Contact Section */}
          <ScrollAnimationWrapper>
            <ContactSection />
          </ScrollAnimationWrapper>
        </div>
      ) : (
        <div className="animate-fade-in duration-500">
          {/* Split-Screen Detailed Project Specifications Sheet (Screenshot 2) */}
          <ProjectDetail
            project={selectedProject}
            allProjects={projects}
            onBack={() => setCurrentView("home")}
            onNavigateToProject={(pId) => setSelectedProjectId(pId)}
            onOpenGallery={handleOpenGallery}
          />
        </div>
      )}

      {/* Full-Screen Swipeable/Arrow-navigated Photo Gallery Modal */}
      {isGalleryOpen && (
        <GalleryModal
          project={galleryProject}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}

      {/* Minimal Footer */}
      <footer className="bg-charcoal-950 border-t border-white/5 py-12 text-center text-xs text-white/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-4">
          <p className="tracking-[0.4em] uppercase font-bold text-white text-xs">
            USG <span className="text-white/50 font-normal ml-1">KUWAIT</span>
          </p>
          <div className="flex justify-center space-x-4 text-white/60 text-[10px] uppercase font-bold tracking-[0.2em] py-2">
            <a href="mailto:info@usgroup.site" className="hover:text-white transition-colors">
              info@usgroup.site
            </a>
            <span className="text-white/20">|</span>
            <a href="tel:+96599893948" className="hover:text-white transition-colors">
              +965 99893948
            </a>
          </div>
          <p className="text-[9px] font-mono tracking-widest text-white/20 pt-4">
            &copy; {new Date().getFullYear()} USG CONSTRUCTION COMPANY. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button with Pulse Animation */}
      <style>{`
        @keyframes pulse-custom {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          50% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
        }
        .whatsapp-pulse {
          animation: pulse-custom 3s infinite;
        }
      `}</style>
      <a
        href="https://wa.me/96599893948"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 whatsapp-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
      </a>
    </div>
  );
}
