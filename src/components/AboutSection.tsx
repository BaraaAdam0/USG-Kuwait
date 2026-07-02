import React from "react";
import { ShieldCheck, Award, Users, Hourglass, Target, Eye, Compass, Wrench } from "lucide-react";
import StatCounter from "./StatCounter";

export default function AboutSection() {
  const stats = [
    { value: "20+", label: "Years of Experience", icon: Hourglass },
    { value: "50+", label: "Completed Projects", icon: Award },
    { value: "40+", label: "Skilled Staff", icon: Users },
    { value: "100%", label: "Quality Commitment", icon: ShieldCheck },
  ];

  const values = [
    "Distinction in setting high quality standards, application of advanced technology, encouraging innovation and development and standing up to challenges at any cost.",
    "Satisfaction with a reasonably rewarding revenue that meets our distinguished client services provided.",
    "Encourage the spirit of team work, trust and respect for all cultures, experiences and viewpoints.",
    "Enhance our scope of skills and services in the projects and construction sector in order to cope with the changing needs of clients as well as the communities we serve.",
  ];

  const services = [
    "Construction / Civil Services",
    "Electro-Mechanical Services",
    "Decoration & Finishing Services",
    "Fit Outs",
    "Swimming Pools Services",
  ];

  return (
    <section className="bg-charcoal-800 text-white py-24 relative overflow-hidden" id="about">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/2 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/2 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Who We Are */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-white/40 font-bold tracking-[0.3em] text-[10px] uppercase block">
              About USG Kuwait
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
              Who We Are
            </h2>
            <p className="text-white/75 font-light text-sm sm:text-base leading-relaxed">
              Since it was founded in 2007 in the state of Kuwait, <span className="text-white font-medium">United Solutions Group Co. for General Contracting of Buildings — "USG"</span> has established strong alliances of trust and commitment with customers, multiple agents, suppliers as well as partnerships with the Governmental and Private Sectors in the country. This commitment has built our name as one distinguished company operating in the field of General Contracting for Buildings.
            </p>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
              The company is managed by a very well qualified and talented individuals, working with a diverse team of engineers, designers, monitors and technicians of carefully selected high skills and accumulated experience. Alongside with a rigorous support team within the area of sales and marketing, we have been able to stand out in the local market as a provider of niche engineering solutions, commitment to deadlines and dedication for success with distinction.
            </p>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
              Hence, our private sector and public sector partners have shown a serious desire to cooperate with our company as business partners in different projects. That was not only for the aforementioned services provided, but also due to our after-sales elite services that include consultancies, development, monitoring, integration and maintenance whenever the need arises.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/5">
              {stats.map((stat, idx) => (
                <React.Fragment key={idx}>
                  <StatCounter value={stat.value} label={stat.label} Icon={stat.icon} />
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[480px] rounded-none overflow-hidden shadow-2xl border border-white/5 bg-charcoal-950">
              <img
                src="/images/projects/Issa Al-Othman Mosque/WhatsApp Image 2026-06-24 at 23.01.52.jpeg"
                alt="USG Kuwait project"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-75 hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-charcoal-900/90 backdrop-blur-md border border-white/5 p-5 rounded-none">
                <p className="text-white/40 font-mono text-[9px] uppercase tracking-[0.3em] mb-1.5 font-bold">
                  OUR COMMITMENT
                </p>
                <p className="text-white text-xs font-light leading-relaxed">
                  Commit to the provision of a high level of services and solutions in line with international standards.
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
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Our Vision</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              Create long-term business partnerships with clients and assisting them to establish futuristic roadmaps for a global position.
            </p>
          </div>
          <div className="bg-charcoal-900/50 border border-white/5 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-white/70" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Our Mission</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              Provide distinguished services in the general contracting sector through high quality standards and refined performance. We do so by using the state-of-the-art technology tools available in our industry, making a work-conducive environment that put "USG" as a pioneer in quality and diversity. Since it existed, we strive to observe tradition, exceed client aspirations with our services and continuous development and also maintain the level of gains attained.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <Compass className="h-5 w-5 text-white/70" />
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Our Values</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="flex gap-4 border-l-2 border-white/10 pl-5 py-1">
                <span className="text-white/30 font-mono text-xs pt-0.5">0{idx + 1}</span>
                <p className="text-white/70 text-sm leading-relaxed font-light">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <Wrench className="h-5 w-5 text-white/70" />
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Our Services</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="border border-white/10 bg-charcoal-900/30 p-5 hover:border-white/30 hover:bg-charcoal-900/60 transition-all duration-300"
              >
                <span className="text-white/30 font-mono text-[10px] block mb-2">
                  0{idx + 1}
                </span>
                <p className="text-white text-sm font-medium uppercase tracking-wider leading-snug">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
