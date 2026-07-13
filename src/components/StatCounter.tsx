import React, { useEffect, useState } from "react";
import { useInView } from "motion/react";
import { useRef } from "react";

interface StatCounterProps {
  value: string;
  label: string;
  Icon: React.ElementType;
}

export default function StatCounter({ value, label, Icon }: StatCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(value.replace(/\D/g, ""));
    const suffix = value.replace(/\d/g, "");
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const currentValue = Math.floor(numericValue * progress);
      setDisplayValue(currentValue + suffix);

      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex items-center space-x-2 text-white">
        <Icon className="h-4 w-4 text-brand-orange" />
        <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {displayValue}
        </span>
      </div>
      <p className="text-[9px] uppercase tracking-[0.2em] text-white/55 font-bold">
        {label}
      </p>
    </div>
  );
}
