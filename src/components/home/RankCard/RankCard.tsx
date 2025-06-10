import React from "react";
import "./RankCard.css";

import type { EmpleoInfo } from "@/types/CustomTypes"; // ajusta la ruta según tu estructura

type RankCardProps = {
  empleo: EmpleoInfo;
};

function RankCard({ empleo }: RankCardProps) {
  return (
    <div className="rank-card">
      <img
        src={empleo.insigniaUrl}
        alt={`Divisa de ${empleo.nombre}`}
        className="rank-icon"
      />
      <div className="rank-info">
        <h3 className="rank-name">{empleo.nombre}</h3>
      </div>
    </div>
  );
}

export default RankCard;
