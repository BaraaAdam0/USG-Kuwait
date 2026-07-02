import React from "react";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({
  selectedCategory,
  onCategoryChange,
}: FilterBarProps) {
  const categories = ["All", "Mosques", "Villas", "Commercial"];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-20">
      <div className="flex justify-center gap-3 sm:gap-8 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] sm:tracking-[0.3em] pb-2 transition-all duration-300 whitespace-nowrap ${
              selectedCategory === cat
                ? "text-white border-b-2 border-white"
                : "text-white opacity-40 hover:opacity-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
