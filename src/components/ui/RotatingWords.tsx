"use client";

import React, { useState, useEffect } from "react";

interface RotatingWordsProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function RotatingWords({
  words,
  interval = 2800,
  className = "",
}: RotatingWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    if (words.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % words.length;
      });

      const clearTimer = setTimeout(() => {
        setPrevIndex(null);
      }, 550);

      return () => clearTimeout(clearTimer);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  if (!words || words.length === 0) return null;

  return (
    <>
      {/* Screen reader text for SEO and accessibility */}
      <span className="sr-only">{words.join(", ")} and more</span>

      <span
        aria-hidden="true"
        className={`inline-grid relative overflow-hidden align-bottom text-center px-1.5 py-1 -my-1 ${className}`}
        style={{ gridTemplateAreas: '"stack"' }}>
        {prevIndex !== null && (
          <span
            key={`prev-${prevIndex}`}
            className="animate-word-out select-none pointer-events-none"
            style={{ gridArea: "stack" }}>
            <span className="text-[var(--primary)] italic font-bold whitespace-nowrap">
              {words[prevIndex]}
            </span>
          </span>
        )}
        <span
          key={`curr-${currentIndex}`}
          className={prevIndex !== null ? "animate-word-in" : ""}
          style={{ gridArea: "stack" }}>
          <span className="text-[var(--primary)] italic font-bold whitespace-nowrap">
            {words[currentIndex]}
          </span>
        </span>
      </span>
    </>
  );
}
