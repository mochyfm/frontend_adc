import React from "react";
import type { EmpleoInfo } from "@/types/CustomTypes";
import RankCard from "../RankCard";

import "./MilitaryRanks.css";

type Props = {
  empleos: EmpleoInfo[];
};

const MilitaryRanks: React.FC<Props> = ({ empleos }) => {
  const tropa = empleos.filter((e) => e.scale === "Tropa y Marinería");
  const suboficiales = empleos.filter((e) => e.scale === "Suboficiales");
  const oficiales = empleos.filter((e) => e.scale === "Oficiales");

  const armyName = empleos[0]?.army || "Ejercito";

  return (
    <div className="military-panel-content">
      <div className="military-ranks-group">
        <h5>Tropa y Marineria</h5>
        <div className="military-ranks-card-group">
          {tropa.map((emp) => (
            <RankCard empleo={emp} key={`${emp.nombre}-${emp.army}`} />
          ))}
        </div>
      </div>

      <div className="military-ranks-group">
        <h5>Suboficiales</h5>
        <div className="military-ranks-card-group">
          {suboficiales.map((emp) => (
            <RankCard empleo={emp} key={`${emp.nombre}-${emp.army}`} />
          ))}
        </div>
      </div>

      <div className="military-ranks-group">
        <h5>Oficiales</h5>
        <div className="military-ranks-card-group">
          {oficiales.map((emp) => (
            <RankCard empleo={emp} key={`${emp.nombre}-${emp.army}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MilitaryRanks;
