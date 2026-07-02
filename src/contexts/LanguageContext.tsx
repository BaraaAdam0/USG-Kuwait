import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.choose": "Choose Project",
    "hero.tagline": "ARCHITECTURAL EXCELLENCE IN KUWAIT",
    "hero.title": "We Don't Just Build Structures, ",
    "hero.titleBold": "We Build Better Lives",
    "hero.subtitle": "Premium Wood, Monolithic Concrete & Modern Glass Sanctuaries",
    "hero.scroll": "Scroll down to explore",
    "filter.all": "All",
    "filter.residential": "Residential",
    "filter.commercial": "Commercial",
    "filter.industrial": "Industrial",
    "footer.title": "USG KUWAIT",
    "footer.copyright": "© {year} USG CONSTRUCTION COMPANY. ALL RIGHTS RESERVED.",
    "footer.email": "info@usgroup.site",
  },
  ar: {
    "nav.about": "حول",
    "nav.services": "الخدمات",
    "nav.projects": "المشاريع",
    "nav.contact": "تواصل",
    "nav.choose": "اختر مشروع",
    "hero.tagline": "التميز المعماري في الكويت",
    "hero.title": "نحن لا نبني المباني فحسب، ",
    "hero.titleBold": "نحن نبني حياة أفضل",
    "hero.subtitle": "حرفية خشب ممتازة وخرسانة أحادية وملاذات زجاجية عصرية",
    "hero.scroll": "قم بالتمرير لاستكشاف",
    "filter.all": "الكل",
    "filter.residential": "سكني",
    "filter.commercial": "تجاري",
    "filter.industrial": "صناعي",
    "footer.title": "مجموعة يو إس جي",
    "footer.copyright": "© {year} شركة يو إس جي للبناء. جميع الحقوق محفوظة.",
    "footer.email": "info@usgroup.site",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language | null;
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
