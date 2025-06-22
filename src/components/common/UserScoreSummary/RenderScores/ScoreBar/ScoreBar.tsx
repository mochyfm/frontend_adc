import React from "react";
import "./ScoreBar.css";
import { AptitudeScore, SimulacroScore } from "@/types/CustomTypes";

type ScoreBarProps =
  | { display: "tests"; data: AptitudeScore }
  | { display: "sim"; data: SimulacroScore };

function ScoreBar(props: ScoreBarProps) {
  const { display, data } = props;

  const score = data.totalScore;
  const maxScore = display === "tests" ? 15 : 105;
  const heightPercent = Math.min(100, (score / maxScore) * 100);

  const getColor = (pct: number) => {
    if (pct < 40) return "var(--bad-sim-score)";
    if (pct < 65) return "var(--medium-sim-score)";
    if (pct < 85) return "var(--ok-sim-score)";
    return "var(--good-sim-score)";
  };

  const getAptitudeColorVar = (aptitude: string) => {
    switch (aptitude) {
      case "Verbal":
        return "var(--verbal-aptitude-color)";
      case "Espacial":
        return "var(--espacial-aptitude-color)";
      case "Percepción":
        return "var(--percepcion-aptitude-color)";
      case "Numérico":
        return "var(--numerico-aptitude-color)";
      case "Mecánico":
        return "var(--mecanico-aptitude-color)";
      case "Memoria":
        return "var(--memoria-aptitude-color)";
      case "Abstracto":
        return "var(--abstracto-aptitude-color)";
      default:
        return "#ccc";
    }
  };

  const barColor =
    display === "tests"
      ? getAptitudeColorVar(data.aptitude)
      : getColor(heightPercent);

  return (
    <div className="score-bar-vertical">
      <div
        className="score-bar-column"
        style={{
          height: `${heightPercent}%`,
          backgroundColor: barColor,
        }}
        title={`${
          display === "tests"
            ? data.aptitude + ":"
            : data.simulacro + " - Total:"
        } ${score} puntos`}
      ></div>
      <div
        className={`score-bar-label ${
          display === "sim" && data.customSim && "custom-sim"
        }`}
      >
        {score}
      </div>
    </div>
  );
}

export default ScoreBar;
