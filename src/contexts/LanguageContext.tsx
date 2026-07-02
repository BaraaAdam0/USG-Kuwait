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
    // Nav
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.choose": "Choose Project",
    // Hero
    "hero.tagline": "ARCHITECTURAL EXCELLENCE IN KUWAIT",
    "hero.scroll": "Scroll down to explore",
    // About
    "about.label": "About USG Kuwait",
    "about.title": "Who We Are",
    "about.p1": "Since it was founded in 2007 in the state of Kuwait, United Solutions Group Co. for General Contracting of Buildings — \"USG\" has established strong alliances of trust and commitment with customers, multiple agents, suppliers as well as partnerships with the Governmental and Private Sectors in the country. This commitment has built our name as one distinguished company operating in the field of General Contracting for Buildings.",
    "about.p2": "The company is managed by a very well qualified and talented individuals, working with a diverse team of engineers, designers, monitors and technicians of carefully selected high skills and accumulated experience. Alongside with a rigorous support team within the area of sales and marketing, we have been able to stand out in the local market as a provider of niche engineering solutions, commitment to deadlines and dedication for success with distinction.",
    "about.p3": "Hence, our private sector and public sector partners have shown a serious desire to cooperate with our company as business partners in different projects. That was not only for the aforementioned services provided, but also due to our after-sales elite services that include consultancies, development, monitoring, integration and maintenance whenever the need arises.",
    "about.stat1.value": "20+",
    "about.stat1.label": "Years of Experience",
    "about.stat2.value": "50+",
    "about.stat2.label": "Completed Projects",
    "about.stat3.value": "40+",
    "about.stat3.label": "Skilled Staff",
    "about.stat4.value": "100%",
    "about.stat4.label": "Quality Commitment",
    "about.commitment.label": "OUR COMMITMENT",
    "about.commitment.text": "Commit to the provision of a high level of services and solutions in line with international standards.",
    "about.vision.title": "Our Vision",
    "about.vision.text": "Create long-term business partnerships with clients and assisting them to establish futuristic roadmaps for a global position.",
    "about.mission.title": "Our Mission",
    "about.mission.text": "Provide distinguished services in the general contracting sector through high quality standards and refined performance. We do so by using the state-of-the-art technology tools available in our industry, making a work-conducive environment that put \"USG\" as a pioneer in quality and diversity. Since it existed, we strive to observe tradition, exceed client aspirations with our services and continuous development and also maintain the level of gains attained.",
    "about.values.title": "Our Values",
    "about.value1": "Distinction in setting high quality standards, application of advanced technology, encouraging innovation and development and standing up to challenges at any cost.",
    "about.value2": "Satisfaction with a reasonably rewarding revenue that meets our distinguished client services provided.",
    "about.value3": "Encourage the spirit of team work, trust and respect for all cultures, experiences and viewpoints.",
    "about.value4": "Enhance our scope of skills and services in the projects and construction sector in order to cope with the changing needs of clients as well as the communities we serve.",
    "about.services.title": "Our Services",
    "about.service1": "Construction / Civil Services",
    "about.service2": "Electro-Mechanical Services",
    "about.service3": "Decoration & Finishing Services",
    "about.service4": "Fit Outs",
    "about.service5": "Swimming Pools Services",
    // Services section
    "services.label": "Our Expertise",
    "services.title": "What We Build",
    "services.cat.mosques": "Mosques",
    "services.cat.villas": "Villas",
    "services.cat.commercial": "Commercial",
    "services.projects": "Completed Projects",
    "services.project": "Completed Project",
    // Filter
    "filter.all": "All",
    "filter.mosques": "Mosques",
    "filter.villas": "Villas",
    "filter.commercial": "Commercial",
    // Projects grid
    "grid.label": "Our Portfolio",
    "grid.title": "Featured Architectural Projects",
    "grid.empty": "No projects match your filter criteria.",
    "grid.empty.sub": "Try adjusting the filter or reset to view all projects.",
    "grid.launch": "Launch Gallery",
    "grid.explore": "Click to explore photos",
    "grid.spec": "View Spec Sheet →",
    // Gallery
    "gallery.label": "PORTFOLIO GALLERY",
    "gallery.of": "OF",
    // Project detail
    "detail.back": "Back to Portfolio",
    "detail.contact": "CONTACT US",
    "detail.connect": "CONNECT",
    "detail.exclusive": "EXCLUSIVE DESIGNS",
    "detail.related": "Related Projects",
    "detail.specs": "PROJECT DETAILS",
    "detail.category": "CATEGORY:",
    "detail.location": "LOCATION:",
    "detail.year": "YEAR:",
    "detail.area": "AREA:",
    "detail.owner": "OWNER:",
    "detail.scope": "SCOPE:",
    "detail.gallery": "Launch Gallery View",
    "detail.viewmore": "View More",
    // Contact
    "contact.label": "Get In Touch",
    "contact.title": "Contact USG Kuwait",
    "contact.info": "Contact Information",
    "contact.hq": "Headquarters",
    "contact.hq.address": "AbdelHady Commercial Center, Floor 6, Alqibla, Kuwait City, Fahad Al-Salem Street",
    "contact.phone": "Phone",
    "contact.email.label": "General Inquiries",
    "contact.hours.label": "Working Hours",
    "contact.hours.text": "Saturday – Thursday: 9:00 AM – 5:00 PM",
    "contact.hours.fri": "Friday: Closed",
    "contact.visit": "Visit Us",
    "contact.maps": "Open in Google Maps",
    "contact.maps.address": "AbdelHady Commercial Center\nFloor 6, Alqibla\nFahad Al-Salem Street\nKuwait City",
    // Footer
    "footer.rights": "© {year} USG CONSTRUCTION COMPANY. ALL RIGHTS RESERVED.",
  },
  ar: {
    // Nav
    "nav.about": "حول",
    "nav.services": "الخدمات",
    "nav.projects": "المشاريع",
    "nav.contact": "تواصل",
    "nav.choose": "اختر مشروع",
    // Hero
    "hero.tagline": "التميز المعماري في الكويت",
    "hero.scroll": "انتقل للأسفل للاستكشاف",
    // About
    "about.label": "عن مجموعة يو إس جي الكويت",
    "about.title": "من نحن",
    "about.p1": "منذ تأسيسها عام 2007 في دولة الكويت، أرست شركة المجموعة المتحدة للحلول لمقاولات المباني العامة — \"USG\" تحالفات راسخة من الثقة والالتزام مع العملاء والوكلاء والموردين، فضلاً عن شراكات مع القطاعين الحكومي والخاص. وقد رسّخ هذا الالتزام مكانتها بوصفها شركة مميزة في مجال مقاولات المباني العامة.",
    "about.p2": "تُدار الشركة بكوادر مؤهلة ومتميزة، تعمل ضمن فريق متنوع من المهندسين والمصممين والمراقبين والفنيين المنتقَين بعناية لمهاراتهم وخبراتهم المتراكمة، بدعم من فريق مبيعات وتسويق متكامل. وقد مكّننا ذلك من التميز في السوق المحلية بتقديم حلول هندسية متخصصة، والتزامنا الراسخ بالمواعيد وتحقيق النجاح بامتياز.",
    "about.p3": "وقد أبدى شركاؤنا في القطاعين الخاص والعام رغبة جادة في التعاون معنا، ليس لمجرد الخدمات المقدمة، بل أيضاً لخدمات ما بعد البيع المتميزة التي تشمل الاستشارات والتطوير والمتابعة والتكامل والصيانة متى احتاجوا إليها.",
    "about.stat1.value": "+20",
    "about.stat1.label": "سنوات من الخبرة",
    "about.stat2.value": "+50",
    "about.stat2.label": "مشروع مكتمل",
    "about.stat3.value": "+40",
    "about.stat3.label": "كادر متخصص",
    "about.stat4.value": "100%",
    "about.stat4.label": "التزام بالجودة",
    "about.commitment.label": "التزامنا",
    "about.commitment.text": "الالتزام بتقديم مستوى عالٍ من الخدمات والحلول وفق المعايير الدولية.",
    "about.vision.title": "رؤيتنا",
    "about.vision.text": "بناء شراكات تجارية طويلة الأمد مع العملاء ومساعدتهم على رسم خرائط مستقبلية نحو مكانة عالمية.",
    "about.mission.title": "مهمتنا",
    "about.mission.text": "تقديم خدمات متميزة في قطاع مقاولات المباني وفق معايير جودة عالية وأداء رفيع، باستخدام أحدث التقنيات المتاحة في الصناعة، وخلق بيئة عمل محفزة تُرسّخ مكانة \"USG\" رائداً في الجودة والتنوع، مع السعي المستمر للتميز وتجاوز تطلعات العملاء.",
    "about.values.title": "قيمنا",
    "about.value1": "التميز في وضع معايير جودة عالية وتطبيق التكنولوجيا المتقدمة وتشجيع الابتكار والتطوير والتصدي للتحديات مهما كلف الأمر.",
    "about.value2": "الرضا بعائد مجزٍ يلبي متطلبات خدمة عملائنا المميزين.",
    "about.value3": "تعزيز روح العمل الجماعي والثقة والاحترام المتبادل لجميع الثقافات والخبرات ووجهات النظر.",
    "about.value4": "توسيع نطاق مهاراتنا وخدماتنا في قطاع المشاريع والإنشاءات لمواكبة الاحتياجات المتغيرة للعملاء والمجتمعات التي نخدمها.",
    "about.services.title": "خدماتنا",
    "about.service1": "خدمات الإنشاء والأعمال المدنية",
    "about.service2": "خدمات الكهروميكانيك",
    "about.service3": "خدمات الديكور والتشطيبات",
    "about.service4": "أعمال التجهيز الداخلي",
    "about.service5": "خدمات المسابح",
    // Services section
    "services.label": "خبرتنا",
    "services.title": "ما نبنيه",
    "services.cat.mosques": "مساجد",
    "services.cat.villas": "فيلات",
    "services.cat.commercial": "تجاري",
    "services.projects": "مشاريع مكتملة",
    "services.project": "مشروع مكتمل",
    // Filter
    "filter.all": "الكل",
    "filter.mosques": "مساجد",
    "filter.villas": "فيلات",
    "filter.commercial": "تجاري",
    // Projects grid
    "grid.label": "معرض أعمالنا",
    "grid.title": "مشاريع معمارية مميزة",
    "grid.empty": "لا توجد مشاريع تتطابق مع معايير التصفية.",
    "grid.empty.sub": "حاول تعديل التصفية أو إعادة ضبطها لعرض جميع المشاريع.",
    "grid.launch": "فتح المعرض",
    "grid.explore": "انقر لاستعراض الصور",
    "grid.spec": "عرض تفاصيل المشروع ←",
    // Gallery
    "gallery.label": "معرض الأعمال",
    "gallery.of": "من",
    // Project detail
    "detail.back": "العودة إلى المعرض",
    "detail.contact": "تواصل معنا",
    "detail.connect": "تواصل",
    "detail.exclusive": "تصاميم حصرية",
    "detail.related": "مشاريع مشابهة",
    "detail.specs": "تفاصيل المشروع",
    "detail.category": "الفئة:",
    "detail.location": "الموقع:",
    "detail.year": "السنة:",
    "detail.area": "المنطقة:",
    "detail.owner": "المالك:",
    "detail.scope": "نطاق العمل:",
    "detail.gallery": "فتح معرض الصور",
    "detail.viewmore": "عرض المزيد",
    // Contact
    "contact.label": "تواصل معنا",
    "contact.title": "تواصل مع مجموعة يو إس جي",
    "contact.info": "معلومات الاتصال",
    "contact.hq": "المقر الرئيسي",
    "contact.hq.address": "المركز التجاري عبد الهادي، الطابق 6، القبلة، مدينة الكويت، شارع فهد السالم",
    "contact.phone": "الهاتف",
    "contact.email.label": "الاستفسارات العامة",
    "contact.hours.label": "ساعات العمل",
    "contact.hours.text": "السبت – الخميس: 9:00 ص – 5:00 م",
    "contact.hours.fri": "الجمعة: مغلق",
    "contact.visit": "زورونا",
    "contact.maps": "فتح في خرائط جوجل",
    "contact.maps.address": "المركز التجاري عبد الهادي\nالطابق 6، القبلة\nشارع فهد السالم\nمدينة الكويت",
    // Footer
    "footer.rights": "© {year} شركة يو إس جي للمقاولات. جميع الحقوق محفوظة.",
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
    return (translations[language] as Record<string, string>)[key] || (translations.en as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
