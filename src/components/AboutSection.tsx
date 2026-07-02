import React, { useState } from "react";
import { ShieldCheck, Award, Users, Hourglass, Target, Eye, Compass, Wrench } from "lucide-react";
import StatCounter from "./StatCounter";
import { useLanguage } from "../contexts/LanguageContext";

// Pool of real project images for the random commitment photo
const COMMITMENT_IMAGES = [
  "/images/projects/Issa Al-Othman Mosque/WhatsApp Image 2026-06-24 at 23.01.52.jpeg",
  "/images/projects/Issa Youssef Al-Othman Mosque/WhatsApp Image 2026-06-24 at 22.40.29 (1).jpeg",
  "/images/projects/Al-Sedeeq Villa/WhatsApp Image 2026-06-24 at 23.03.14 (1).jpeg",
  "/images/projects/Al-Salam Villa/WhatsApp Image 2026-06-24 at 22.52.33 (1).jpeg",
  "/images/projects/Mishref Villa/10-1.jpg",
  "/images/projects/Safaa Al-Badr Villa/photo1.jpg",
  "/images/projects/Ghazy Othman villa/Final/photo1.jpg",
  "/images/projects/Bareira Hotel/1- صور الكتالوج/1-2.jpg",
  "/images/projects/Police Station Abu Fateira/0000.jpg",
  "/images/projects/Lama Al-Hamad mosque/10.jpeg",
];

function randomImage() {
  return COMMITMENT_IMAGES[Math.floor(Math.random() * COMMITMENT_IMAGES.length)];
}

export default function AboutSection() {
  const { t } = useLanguage();
  const [commitImg] = useState(randomImage);

  const stats = [
    { valueKey: "about.stat1.value", labelKey: "about.stat1.label", icon: Hourglass },
    { valueKey: "about.stat2.value", labelKey: "about.stat2.label", icon: Award },
    { valueKey: "about.stat3.value", labelKey: "about.stat3.label", icon: Users },
    { valueKey: "about.stat4.value", labelKey: "about.stat4.label", icon: ShieldCheck },
  ];

  const valueKeys = ["about.value1", "about.value2", "about.value3", "about.value4"];
  const serviceKeys = ["about.service1", "about.service2", "about.service3", "about.service4", "about.service5"];

  return (
    <section className="bg-charcoal-800 text-white py-24 relative overflow-hidden" id="about">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/2 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/2 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Who We Are */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-white/40 font-bold tracking-[0.3em] text-[10px] uppercase block">
              {t("about.label")}
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
              {t("about.title")}
            </h2>
            <p className="text-white/75 font-light text-sm sm:text-base leading-relaxed">
              {t("about.p1")}
            </p>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
              {t("about.p2")}
            </p>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
              {t("about.p3")}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/5">
              {stats.map((stat, idx) => (
                <React.Fragment key={idx}>
                  <StatCounter value={t(stat.valueKey)} label={t(stat.labelKey)} Icon={stat.icon} />
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[480px] rounded-none overflow-hidden shadow-2xl border border-white/5 bg-charcoal-950">
              <img
                src={commitImg}
                alt="USG Kuwait project"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-75 hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-charcoal-900/90 backdrop-blur-md border border-white/5 p-5 rounded-none">
                <p className="text-white/40 font-mono text-[9px] uppercase tracking-[0.3em] mb-1.5 font-bold">
                  {t("about.commitment.label")}
                </p>
                <p className="text-white text-xs font-light leading-relaxed">
                  {t("about.commitment.text")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 pt-20 border-t border-white/5">
          <div className="bg-charcoal-900/50 border border-white/5 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-white/70" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">{t("about.vision.title")}</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed font-light">{t("about.vision.text")}</p>
          </div>
          <div className="bg-charcoal-900/50 border border-white/5 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-white/70" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">{t("about.mission.title")}</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed font-light">{t("about.mission.text")}</p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <Compass className="h-5 w-5 text-white/70" />
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">{t("about.values.title")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueKeys.map((key, idx) => (
              <div key={idx} className="flex gap-4 border-l-2 border-white/10 pl-5 py-1">
                <span className="text-white/30 font-mono text-xs pt-0.5">0{idx + 1}</span>
                <p className="text-white/70 text-sm leading-relaxed font-light">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <Wrench className="h-5 w-5 text-white/70" />
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">{t("about.services.title")}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {serviceKeys.map((key, idx) => (
              <div
                key={idx}
                className="border border-white/10 bg-charcoal-900/30 p-5 hover:border-white/30 hover:bg-charcoal-900/60 transition-all duration-300"
              >
                <span className="text-white/30 font-mono text-[10px] block mb-2">0{idx + 1}</span>
                <p className="text-white text-sm font-medium uppercase tracking-wider leading-snug">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
