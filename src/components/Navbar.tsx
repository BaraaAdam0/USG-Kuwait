import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: "home" | "detail" | "contact", projectId?: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({ currentView, onNavigate, onScrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { labelKey: "nav.about", id: "about" },
    { labelKey: "nav.services", id: "services" },
    { labelKey: "nav.projects", id: "projects" },
    { labelKey: "nav.contact", id: "contact" },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (id === "contact") {
      onScrollToSection("contact");
    } else {
      onScrollToSection(id);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 backdrop-blur-md ${
        isScrolled
          ? "bg-charcoal-950/98 border-white/10 shadow-[0_4px_32px_rgba(0,0,0,0.6)]"
          : "bg-charcoal-850/80 border-white/5"
      }`}
      style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Matching <div class="text-3xl font-black tracking-tighter">USG</div> */}
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-2" onClick={() => onNavigate("home")}>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black tracking-tighter text-white font-sans uppercase">
                USG
              </span>
              <span className="text-[9px] font-bold tracking-[0.3em] text-white/60 uppercase ml-1">
                Kuwait
              </span>
            </div>
            <span
              className="w-2 h-2 rounded-full bg-brand-orange shadow-[0_0_10px_2px_rgba(232,93,38,0.7)]"
              aria-hidden="true"
            ></span>
          </div>

          {/* Desktop Navigation - Matching nav: flex gap-10 text-[10px] font-bold uppercase tracking-[0.4em] opacity-80 */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-white opacity-80 hover:opacity-100 hover:border-b hover:border-brand-orange pb-1 transition-all duration-200"
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>

          {/* Action button + Language Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center justify-center px-3 py-2 border border-white/20 hover:border-brand-orange text-[10px] font-bold uppercase tracking-[0.15em] text-white bg-transparent hover:bg-brand-orange/10 transition-all duration-300 min-w-[45px]"
            >
              {language === "en" ? "AR" : "EN"}
            </button>
            <button
              onClick={() => onScrollToSection("projects")}
              className="inline-flex items-center justify-center px-6 py-2.5 border border-white/20 hover:border-brand-orange text-[10px] font-bold uppercase tracking-[0.25em] text-white bg-transparent hover:bg-brand-orange hover:text-white transition-all duration-300"
            >
              {t("nav.choose")}
              <ArrowUpRight className="ml-2 h-3 w-3" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-charcoal-950/97 backdrop-blur-lg border-b border-white/10 px-6 pt-4 pb-6 space-y-3 animate-[slideDown_0.22s_ease-out]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-2.5 text-xs font-bold text-white/80 hover:text-white hover:bg-white/5 px-2 rounded transition-all duration-200 uppercase tracking-[0.3em]"
            >
              {t(item.labelKey)}
            </button>
          ))}
          <div className="pt-4 border-t border-white/5 space-y-3">
            <button
              onClick={toggleLanguage}
              className="w-full py-2.5 border border-white/20 hover:border-brand-orange text-white hover:bg-brand-orange/10 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200"
            >
              {language === "en" ? "العربية (AR)" : "English (EN)"}
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onScrollToSection("projects");
              }}
              className="w-full flex items-center justify-center py-3 border border-white/20 hover:border-brand-orange text-white hover:bg-brand-orange hover:text-white text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-200"
            >
              {t("nav.choose")}
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
