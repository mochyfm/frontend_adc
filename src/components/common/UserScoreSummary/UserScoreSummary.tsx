"use client";
import React, { useRef, useState } from "react";
import "./UserScoreSummary.css";
import RenderScores from "./RenderScores";
import { lastSimulacresExample, lastTestsExample } from "@/utils/Utils.scores";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import gsap from "gsap";

interface UserScoreSummaryProps {
  className?: string;
}

function UserScoreSummary({ className } : UserScoreSummaryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const panelRef = useRef<HTMLDivElement>(null);

  const panels = [
    {
      title: "Resultados de los últimos tests",
      display: "tests" as "tests",
      scoreList: lastTestsExample,
    },
    {
      title: "Resultados de los últimos simulacros",
      display: "sim" as "sim",
      scoreList: lastSimulacresExample,
    },
  ];

  const animatePanelChange = (dir: "left" | "right", callback: () => void) => {
    if (!panelRef.current) return;

    const directionX = dir === "right" ? -100 : 100;

    // Fase 1: salida
    gsap.to(panelRef.current, {
      x: directionX,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        callback();

        // Fase 2: entrada
        gsap.fromTo(
          panelRef.current,
          { x: -directionX, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.2, ease: "power2.out" }
        );
      },
    });
  };

  const handlePrevious = () => {
    if (currentIndex === 0) return;
    setDirection("left");
    animatePanelChange("left", () => setCurrentIndex(currentIndex - 1));
  };

  const handleNext = () => {
    if (currentIndex === panels.length - 1) return;
    setDirection("right");
    animatePanelChange("right", () => setCurrentIndex(currentIndex + 1));
  };

  const currentPanel = panels[currentIndex];

  return (
    <div className={`user-score-panel-body ${className && className}`}>
      <button
        className={`user-score-panel-button ${
          currentIndex === 0 ? "disabled" : ""
        }`}
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        <FaArrowLeft />
      </button>

      <div className="user-score-summary-block" ref={panelRef}>
        <h3>{currentPanel.title}</h3>
        <RenderScores
          display={currentPanel.display}
          scoreList={currentPanel.scoreList}
        />
      </div>

      <button
        className={`user-score-panel-button ${
          currentIndex === panels.length - 1 ? "disabled" : ""
        }`}
        onClick={handleNext}
        disabled={currentIndex === panels.length - 1}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}

export default UserScoreSummary;
