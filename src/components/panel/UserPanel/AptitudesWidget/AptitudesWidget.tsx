import React from "react";
import "./AptitudesWidget.css";
import { useRouter } from "next/navigation";

function AptitudesWidget() {
  const router = useRouter();

  return (
    <div className="aptitude-block">
      <h2>Tests de aptitudes</h2>
      <div className="aptitude-buttons-panel">
        <button
          className="aptitude-button verbal-aptitude"
          onClick={() => router.push("/tests/verbal")}
        >
          Verbal
        </button>
        <button
          className="aptitude-button espacial-aptitude"
          onClick={() => router.push("/tests/espacial")}
        >
          Espacial
        </button>
        <button
          className="aptitude-button percepcion-aptitude"
          onClick={() => router.push("/tests/percepcion")}
        >
          Percepción
        </button>
        <button
          className="aptitude-button numerico-aptitude"
          onClick={() => router.push("/tests/numerico")}
        >
          Numérico
        </button>
        <button
          className="aptitude-button mecanico-aptitude"
          onClick={() => router.push("/tests/mecanico")}
        >
          Mecánico
        </button>
        <button
          className="aptitude-button memoria-aptitude"
          onClick={() => router.push("/tests/memoria")}
        >
          Memoria
        </button>
        <button
          className="aptitude-button abstracto-aptitude"
          onClick={() => router.push("/tests/abstracto")}
        >
          Abstracto
        </button>
      </div>
    </div>
  );
}

export default AptitudesWidget;
