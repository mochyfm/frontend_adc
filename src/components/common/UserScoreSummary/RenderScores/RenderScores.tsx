import React from "react";
import { AptitudeScore, SimulacroScore } from "@/types/CustomTypes";
import "./RenderScores.css";
import ScoreBar from "./ScoreBar/ScoreBar";

interface RenderScoresProps {
  display: "tests" | "sim";
  scoreList: SimulacroScore[] | AptitudeScore[];
}

function RenderScores({ display, scoreList }: RenderScoresProps) {
  return (
    <div className="render-scores-body">
      {scoreList.map((result, index) => (
        <ScoreBar
          key={result.uuid || index}
          display={display}
          data={result as any}
        />
      ))}
    </div>
  );
}

export default RenderScores;
