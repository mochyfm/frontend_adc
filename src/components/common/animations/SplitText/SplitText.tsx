// components/SplitText.tsx
import React from "react";
import './SplitText.css'

export default function SplitText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`split-text ${className}`}>
      {text.split("").map((char, idx) => (
        <span key={idx} className="split-char">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
