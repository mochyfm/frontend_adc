"use client";
import React from "react";
import "./ExamsSummaryWidget.css";
import UserScoreSummary from "@/components/common/UserScoreSummary";

function ExamsSummaryWidget() {
  return (
    <div className="exams-summary-block">
      <UserScoreSummary />
      <div className="exams-summary-buttons-block">
        <div className="exams-summary-row">
          <a className="exams-summary-button" href="/results">
            Todos mis resultados
          </a>
          <a className="exams-summary-button" href="/simulacros/custom">
            Personalizar un simulacro
          </a>
        </div>
        <div className="exams-summary-row">
          <a
            className="exams-important-summary-button"
            href="/simulacros/current"
          >
            <span className="exams-important-summary-name">Simulacro 6</span>
            <span className="exams-important-summary-data">
              {" "}
              (Hasta: 10/06/2025 a las 17:00 Hrs){" "}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ExamsSummaryWidget;
