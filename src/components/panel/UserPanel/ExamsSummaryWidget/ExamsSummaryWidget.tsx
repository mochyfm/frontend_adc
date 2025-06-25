"use client";
import React from "react";
import "./ExamsSummaryWidget.css";
import UserScoreSummary from "@/components/common/UserScoreSummary";
import { useRouter } from "next/navigation";

function ExamsSummaryWidget() {
  const router = useRouter();

  return (
    <div className="exams-summary-block">
      <UserScoreSummary />
      <div className="exams-summary-buttons-block">
        <div className="exams-summary-row">
          <button
            onClick={() => router.push("/results")}
            className="exams-summary-button"
          >
            Todos mis resultados
          </button>
          <button
            className="exams-summary-button"
            onClick={() => router.push("/simulacros/custom")}
          >
            Personalizar un simulacro
          </button>
        </div>
        <div className="exams-summary-row">
          <button
            className="exams-important-summary-button"
            onClick={() => router.push("/simulacros/current")}
          >
            <span className="exams-important-summary-name">Simulacro 6</span>
            <span className="exams-important-summary-data">
              {" "}
              (Hasta: 10/06/2025 a las 17:00 Hrs){" "}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamsSummaryWidget;
