import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../types";

interface ServicesSectionProps {
  projects: Project[];
  onSelectCategory: (category: string) => void;
}

export default function ServicesSection({ projects, onSelectCategory }: ServicesSectionProps) {
  const categories = ["Mosques", "Villas", "Commercial"];

  const buildItems = categories.map((category) => {
    const categoryProjects = projects.filter((p) => p.category === category);
    return {
      category,
      count: categoryProjects.length,
      thumbnail: categoryProjects[0]?.coverImage || "/images/hero.jpg",
    };
  });

  return (
    <section className="bg-charcoal-900 text-white py-24 border-t border-white/5" id="services">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-white/40 font-bold tracking-[0.3em] text-[10px] uppercase block mb-3">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            What We Build
          </h2>
          <div className="w-12 h-[1px] bg-white/20 mx-auto mt-6"></div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {buildItems.map((item) => (
            <button
              key={item.category}
              onClick={() => onSelectCategory(item.category)}
              className="group relative text-left overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-850">
                <img
                  src={item.thumbnail}
                  alt={`${item.category} project`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal-950/30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-transparent"></div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 bg-white/0 group-hover:bg-white text-white group-hover:text-charcoal-900 p-2 rounded-none transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1">
                    {item.category}
                  </h3>
                  <p className="text-white/90 text-[10px] uppercase tracking-widest">
                    {item.count} Completed {item.count === 1 ? "Project" : "Projects"}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
